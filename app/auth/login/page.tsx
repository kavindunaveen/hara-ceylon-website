import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <PageShell title="Sign In" subtitle="Admin and customer access.">
      <p className="text-gray-600 mb-6">
        Use the email and password from your <code className="text-sm bg-gray-100 px-1 rounded">ADMIN_EMAIL</code> /{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code>{" "}
        in <code className="text-sm bg-gray-100 px-1 rounded">.env</code> after running{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">npm run db:seed</code>.
      </p>
      <Suspense fallback={<p className="text-gray-500 text-sm">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </PageShell>
  );
}
