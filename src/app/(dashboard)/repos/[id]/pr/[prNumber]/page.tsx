"use client";

import { use, useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  GitPullRequest,
  GitMerge,
  ExternalLink,
  Clock,
  Plus,
  Minus,
  FileText,
  XCircle,
  CheckCircle,
  Loader2,
  GitBranch,
  ArrowRight,
  Wand2,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DiffViewer } from "@/components/diff-viewer";
import { ReviewResult } from "@/components/review-result";

type PageProps = {
  params: Promise<{ id: string; prNumber: string }>;
};

export default function PullRequestDetailPage({ params }: PageProps) {
  const { id, prNumber } = use(params);
  const prNum = parseInt(prNumber, 10);
  const [activeTab, setActiveTab] = useState<"review" | "files">("review");

  const pr = trpc.pullRequest.get.useQuery(
    { repositoryId: id, prNumber: prNum },
    { enabled: !isNaN(prNum) },
  );

  const files = trpc.pullRequest.files.useQuery(
    { repositoryId: id, prNumber: prNum },
    { enabled: !isNaN(prNum) },
  );

  const latestReview = trpc.review.getLatestForPR.useQuery(
    { repositoryId: id, prNumber: prNum },
    {
      enabled: !isNaN(prNum),
      refetchInterval: (query) => {
        const status = query.state.data?.status;
        if (status === "PENDING" || status === "PROCESSING") {
          return 2000;
        }
        return false;
      },
    },
  );

  const triggerReview = trpc.review.trigger.useMutation({
    onSuccess: () => {
      latestReview.refetch();
      pr.refetch();
    },
  });

  const cancelReview = trpc.review.cancel.useMutation({
    onSuccess: () => {
      latestReview.refetch();
    },
  });

  const isReviewing =
    latestReview.data?.status === "PENDING" ||
    latestReview.data?.status === "PROCESSING";

  if (pr.isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-96" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (pr.error || !pr.data) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <div className="mx-auto size-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="size-6 text-destructive" />
          </div>
          <p className="mt-4 font-medium text-destructive">
            {pr.error?.message ?? "Pull Request not found"}
          </p>
          <Link href={`/repos/${id}`} className="mt-6 inline-block">
            <Button variant={"outline"}>
              <ArrowLeft className="size-4" />
              Back to Repository
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isMerged = pr.data.state === "closed" && pr.data.mergedAt;

  return (
    <div className="space-y-8">
      <div className="rounded-[8px] bg-[#1b1938] p-6 text-white shadow-[0_24px_80px_rgba(27,25,56,0.16)]">
        <div className="flex items-start gap-4">
        <Link href={`/repos/${id}`}>
          <Button
            variant={"outline"}
            size={"icon"}
            className="mt-1 shrink-0 border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
          >
            <ArrowLeft className="size-4" />
          </Button>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className={cn(
                    "shrink-0 rounded-[8px] p-2",
                    isMerged
                      ? "bg-purple-300/15"
                      : pr.data.state === "closed"
                        ? "bg-red-300/15"
                        : "bg-emerald-300/15",
                  )}
                >
                  {isMerged ? (
                    <GitMerge className="size-5 text-purple-200" />
                  ) : pr.data.state === "closed" ? (
                    <XCircle className="size-5 text-red-200" />
                  ) : (
                    <GitPullRequest className="size-5 text-emerald-200" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase text-[#c9b4fa]">
                    Pull request review
                  </p>
                  <h1 className="mt-2 truncate text-3xl font-[540] leading-tight">
                    {pr.data.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PRStatusBadge
                      state={pr.data.state}
                      isMerged={!!isMerged}
                      draft={pr.data.draft}
                    />
                    <span className="font-mono text-sm text-white/58">
                      #{pr.data.number}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={pr.data.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button
                variant={"outline"}
                size={"sm"}
                className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                <ExternalLink className="size-4" />
                GitHub
              </Button>
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/62">
            <span className="flex items-center gap-2">
              <Avatar className="size-5 ring-1 ring-white/20">
                <AvatarImage src={pr.data.author.avatarUrl} />
                <AvatarFallback className="text-[10px]">
                  {pr.data.author.login?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-white">
                {pr.data.author.login}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              Review signal
            </span>
          </div>
        </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Additions", pr.data.additions],
            ["Deletions", pr.data.deletions],
            ["Files", pr.data.changedFiles],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[8px] border border-white/10 bg-white/[0.06] p-4"
            >
              <p className="text-2xl font-bold tabular-nums">{value}</p>
              <p className="mt-1 text-xs font-semibold uppercase text-white/50">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center divide-x divide-border/60">
            <div className="flex-1 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <GitBranch className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground mb-1">
                    Merged request
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <code className="min-w-0 truncate rounded bg-secondary px-2 py-0.5 font-mono text-xs">
                      {pr.data.headRef}
                    </code>
                    <ArrowRight className="size-3 text-muted-foreground shrink-0" />
                    <code className="px-2 py-0.5 rounded bg-secondary font-mono text-xs truncate">
                      {pr.data.baseRef}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 px-6 py-4">
              <StatItem
                icon={Plus}
                value={pr.data.additions}
                colorClass="text-emerald-600 dark:text-emerald-400"
                bgClass="bg-emerald-500/10"
              />
              <StatItem
                icon={Minus}
                value={pr.data.deletions}
                colorClass="text-red-600 dark:text-red-400"
                bgClass="bg-red-500/10"
              />
              <StatItem
                icon={FileText}
                value={pr.data.changedFiles}
                colorClass="text-muted-foreground dark:text-muted-foreground"
                bgClass="bg-muted"
              />
            </div>

            <div className="px-6 py-4 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg px-3 py-1.5">
                <ReviewStatusBadge
                  status={latestReview.data?.status ?? null}
                  completedAt={
                    latestReview.data?.status === "COMPLETED"
                      ? latestReview.data.createdAt
                      : null
                  }
                />
                {!isReviewing && <div className="h-4 w-px bg-border" />}
                {isReviewing ? (
                  <Button
                    variant="outline"
                    size={"sm"}
                    onClick={() => {
                      cancelReview.mutate({
                        repositoryId: id,
                        prNumber: prNum,
                      });
                    }}
                    disabled={cancelReview.isPending}
                    className="gap-1.5 h-auto py-1 px-2 text-xs border-red-500/30 text-red-600 hover:bg-red-500/10 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {cancelReview.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <XCircle />
                    )}
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size={"sm"}
                    onClick={() => {
                      triggerReview.mutate({
                        repositoryId: id,
                        prNumber: prNum,
                      });
                    }}
                    disabled={triggerReview.isPending}
                    className="gap-1.5 h-auto py-1 px-2 text-xs"
                  >
                    <Wand2 />
                    {latestReview.data ? "Re-run" : "Review"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="rounded-[8px] border border-border/70 bg-card p-1 shadow-sm">
        <div className="flex items-center gap-1">
          <TabButton
            active={activeTab === "review"}
            onClick={() => setActiveTab("review")}
            icon={ScanSearch}
            label="Reviews"
            count={
              latestReview.data?.status === "COMPLETED"
                ? Array.isArray(latestReview.data.comments)
                  ? latestReview.data.comments.length
                  : 0
                : 0
            }
          />

          <TabButton
            active={activeTab === "files"}
            onClick={() => setActiveTab("files")}
            icon={FileText}
            label="Changed Files"
            count={files.data?.length}
          />
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "review" && (
        <div>
          {latestReview.data ? (
            <ReviewResult review={latestReview.data} />
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="mx-auto size-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <ScanSearch className="size-7 text-primary" />
                </div>
                <p className="mt-4 font-medium">No reviews yet.</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                  Click &quot;Run AI Review&quot; to analyze this pull request
                  for bugs, security issues, and improvements.
                </p>
                <Button
                  className="mt-6"
                  onClick={() =>
                    triggerReview.mutate({ repositoryId: id, prNumber: prNum })
                  }
                  disabled={triggerReview.isPending}
                >
                  Run AI Review
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "files" && (
        <div>
          {files.isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : files.error ? (
            <Card className="border-destructive/50">
              <CardContent className="py-12 text-center">
                <div className="mx-auto size-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="size-6 text-destructive" />
                </div>
                <p className="mt-4 font-medium text-destructive">
                  No files changed.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {files.error.message}
                </p>
              </CardContent>
            </Card>
          ) : files.data ? (
            <DiffViewer files={files.data} />
          ) : null}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-semibold transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "px-1.5 py-0.5 text-xs rounded-md tabular-nums",
            active
              ? "bg-white/18 text-white"
              : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function StatItem({
  icon: Icon,
  value,
  label,
  colorClass,
  bgClass,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label?: string;
  colorClass: string;
  bgClass: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("p-1.5 rounded-md", bgClass)}>
        <Icon className={cn("size-3.5", colorClass)} />
      </div>
      <div>
        <p className={cn("text-sm font-semibold tabular-nums", colorClass)}>
          {value.toLocaleString()}
        </p>
        {label && (
          <p className={cn("text-xs font-medium", colorClass)}>{label}</p>
        )}
      </div>
    </div>
  );
}

function PRStatusBadge({
  state,
  isMerged,
  draft,
}: {
  state: string;
  isMerged: boolean;
  draft: boolean;
}) {
  if (draft) {
    return (
      <Badge
        variant={"secondary"}
        className="gap-1 border-white/20 bg-white/10 text-white"
      >
        Draft
      </Badge>
    );
  }

  if (isMerged) {
    return (
      <Badge
        variant={"secondary"}
        className="border border-purple-200/20 bg-purple-300/15 text-purple-100"
      >
        <GitMerge className="size-3" />
        Merged
      </Badge>
    );
  }

  if (state === "closed") {
    return (
      <Badge
        variant={"destructive"}
        className="gap-1 border border-red-200/20 bg-red-300/15 text-red-100"
      >
        <XCircle className="size-3" />
        Closed
      </Badge>
    );
  }

  if (state === "open") {
    return (
      <Badge
        variant={"secondary"}
        className="gap-1 border border-emerald-200/20 bg-emerald-300/15 text-emerald-100"
      >
        <GitMerge className="size-3" />
        Open
      </Badge>
    );
  }
}

function ReviewStatusBadge({
  status,
  completedAt,
}: {
  status: string | null;
  completedAt?: Date | null;
}) {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!status) {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border bg-muted text-muted-foreground"
      >
        <Clock className="h-3 w-3" />
        Not reviewed
      </Badge>
    );
  }

  const config = {
    COMPLETED: {
      icon: CheckCircle,
      label: completedAt
        ? `AI Review completed · ${getTimeAgo(completedAt)}`
        : "AI Review completed",
      className:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    PROCESSING: {
      icon: Loader2,
      label: "Analyzing code…",
      className:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      spin: true,
    },
    PENDING: {
      icon: Clock,
      label: "Queued for review",
      className:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    FAILED: {
      icon: XCircle,
      label: "Review failed",
      className:
        "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    },
    CANCELLED: {
      icon: XCircle,
      label: "Review cancelled",
      className:
        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    },
  }[status] ?? {
    icon: Clock,
    label: "Not reviewed",
    className: "bg-muted text-muted-foreground",
  };

  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("gap-1.5 border", config.className)}>
      <Icon className={cn("h-3 w-3", config.spin && "animate-spin")} />
      {config.label}
    </Badge>
  );
}
