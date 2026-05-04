import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

/** Avoid Prisma/auth DB calls during `next build` when DATABASE_URL is unset. */
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session?.user?.id || role !== "ADMIN") {
    redirect("/auth/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <AdminSidebar email={session.user.email} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
