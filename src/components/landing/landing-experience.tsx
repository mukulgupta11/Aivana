"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  CircleDotDashed,
  Eye,
  Github,
  GitPullRequest,
  Gauge,
  MessageSquareCode,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const heroStats = [
  { label: "review time saved", value: "42%" },
  { label: "risky patterns found", value: "3.8x" },
  { label: "PRs covered", value: "100%" },
];

const findings = [
  {
    label: "Security",
    file: "api/webhooks/github/route.ts",
    detail: "Webhook signature verified before parsing payloads.",
    tone: "text-rose-200",
    bar: "bg-rose-300",
  },
  {
    label: "Reliability",
    file: "server/services/ai.ts",
    detail: "Retry now backs off before touching provider limits.",
    tone: "text-sky-200",
    bar: "bg-sky-300",
  },
  {
    label: "Maintainability",
    file: "components/diff-viewer.tsx",
    detail: "Large diff rendering is isolated from review state.",
    tone: "text-emerald-200",
    bar: "bg-emerald-300",
  },
];

const tickerItems = [
  "GitHub PRs",
  "risk scoring",
  "inline comments",
  "security checks",
  "repo context",
  "maintainer tone",
  "release confidence",
  "diff intelligence",
];

const featureCards: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    icon: Radar,
    title: "Find the change that matters",
    description:
      "Aivana follows the diff, the surrounding files, and the review history so feedback lands where engineers already look.",
    accent: "bg-[#c9b4fa]",
  },
  {
    icon: MessageSquareCode,
    title: "Comments that read senior",
    description:
      "Clear recommendations explain the issue, the impact, and the smallest useful fix without turning every PR into noise.",
    accent: "bg-[#9bd5e9]",
  },
  {
    icon: ShieldCheck,
    title: "Release confidence built in",
    description:
      "Security, quality, and maintainability checks stay visible before code reaches production.",
    accent: "bg-[#9ee6c6]",
  },
];

const flowSteps = [
  {
    icon: Github,
    title: "Connect",
    description: "Select repositories and let Aivana watch every PR update.",
  },
  {
    icon: BrainCircuit,
    title: "Analyze",
    description: "The review engine maps changed code to risks and context.",
  },
  {
    icon: BadgeCheck,
    title: "Resolve",
    description: "Teams merge with a short, useful trail of decisions.",
  },
];

const audienceCards = [
  {
    icon: Users,
    title: "Team-ready review memory",
    description:
      "Keep consistent PR history, review notes, and risk reduction visible for the people building the product.",
    metric: "shared context",
  },
  {
    icon: Eye,
    title: "Release-ready confidence",
    description:
      "See whether each release has been reviewed against security, reliability, and maintainability before it ships.",
    metric: "cleaner releases",
  },
  {
    icon: Gauge,
    title: "Less review drag",
    description:
      "Keep review quality high while the team moves quickly, grows repos, and ships more surface area.",
    metric: "faster triage",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const primaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#1b1938] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(27,25,56,0.22)] transition hover:bg-[#0e0c1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9b4fa] focus-visible:ring-offset-2";

const heroButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c9b4fa] px-5 py-3 text-sm font-bold text-[#1b1938] shadow-[0_18px_40px_rgba(201,180,250,0.25)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1938]";

export function LandingExperience() {
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.6,
  });

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#292827] antialiased">
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-[#c9b4fa]"
        style={{ scaleX }}
      />
      <Hero reduceMotion={reduceMotion} />
      <TickerStrip reduceMotion={reduceMotion} />
      <FeatureSection />
      <ReviewFlow />
      <AudienceSection />
      <ClosingBand />
      <Footer />
    </div>
  );
}

