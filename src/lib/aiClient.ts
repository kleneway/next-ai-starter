/**
 * AI provider facade coordinating OpenAI, Perplexity, and Gemini chat completions.
 *
 * Key Behaviors:
 * - Routes model identifiers to the proper provider client; normalizes Gemini calls via generateGeminiWebResponse.
 * - Uses OpenAI Responses API for GPT-5 with optional reasoning/text parameters.
 *
 * Inputs/Outputs:
 * - Inputs: env OPENAI_API_KEY, PERPLEXITY_API_KEY, GEMINI_API_KEY; chat message history.
 * - Outputs: text reply string; Gemini responses may include sourceLink metadata.
 *
 * Dependencies:
 * - openai SDK, @google/generative-ai, global fetch for Responses API requests.
 *
 * Side Effects:
 * - Issues outbound HTTPS calls to third-party AI providers; logs errors on failure.
 *
 * Recent Changes:
 * - 2025-09-23: Added GPT-5 Responses API bridge and Gemini 2.5 model support.
 */

import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Custom type for Gemini API request
interface GeminiGroundedResponse {
  text: string;
  sourceLink?: string;
}

type AIClientType = {
  openai: OpenAI;
};

type AIClientResponse = {
  client: AIClientType[keyof AIClientType];
  type: keyof AIClientType;
};

export const AI_MODELS = {
  SONNET: "claude-sonnet-4-20250514",
  O1: "o1-2024-12-17",
  GPT_5: "gpt-5",
  GPT_4O: "gpt-4o",
  GPT_4O_MINI: "gpt-4o-mini",
  PERPLEXITY_SMALL: "sonar",
  PERPLEXITY_LARGE: "sonar-pro",
  GEMINI_FLASH_WEB: "gemini-2.0-flash-exp",
  GEMINI_FLASH_THINKING: "gemini-2.0-flash-thinking-exp-01-21",
  GEMINI_PRO: "gemini-2.5-pro",
  GEMINI_FLASH: "gemini-2.5-flash",
} as const;

export type AIModel = keyof typeof AI_MODELS;

type GPT5ReasoningEffort = "minimal" | "low" | "medium" | "high";

export type GenerateChatCompletionOptions =
  Partial<OpenAI.ChatCompletionCreateParamsNonStreaming> & {
    reasoning?: { effort: GPT5ReasoningEffort };
    text?: { verbosity: "low" | "medium" | "high" };
  };

type ResponsesApiTextContent = {
  type: string;
  text?: string;
};

type ResponsesApiOutputItem = {
  content?: ResponsesApiTextContent[];
};

type ResponsesApiResult = {
  output_text?: string;
  output?: ResponsesApiOutputItem[];
};

function extractResponseOutputText(response: ResponsesApiResult): string {
  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  if (!Array.isArray(response.output)) {
    return "";
  }

  return response.output
    .map((item) => {
      if (!Array.isArray(item.content)) {
        return "";
      }

      return item.content
        .map((block) =>
          block && typeof block.text === "string" ? block.text : "",
        )
        .join("");
    })
    .join("");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function getClientForModel(model: AIModel): AIClientResponse {
  const modelId = AI_MODELS[model];

  if (modelId.includes("sonar")) {
    return { client: perplexity, type: "openai" };
  }

  return { client: openai, type: "openai" };
}

/**
 * Generates a response from Gemini models with optional web grounding.
 * @param messages Array of message objects with role and content
 * @param model The Gemini model to use
 * @param ground Whether to enable web grounding
 * @returns Promise with text response and optional source links
 */
export async function generateGeminiWebResponse(
  messages: Array<{ role: "user" | "system" | "assistant"; content: string }>,
  model: AIModel = "GEMINI_FLASH_WEB",
  ground = true,
): Promise<GeminiGroundedResponse> {
  const modelId = AI_MODELS[model];
  const geminiModel = genAI.getGenerativeModel({
    model: modelId,
    // @ts-ignore
    tools: ground ? [{ googleSearch: {} }] : undefined,
  });

  // Convert messages to Gemini format
  const prompt = messages.map((m) => m.content).join("\n");

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  let sourceLink: string | undefined = undefined;
  if (
    ground &&
    response.candidates?.[0]?.groundingMetadata?.searchEntryPoint
      ?.renderedContent
  ) {
    sourceLink =
      response.candidates[0].groundingMetadata.searchEntryPoint.renderedContent;
  }

  return {
    text,
    sourceLink,
  };
}

export function parseJsonResponse(response: string): any {
  // First try parsing the response directly
  try {
    return JSON.parse(response);
  } catch (e) {
    // If direct parsing fails, look for code blocks
    const codeBlockRegex = /```(?:json|[^\n]*\n)?([\s\S]*?)```/;
    const match = response.match(codeBlockRegex);

    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (innerError) {
        throw new Error("Failed to parse JSON from code block");
      }
    }

    throw new Error("No valid JSON found in response");
  }
}

export async function generateChatCompletion(
  messages: Array<{ role: "user" | "system" | "assistant"; content: string }>,
  model: AIModel = "O1",
  additionalOptions: GenerateChatCompletionOptions = {},
): Promise<string> {
  try {
    const modelId = AI_MODELS[model];
    const { reasoning, text, ...chatOptions } = additionalOptions;

    // Handle Gemini models directly
    if (modelId.includes("gemini")) {
      const geminiResp = await generateGeminiWebResponse(
        messages,
        model,
        false,
      );
      return geminiResp.text;
    }

    if (modelId.startsWith("gpt-5")) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is not configured");
      }

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: modelId,
          input: messages.map((message) => ({
            role: message.role,
            content: [{ type: "text", text: message.content }],
          })),
          ...(reasoning ? { reasoning } : {}),
          ...(text ? { text } : {}),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `GPT-5 response API error: ${response.status} ${errorBody}`,
        );
      }

      const result = (await response.json()) as ResponsesApiResult;
      return extractResponseOutputText(result);
    }

    // Handle OpenAI and Perplexity models
    const { client } = getClientForModel(model);
    const options: OpenAI.ChatCompletionCreateParamsNonStreaming = {
      model: modelId,
      messages,
      ...chatOptions,
    };

    const completion = await client.chat.completions.create(options);
    return completion.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error(
      `Error generating chat completion for model ${model}:`,
      error,
    );
    throw error;
  }
}
