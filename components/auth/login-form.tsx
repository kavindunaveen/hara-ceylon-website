"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl") ?? "/account";
  const callbackUrl =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 not-prose max-w-md">
      {error && (
        <div
          className="rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Email
        </label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-brand-gold/30 outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-brand-gold/30 outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-brand-green text-white font-bold hover:bg-green-800 transition-colors disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-sm text-gray-500 text-center">
        No account yet?{" "}
        <Link href="/auth/register" className="text-brand-green font-semibold hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