function Hero({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section
      className="relative isolate min-h-[760px] overflow-hidden bg-[#1b1938] text-white"
      style={{
        background:
          "linear-gradient(135deg, #1b1938 0%, #1b1938 48%, #28224f 76%, #6f9fbd 100%)",
      }}
    >
      <HeroAtmosphere reduceMotion={reduceMotion} />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="flex size-9 items-center justify-center rounded-[8px] border border-white/15 bg-white/10">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg font-bold">Aivana</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="hidden rounded-[8px] px-3 py-2 text-sm font-semibold text-white/76 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Sign in
          </Link>
          <Link href="/sign-up" className={heroButton}>
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </nav>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase text-[#c9b4fa]"
          >
            <CircleDotDashed className="size-3.5" />
            AI review engine
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-[540] leading-[0.98] text-white sm:text-6xl lg:text-7xl"
          >
            AI code reviews for teams that ship fast.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg font-[460] leading-8 text-white/74 sm:text-xl"
          >
            Aivana reviews every pull request like a senior teammate: it finds
            risk, explains the fix, and helps your team keep quality high while
            the product keeps moving.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <Link href="/sign-up" className={heroButton}>
              Start free
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[8px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/56">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroReviewScene reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

function HeroAtmosphere({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <motion.div
        className="absolute -right-10 top-0 h-full w-2/3 bg-[linear-gradient(90deg,rgba(27,25,56,0)_0%,rgba(201,180,250,0.12)_42%,rgba(155,213,233,0.18)_100%)]"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.72, 0.95, 0.72],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(27,25,56,0),rgba(27,25,56,0.92))]" />
    </div>
  );
}

function HeroReviewScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 34 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="relative hidden min-h-[560px] lg:block"
      aria-label="Animated product preview"
    >
      <svg
        className="absolute inset-0 h-full w-full text-white/20"
        viewBox="0 0 720 560"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M36 278 C 168 142, 326 428, 676 118"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 2.4,
            ease: "easeInOut",
            repeat: reduceMotion ? 0 : Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.path
          d="M58 442 C 196 340, 310 264, 684 374"
          stroke="#c9b4fa"
          strokeWidth="2"
          strokeDasharray="5 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 3.2,
            ease: "easeInOut",
            repeat: reduceMotion ? 0 : Infinity,
            repeatType: "mirror",
            delay: 0.4,
          }}
        />
      </svg>

      <motion.div
        className="absolute right-0 top-6 w-[640px] rounded-[8px] border border-white/14 bg-[#0e0c1f]/88 shadow-[0_32px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-300" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60">
            <GitPullRequest className="size-3.5" />
            PR #148 ready for review
          </div>
        </div>

        <div className="grid grid-cols-[1fr_260px] gap-0">
          <div className="border-r border-white/10 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">
                  Checkout security hardening
                </p>
                <p className="mt-1 text-xs text-white/46">
                  8 files changed, 4 reviewers notified
                </p>
              </div>
              <span className="rounded-full bg-emerald-300/16 px-3 py-1 text-xs font-bold text-emerald-200">
                Low risk
              </span>
            </div>

            <div className="space-y-3">
              {findings.map((finding, index) => (
                <motion.div
                  key={finding.file}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.14, duration: 0.5 }}
                  className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`text-xs font-bold ${finding.tone}`}>
                      {finding.label}
                    </span>
                    <span className="font-mono text-[11px] text-white/42">
                      {finding.file}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span
                      className={`block h-2 w-2/3 rounded-full ${finding.bar}`}
                    />
                    <span className="block h-2 w-full rounded-full bg-white/14" />
                    <span className="block h-2 w-4/5 rounded-full bg-white/10" />
                  </div>
                  <p className="mt-3 text-xs leading-5 text-white/64">
                    {finding.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase text-white/48">
                  Review signal
                </p>
                <Zap className="size-4 text-[#c9b4fa]" />
              </div>
              <div className="space-y-4">
                {[
                  ["Security", "92%"],
                  ["Context", "86%"],
                  ["Maintainability", "78%"],
                ].map(([label, width]) => (
                  <div key={label}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="text-white/62">{label}</span>
                      <span className="text-white">{width}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-[#c9b4fa]"
                        initial={{ width: 0 }}
                        animate={{ width }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[8px] border border-[#c9b4fa]/28 bg-[#c9b4fa]/12 p-4">
              <p className="text-sm font-bold text-white">Aivana summary</p>
              <p className="mt-2 text-xs leading-5 text-white/64">
                Safe to merge after webhook validation and retry boundaries are
                confirmed in staging.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-4 top-24 w-48 rounded-[8px] border border-white/14 bg-white/10 p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl"
        animate={reduceMotion ? undefined : { y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs font-bold uppercase text-white/52">
          Release pulse
        </p>
        <div className="mt-3 flex items-end gap-1.5">
          {[42, 62, 50, 78, 68, 92, 84].map((height, index) => (
            <motion.span
              key={index}
              className="w-full rounded-t bg-[#9bd5e9]"
              initial={{ height: 8 }}
              animate={{ height }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.55 }}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-white/58">Quality trend improving</p>
      </motion.div>
    </motion.div>
  );
}

function TickerStrip({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="overflow-hidden border-y border-[#e8e4dd] bg-white py-5">
      <motion.div
        className="flex min-w-max gap-3"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e4dd] bg-[#fafaf8] px-4 py-2 text-sm font-bold text-[#292827]"
          >
            <CheckCircle2 className="size-4 text-[#155555]" />
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function FeatureSection() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="bg-white px-5 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Designed for trust"
          title="The review layer people can see."
          description="Motion-inspired transitions make the product feel fast, but the real graphic is the workflow: every change gets a clear path from risk to resolution."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-[#e8e4dd] bg-[#e8e4dd] md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white p-7"
              >
                <div
                  className={`mb-8 flex size-12 items-center justify-center rounded-[8px] ${feature.accent} text-[#1b1938]`}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="text-2xl font-[540] leading-tight text-[#292827]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#73706d]">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function ReviewFlow() {
  return (
    <section className="bg-[#fafaf8] px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-sm font-bold uppercase text-[#155555]">
            Review choreography
          </p>
          <h2 className="mt-4 text-4xl font-[540] leading-none text-[#292827] sm:text-5xl">
            From open PR to confident merge.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#73706d]">
            Aivana gives the page a visible narrative: connect GitHub, analyze
            the diff, resolve the risk. The interface keeps review work clear,
            searchable, and easy to act on.
          </p>
          <Link href="/sign-up" className={`${primaryButton} mt-8`}>
            Connect GitHub
            <Github className="size-4" />
          </Link>
        </motion.div>

        <div className="relative min-h-[420px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 640 420"
            fill="none"
            aria-hidden
          >
            <motion.path
              d="M86 132 C 210 34, 326 210, 546 112"
              stroke="#1b1938"
              strokeOpacity="0.22"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M86 286 C 218 356, 330 196, 546 292"
              stroke="#155555"
              strokeOpacity="0.28"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.15 }}
            />
          </svg>

          <div className="relative grid h-full gap-4 sm:grid-cols-3 lg:gap-5">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="self-center rounded-[8px] border border-[#e8e4dd] bg-white p-6 shadow-[0_18px_55px_rgba(27,25,56,0.08)]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-[8px] bg-[#1b1938] text-white">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-xs text-[#9a9794]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-[540] text-[#292827]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#73706d]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Built for review flow"
          title="Sharper signals for engineering teams."
          description="Aivana turns the hidden work of code review into a focused product surface: risk is visible, decisions are easier, and engineers get useful feedback."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {audienceCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[8px] border border-[#e8e4dd] bg-[#fafaf8] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-11 items-center justify-center rounded-[8px] bg-white text-[#155555] shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-[#e6f2ef] px-3 py-1 text-xs font-bold text-[#155555]">
                    {card.metric}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-[540] leading-tight text-[#292827]">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#73706d]">
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingBand() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto grid max-w-6xl gap-8 rounded-[8px] bg-[#0e3030] p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center"
      >
        <div>
          <p className="text-sm font-bold uppercase text-white/54">
            Ready for the next PR?
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-[540] leading-tight text-white sm:text-4xl">
            Make your product feel as thoughtful as the engineering behind it.
          </h2>
        </div>
        <Link
          href="/sign-up"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-bold text-[#0e3030] transition hover:bg-[#c9b4fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Start free
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div variants={fadeUp} className="max-w-3xl">
      <p className="text-sm font-bold uppercase text-[#155555]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-[540] leading-none text-[#292827] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-[#73706d]">{description}</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e8e4dd] bg-white px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm text-[#73706d] sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-[#292827]">
          <span className="flex size-8 items-center justify-center rounded-[8px] bg-[#1b1938] text-white">
            <Sparkles className="size-4" />
          </span>
          Aivana
        </Link>
        <div className="flex flex-wrap gap-5">
          <Link href="/sign-in" className="transition hover:text-[#292827]">
            Sign in
          </Link>
          <Link href="/sign-up" className="transition hover:text-[#292827]">
            Get started
          </Link>
        </div>
      </div>
    </footer>
  );
}
