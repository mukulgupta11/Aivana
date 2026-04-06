import { inngest } from "../client";
import { db } from "@/server/db";
import { reviewCode } from "@/server/services/ai";
import {
  fetchPullRequest,
  fetchPullRequestFiles,
  getGitHubAccessToken,
} from "@/server/services/github";

export type ReviewPREvent = {
  name: "review/pr.requested";
  data: {
    reviewId: string;
    repositoryId: string;
    prNumber: number;
    userId: string;
  };
};

async function isCancelled(reviewId: string): Promise<boolean> {
  const review = await db.review.findUnique({
    where: { id: reviewId },
    select: { status: true },
  });
  return review?.status === "CANCELLED";
}

export const reviewPR = inngest.createFunction(
  {
    id: "review-pr",
    retries: 0,
    onFailure: async ({ event }) => {
      const { reviewId } = event.data.event.data;
      // Mark review as FAILED in DB whenever Inngest marks the function as failed
      try {
        const review = await db.review.findUnique({
          where: { id: reviewId },
          select: { status: true },
        });
        // Don't overwrite CANCELLED or COMPLETED status
        if (
          review &&
          review.status !== "CANCELLED" &&
          review.status !== "COMPLETED"
        ) {
          await db.review.update({
            where: { id: reviewId },
            data: {
              status: "FAILED",
              error:
                event.data.error?.message ??
                "Review failed unexpectedly",
            },
          });
        }
      } catch {
        // Best-effort: if DB update fails here, nothing more we can do
      }
    },
  },
  { event: "review/pr.requested" },
  async ({ event, step }) => {
    const { reviewId, repositoryId, prNumber, userId } = event.data;

    await step.run("update-status-processing", async () => {
      await db.review.update({
        where: { id: reviewId },
        data: { status: "PROCESSING" },
      });
    });

    const repository = await step.run("get-repository", async () => {
      return db.repository.findUnique({
        where: { id: repositoryId },
      });
    });

    if (!repository) {
      await step.run("mark-failed-no-repo", async () => {
        await db.review.update({
          where: { id: reviewId },
          data: { status: "FAILED", error: "No repository found" },
        });
      });
      return { success: false, error: "No repository found" };
    }

    // Check if cancelled before fetching token
    const cancelledBeforeToken = await step.run(
      "check-cancelled-1",
      async () => isCancelled(reviewId),
    );
    if (cancelledBeforeToken) {
      return { success: false, error: "Review was cancelled" };
    }

    const accessToken = await step.run("get-access-token", async () => {
      return getGitHubAccessToken(userId);
    });

    if (!accessToken) {
      await step.run("mark-failed-no-token", async () => {
        await db.review.update({
          where: { id: reviewId },
          data: {
            status: "FAILED",
            error: "GitHub access token not found",
          },
        });
      });
      return { success: false, error: "GitHub access token not found" };
    }

    const [owner, repo] = repository.fullName.split("/");
    if (!owner || !repo) {
      await step.run("mark-failed-invalid-repo", async () => {
        await db.review.update({
          where: { id: reviewId },
          data: {
            status: "FAILED",
            error: "Invalid repository name",
          },
        });
      });
      return { success: false, error: "Invalid repository name" };
    }

    // Check if cancelled before fetching PR data
    const cancelledBeforeFetch = await step.run(
      "check-cancelled-2",
      async () => isCancelled(reviewId),
    );
    if (cancelledBeforeFetch) {
      return { success: false, error: "Review was cancelled" };
    }

    const files = await step.run("fetch-pr-files", async () => {
      return fetchPullRequestFiles(accessToken, owner, repo, prNumber);
    });

    const pr = await step.run("fetch-pr", async () => {
      return fetchPullRequest(accessToken, owner, repo, prNumber);
    });

    // Check if cancelled before calling AI
    const cancelledBeforeAI = await step.run(
      "check-cancelled-3",
      async () => isCancelled(reviewId),
    );
    if (cancelledBeforeAI) {
      return { success: false, error: "Review was cancelled" };
    }

    const reviewResult = await step.run("generate-review", async () => {
      return reviewCode(
        pr.title,
        files.map((f) => ({
          filename: f.filename,
          status: f.status,
          additions: f.additions,
          deletions: f.deletions,
          patch: f.patch,
        })),
      );
    });

    // Check if cancelled before saving result
    const cancelledBeforeSave = await step.run(
      "check-cancelled-4",
      async () => isCancelled(reviewId),
    );
    if (cancelledBeforeSave) {
      return { success: false, error: "Review was cancelled" };
    }

    await step.run("save-review-result", async () => {
      await db.review.update({
        where: { id: reviewId },
        data: {
          status: "COMPLETED",
          summary: reviewResult.summary,
          riskScore: reviewResult.riskScore,
          comments: reviewResult.comments,
        },
      });
    });

    return { success: true, reviewId };
  },
);
