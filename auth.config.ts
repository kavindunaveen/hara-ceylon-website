import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-safe Auth.js config used by middleware. Only providers and callbacks
 * that don't require Node APIs (no Prisma, no bcrypt). The Credentials provider
 * lives in auth.ts which runs on the Node runtime.
 */
export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string } | undefined)?.role;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnAccount = nextUrl.pathname.startsWith("/account");

      if (isOnAdmin) return isLoggedIn && role === "ADMIN";
      if (isOnAccount) return isLoggedIn;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role =
          (token.role as string) ?? "CUSTOMER";
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
