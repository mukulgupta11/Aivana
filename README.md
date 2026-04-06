# Aivana

AI-powered GitHub code reviews that catch bugs, security issues, and maintainability problems before they reach production.

## Features

- **AI Code Review** — Automatically analyzes pull request diffs using Google Gemini (`gemini-2.0-flash-lite`) and provides structured feedback with severity levels, categories, and actionable suggestions.
- **GitHub Integration** — Connect your GitHub account via OAuth, browse repositories, and review pull requests directly from the dashboard.
- **Risk Scoring** — Each review generates a risk score (0–100) to help prioritize what needs attention.
- **Diff Viewer** — Visual diff viewer to inspect file-level changes alongside AI-generated comments.
- **Background Processing** — Reviews are processed asynchronously using [Inngest](https://www.inngest.com) with cancellation support and automatic failure handling.
- **Dark Mode** — Full light/dark theme support via `next-themes`.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, Radix UI, shadcn/ui |
| API | [tRPC v11](https://trpc.io) |
| Auth | [Better Auth](https://www.better-auth.com) (Email + GitHub OAuth) |
| Database | PostgreSQL with [Prisma ORM](https://www.prisma.io) |
| AI | [Google Gemini](https://ai.google.dev) (`gemini-2.0-flash-lite`) |
| Background Jobs | [Inngest](https://www.inngest.com) |
| Data Fetching | TanStack React Query |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Sign-in and sign-up pages
│   ├── (dashboard)/      # Authenticated dashboard
│   │   ├── repos/        # Repository listing and PR details
│   │   └── reviews/      # Review history
│   ├── api/              # API routes (auth, tRPC, inngest, webhooks)
│   ├── layout.tsx        # Root layout with theme + tRPC providers
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── landing/          # Landing page components
│   ├── diff-viewer.tsx   # PR diff visualization
│   ├── review-result.tsx # Review result display
│   └── ...               # Header, user menu, theme toggle
├── lib/
│   ├── auth-client.ts    # Better Auth client
│   ├── trpc/             # tRPC client setup
│   └── utils.ts          # Utility functions
└── server/
    ├── api/
    │   ├── routers/      # tRPC routers (repository, pull-request, review)
    │   ├── root.ts       # Root router
    │   └── trpc.ts       # tRPC context and procedures
    ├── auth/             # Better Auth server config
    ├── db/               # Prisma client instance
    ├── inngest/          # Inngest client and background functions
    └── services/
        ├── ai.ts         # Gemini code review service
        └── github.ts     # GitHub API service
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [PostgreSQL](https://www.postgresql.org) database
- [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) credentials
- [Google Gemini API Key](https://ai.google.dev)

### 1. Clone the repository

```bash
git clone https://github.com/mukulgupta11/Aivana.git
cd Aivana
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/aivana"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google Gemini
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Set up the database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:generate` | Generate Prisma client |

## How It Works

1. **Connect GitHub** — Sign in with GitHub and grant repo access.
2. **Select a Repository** — Browse your connected repositories from the dashboard.
3. **Review a PR** — Select a pull request and trigger an AI review.
4. **Get Feedback** — Aivana fetches the PR diff, sends it to Gemini for analysis, and returns structured comments with severity ratings, categories, and fix suggestions.
5. **Iterate** — Review the feedback, cancel if needed, and re-trigger reviews as the PR evolves.

