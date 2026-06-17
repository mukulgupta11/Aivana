import { Header } from "@/components/header";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-45 dark:opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(201,180,250,0.2),rgba(250,250,248,0))] dark:bg-[linear-gradient(180deg,rgba(201,180,250,0.1),rgba(17,16,33,0))]" />
      <Header user={session.user} />
      <main className="container mx-auto px-4 py-8 lg:py-10">{children}</main>
    </div>
  );
}
