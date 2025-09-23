# Agent Guidelines

## Core Principles

- Keep files small (≤500 LOC) and organized in clear hierarchies. Smaller files improve AI navigation and reliability.
- Prefer functional components and typed interfaces. Reuse utilities instead of duplicating logic.
- Always update top-of-file docs after edits to maintain lightweight context for future agents.
- After all changes, **always run** `npm run build`. Ignore warnings, fix errors.

## Frontend (Next.js + React + TypeScript)

- Components: `src/components/`, PascalCase, functional only. Use `"use client"` where required.
- Styling: Tailwind only. Extend tokens in `tailwind.config.ts`. Use Framer Motion for animations. Never use Radix or shadcn.
- Icons: Prefer `lucide-react`, PascalCase names. Custom icons in `src/components/icons`.
- Notifications: `react-toastify` in client components (`toast.success()`, `toast.error()`).
- Routing: App Router in `app/`, kebab-case filenames. Server components by default.

## Backend (Prisma, tRPC, Inngest)

- Prisma: schema in `prisma/schema.prisma`, DB client in `src/lib/db.ts`. Tables snake_case → fields camelCase. No raw SQL. Use `npx prisma migrate dev`. NEVER use `prisma db push`, force a migration or any other commands that risk resetting the database.
- tRPC: Routers in `src/lib/api/routers/`, composed in `src/lib/api/root.ts`. Use `publicProcedure`/`protectedProcedure` with Zod. Access from React via `@/lib/trpc/react`.
- Inngest: Config in `inngest.config.ts`, API route in `src/app/api/inngest/route.ts`. Update UI via polling when events complete, not via tRPC responses.

## TypeScript & Conventions

- Strict mode, no `any`. Use optional chaining and union types (no enums).
- Shared types in `src/lib/types.ts`. Reusable logic in `src/lib/utils/shared.ts` (client) or `src/lib/utils/server.ts` (server).
- Sort imports: external → internal → sibling → styles. Semantic commits only.
- Use `tsx` scripts for migrations.

## AI & Agent Helpers

- AI calls go through `generateChatCompletion` in `src/lib/aiClient.ts`. Default to `GPT-5`.
- Store reusable tools and instructions in `agent-helpers/`. Start from `agent-helpers/README.md`.

## Storybook

- Stories in `src/stories/`, `.stories.tsx` extension. One per component, name matched.
- Use autodocs, include variants and sizes, test interactivity with actions. Use relative imports from component directory.
