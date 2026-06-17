"use client";

export function AivanaBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-55 dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(201,180,250,0.22),rgba(250,250,248,0))] dark:bg-[linear-gradient(180deg,rgba(201,180,250,0.12),rgba(17,16,33,0))]" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-[linear-gradient(0deg,rgba(14,48,48,0.12),rgba(250,250,248,0))] dark:bg-[linear-gradient(0deg,rgba(14,48,48,0.22),rgba(17,16,33,0))]" />
    </div>
  );
}
