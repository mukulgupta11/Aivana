"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  CheckCircle2,
  GitPullRequest,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

const reportItems: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Security review complete", icon: ShieldCheck },
  { label: "Risk score reduced", icon: Zap },
  { label: "Maintainer-ready summary", icon: CheckCircle2 },
];

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen overflow-hidden bg-background text-foreground lg:grid-cols-[1.05fr_0.95fr]">
      <div
        className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
        aria-hidden
      />

      <section className="relative hidden min-h-screen bg-[#1b1938] px-10 py-9 text-white lg:flex lg:flex-col">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,180,250,0) 0%, rgba(201,180,250,0.14) 52%, rgba(155,213,233,0.22) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-[8px] border border-white/15 bg-white/10">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg font-bold">Aivana</span>
        </Link>

        <div className="relative z-10 mt-auto max-w-xl pb-8">
          <p className="text-sm font-bold uppercase text-[#c9b4fa]">
            Review signal, always on
          </p>
          <h1 className="mt-4 text-5xl font-[540] leading-none">
            Keep every pull request sharp before it reaches production.
          </h1>
          <div className="mt-10 rounded-[8px] border border-white/12 bg-white/[0.07] p-5 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold">
                <GitPullRequest className="size-4 text-[#c9b4fa]" />
                PR quality report
              </div>
              <span className="rounded-full bg-emerald-300/16 px-3 py-1 text-xs font-bold text-emerald-200">
                Ready
              </span>
            </div>
            <div className="grid gap-3">
              {reportItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <Icon className="size-4 text-[#9bd5e9]" />
                  <span className="text-sm text-white/74">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-[8px] border border-border/70 bg-card p-6 shadow-[0_24px_80px_rgba(27,25,56,0.12)] sm:p-8">
          <Link
            href="/"
            className="mb-8 flex items-center gap-3 text-lg font-bold text-foreground lg:hidden"
          >
            <span className="flex size-9 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            Aivana
          </Link>
          <div className="mb-7">
            <h2 className="text-3xl font-[540] leading-tight">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
