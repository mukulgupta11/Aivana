"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed gradient layers + mouse-reactive orbs (listens on window, does not capture clicks).
 */
export function AivanaBackground() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const target = { x: 50, y: 42 };
    const current = { x: 50, y: 42 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.x = (e.clientX / w) * 100;
      target.y = (e.clientY / h) * 100;
    };

    const onLeave = () => {
      target.x = 50;
      target.y = 42;
    };

    const loop = () => {
      const ease = 0.065;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      el.style.setProperty("--mx", `${current.x}%`);
      el.style.setProperty("--my", `${current.y}%`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-white dark:bg-background"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 40%, rgba(0, 242, 254, 0.14), transparent 42%),
            radial-gradient(circle at 85% 60%, rgba(0, 85, 255, 0.11), transparent 52%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(
              600px circle at var(--mx, 50%) var(--my, 42%),
              rgba(0, 242, 254, 0.12),
              transparent 55%
            ),
            radial-gradient(
              480px circle at calc(var(--mx, 50%) + 18%) calc(var(--my, 42%) - 8%),
              rgba(0, 85, 255, 0.1),
              transparent 50%
            )
          `,
        }}
      />
      <div
        className="aivana-float-slow absolute -left-1/4 top-1/4 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full blur-3xl"
        style={{ background: "rgba(0, 242, 254, 0.08)" }}
      />
      <div
        className="aivana-float-slower absolute -right-1/4 bottom-1/4 h-[min(70vw,480px)] w-[min(70vw,480px)] rounded-full blur-3xl"
        style={{ background: "rgba(0, 85, 255, 0.07)" }}
      />
    </div>
  );
}
