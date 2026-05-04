import { PageShell } from "@/components/page-shell";
import Link from "next/link";

export const metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <PageShell title="My Account" subtitle="Sign in or create an account.">
      <p>
        The full account dashboard (orders, addresses, wishlist, profile) ships
        in <strong>Phase 5</strong>.
      </p>
      <div className="not-prose mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-green-800 transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/auth/register"
          className="inline-flex items-center justify-center px-6 py-3 border border-brand-green text-brand-green font-bold rounded-full hover:bg-brand-green hover:text-white transition-all"
        >
          Create Account
        </Link>
      </div>
    </PageShell>
  );
}
