# A Note from Kevin

Hi! If you're at this repo, you've probably seen one of my AI coding videos and want to try some of those techniques yourself. If you have no clue what I'm talking about, here's a good video to show you my approach and how to best use this repo: https://youtu.be/gXmakVsIbF0

You can also just use this with your own techniques, that's cool too.

You can follow the Getting Started instructions below to start using this stack right away. I've found that using a checklist of tasks in the agent-helpers/tasks folder is a great way to make a lot of quick and effective progress with AI Coding. I personally use Cursor in Composer Agent mode with GPT-5, but feel free to use your AI coding tool of choice.

If you need to create the checklist, here are some good prompts to use to go from a high-level idea to a full checklist of stories and tasks: https://chatgpt.com/share/67be0a59-e484-800d-a078-346b2c29d727

You can also use the template in agent-helpers/.cursor-template.xml to generate the task list for existing repos. I personally use my open-source project PasteMax to convert the files into a pastable string, but repomix.com is a good option as well.

# 🚀 Next.js Modern Stack Template

A Next.js template that combines commonly used tools and libraries for building full-stack web applications. This stack is specifically designed to be optimized for AI coding assistants like Cursor.

## 🎯 Overview

This template includes [Next.js 14](https://nextjs.org/) with the App Router, [Supabase](https://supabase.com) for the database, [Resend](https://resend.com) for transactional emails, and optional integrations with various AI providers and AWS services.

> ⚠️ **Note**: This is my personal template with tools that I personally have experience with and think are solid options for building modern full-stack web application. Your preferences very likely differ, so feel free to fork and modify it for your own use. I won't be accepting pull requests for additional features, but I'll be happy to help you out if you have any questions.

## ✨ Features

### 🏗️ Core Architecture

- [**Next.js 14**](https://nextjs.org/) - React framework with App Router
- [**TypeScript**](https://www.typescriptlang.org/) - Type safety throughout
- [**tRPC**](https://trpc.io/) - End-to-end type-safe APIs
- [**Prisma**](https://www.prisma.io/) - Database ORM and schema management
- [**NextAuth.js**](https://next-auth.js.org/) - Authentication with Prisma adapter
- [**Supabase**](https://supabase.com) - Postgres database with realtime and auth

### 🎨 UI & Styling

- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**Framer Motion**](https://www.framer.com/motion/) - Animation library
- [**Lucide Icons**](https://lucide.dev/) - Icon set
- Dark mode with Tailwind CSS

### 🛠️ Development Tools

- [**Storybook**](https://storybook.js.org/) - Component development environment
- [**Geist Font**](https://vercel.com/font) - Typography by Vercel

### 🤖 AI & Background Jobs

- Multiple AI integrations available:
  - [OpenAI](https://openai.com) - GPT-4 and o-series models
  - [Anthropic](https://anthropic.com) - Sonnet-3.5
  - [Perplexity](https://perplexity.ai) - Web search models
  - [Groq](https://groq.com) - Fast inference
- [**Inngest**](https://www.inngest.com/) - Background jobs and scheduled tasks

### 🔧 Infrastructure & Services

- [**Resend**](https://resend.com) - Email delivery
- [**AWS S3**](https://aws.amazon.com/s3/) - File storage
- [**Supabase**](https://supabase.com) - Primary database
  (Note that I don't directly use the supabase client in this template, so you can switch out supabase with other database providers via the DATABASE_URL and DIRECT_URL environment variables.)

### 🔔 Additional Features

- [**react-toastify**](https://fkhadra.github.io/react-toastify/) - Toast notifications
- Utility functions for common operations
- TypeScript and ESLint configuration included

### 🤖 Agent Features

- [**Agent Helpers**](./agent-helpers) - A folder for agent-specific files and tools.
- [**Agent Instructions**](./agent-helpers/README.md) - Instructions for the agent.
- [**Agent Tasks**](./agent-helpers/tasks.md) - A checklist of tasks for the agent to complete.
- [**Agent Scratchpad**](./agent-helpers/scratchpad.md) - A place for the agent to write down its thoughts and ideas.
- [**Agent Logs**](./agent-helpers/logs) - A place for the agent to write down its logs.

> **ℹ️ Add these lines to your `.gitignore` to avoid agent-helper conflicts (copy & paste):**

```.gitignore
# agent-helpers
agent-helpers/logs
agent-helpers/sample-code
agent-helpers/scratchpad.md
```

### 🤖 Cursor Custom Slash Commands

Cursor has a feature that allows you to define custom slash commands for your AI agents. This is a great way to help your agents navigate the codebase and complete tasks efficiently.

Here are the commands that are available to you, just type `/` in the agent window to see the list of commands.

- [**start**](.cursor/commands/start.md) - Start working on a new task.
- [**continue**](.cursor/commands/continue.md) - Queue these up to keep the agent working on the current task until all tasks are complete.
- [**review**](.cursor/commands/review.md) - Review the work that has been completed.
- [**document**](.cursor/commands/document.md) - Document the changes that have been made.
- [**refactor**](.cursor/commands/refactor.md) - Refactor the code to make it easier for AI agents to navigate in the future.

> **ℹ️ Tip: When starting a new task, you can queue these up to keep the agent working on the current task until all tasks are complete.** For example:

```txt
/start
/continue
/continue
/continue
/continue
/continue
/review
/refactor
/review
/document
```

If you want to add more commands, you can add them to the .cursor/commands folder, just start the file with `#` and the name of the command.

## 🚀 Getting Started

1. Fork this repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and configure your environment variables
4. Set up your database:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

- `app/` - Next.js app router pages and API routes
- `src/`
  - `components/` - UI components
  - `lib/` - Utilities and configurations
    - `api/` - tRPC routers
    - `utils/` - Shared utilities
  - `stories/` - Storybook files
- `prisma/` - Database schema

## 🚀 Deployment

This template is optimized for deployment on [Vercel](https://vercel.com).

### Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your database connection strings from Supabase:
   - Project Settings → Database
   - Copy both the URI (for `DATABASE_URL`) and Direct Connection (for `DIRECT_URL`)

### Vercel Setup

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure the following environment variables:
   - `DATABASE_URL` - Your Supabase database URL
   - `DIRECT_URL` - Your Supabase direct connection URL
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)
   - Add any other variables from `.env.example` that you're using
5. Deploy!

### Post-Deployment

1. Run database migrations in the Vercel deployment:

```bash
npx vercel env pull .env.production.local  # Pull production env vars
npx prisma migrate deploy                  # Deploy migrations to production
```

2. Set up your custom domain in Vercel (optional):
   - Go to your project settings
   - Navigate to Domains
   - Add your domain and follow the DNS configuration instructions

## 📝 License

MIT License
