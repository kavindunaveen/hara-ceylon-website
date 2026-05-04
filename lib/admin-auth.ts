import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user?.id || role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getAdminSession() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user?.id || role !== "ADMIN") return null;
  return session;
}
