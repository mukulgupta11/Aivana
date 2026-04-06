
import Link from "next/link";
import {
  Check,
  Files,
  GitPullRequest,
  Link2,
  MessageSquare,
  ScanSearch,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AivanaBackground } from "@/components/landing/aivana-background";

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-[#0055ff] px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_0_rgba(0,85,255,0.39)] transition-colors hover:bg-[#0044cc] hover:shadow-[0_6px_20px_rgba(0,85,255,0.23)]";

const glassCard =
  "group rounded-2xl border border-cyan-400/20 bg-white p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] transition-[box-shadow,border-color] duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,242,254,0.2),0_10px_25px_-5px_rgba(0,0,0,0.05)] md:p-8 dark:border-cyan-500/15 dark:bg-zinc-900/80";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-slate-800 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <AivanaBackground />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Aivana
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-[#0055ff] dark:text-zinc-300"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className={`${primaryBtn} px-5 py-2.5 text-sm font-medium`}
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-4 text-center">


          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Ship Better Code,
            <br />
            Faster than Ever
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-zinc-400">
            Automated, AI-powered GitHub code reviews that catch bugs, security
            issues, and maintainability problems before they reach production.
          </p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up" className={`${primaryBtn} w-full sm:w-auto`}>
              Sign Up for Free
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Sign In
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-600 dark:text-zinc-400">
            {[
              "No credit card required",
              "GitHub integration",
              "Private repos supported",
            ].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <Check
                  className="h-4 w-4 shrink-0 text-emerald-500"
                  strokeWidth={2.5}
                />
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "Instant Feedback",
                description:
                  "Get AI review feedback on every push and PR in minutes—surface bugs, risky patterns, and regressions before reviewers even open the diff.",
              },
              {
                icon: Shield,
                title: "Security Scanning",
                description:
                  "Flag common security issues, unsafe dependencies, and sensitive-data slips with explanations your team can act on immediately.",
              },
              {
                icon: MessageSquare,
                title: "Clear Suggestions",
                description:
                  "Comments read like a senior reviewer: concrete fixes, context-aware notes, and consistent tone across repositories.",
              },
              {
                icon: GitPullRequest,
                title: "PR Integration",
                description:
                  "Works where you already work—reviews show up on GitHub pull requests so nothing extra to install for contributors.",
              },
              {
                icon: ScanSearch,
                title: "Context Aware",
                description:
                  "Uses your repo structure and change scope so feedback stays relevant instead of generic lint-style noise.",
              },
              {
                icon: TrendingUp,
                title: "Always Improving",
                description:
                  "Backed by modern models and continuous refinement so review quality keeps pace as your codebase grows.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className={`${glassCard} flex items-start gap-6`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                  <Icon className="h-6 w-6 text-slate-700 dark:text-zinc-200" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="mb-16 text-3xl font-bold text-slate-900 dark:text-white">
            Up and running in minutes
          </h2>
          <div className="relative flex flex-col items-start justify-between md:flex-row">
            <div className="absolute top-8 right-[10%] left-[10%] z-0 hidden h-0.5 bg-linear-to-r from-blue-200 via-blue-400 to-blue-200 md:block dark:from-blue-900 dark:via-blue-600 dark:to-blue-900" />
            {[
              {
                icon: Link2,
                title: "Connect GitHub",
                description:
                  "Sign in with GitHub and grant access to the repos you want Aivana to review.",
              },
              {
                icon: GitPullRequest,
                title: "Open a PR",
                description:
                  "Open or update a pull request—Aivana analyzes the diff and posts structured feedback automatically.",
              },
              {
                icon: Files,
                title: "Merge with confidence",
                description:
                  "Triage suggestions, discuss inline, and merge knowing critical issues were surfaced early.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="relative z-10 mb-10 flex w-full flex-col items-center bg-transparent last:mb-0 md:mb-0 md:w-1/3"
              >
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                  <Icon className="h-8 w-8 text-[#0055ff]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="max-w-[220px] text-sm text-slate-500 dark:text-zinc-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="mb-8 text-3xl font-bold leading-tight text-slate-900 md:text-4xl dark:text-white">
            Ready to improve your code reviews?
            <br />
            Start free. Upgrade when your team needs more.
          </h2>
          <Link
            href="/sign-up"
            className={`${primaryBtn} inline-block px-10 py-4 shadow-[0_0_20px_rgba(37,99,235,0.35)]`}
          >
            Get started for free
          </Link>
        </section>
      </main>

      <footer className="relative z-10 mt-12 border-t border-slate-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <p className="text-sm text-slate-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Aivana
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <Link
              href="/sign-in"
              className="text-slate-600 transition-colors hover:text-[#0055ff] dark:text-zinc-400"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-slate-600 transition-colors hover:text-[#0055ff] dark:text-zinc-400"
            >
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
