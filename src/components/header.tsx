"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FolderGit2, GitPullRequest, Sparkles } from "lucide-react";
import { UserMenu } from "./user-menu";
import { ThemeToggle } from "./theme-toggle";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null | undefined;
}

interface HeaderProps {
  user: User;
}

const navItems = [
  {
    href: "/repos",
    label: "Repositories",
    icon: FolderGit2,
  },
  {
    href: "/reviews",
    label: "Reviews",
    icon: GitPullRequest,
  },
];

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/88 backdrop-blur-xl supports-backdrop-filter:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/repos"
            className="flex items-center gap-3 text-lg font-bold text-foreground"
          >
            <span className="flex size-9 items-center justify-center rounded-[8px] bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-4" />
            </span>
            <span>Aivana</span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-[8px] border border-border/70 bg-card p-1 shadow-sm md:flex">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-[8px] px-3 py-1.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="h-5 w-px bg-border mx-1 hidden sm:block" />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
