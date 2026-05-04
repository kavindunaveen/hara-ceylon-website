"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, Store, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
];

export function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-brand-dark text-white min-h-screen flex flex-col border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/img/logo.webp"
            alt="Hara Ceylon"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <div>
            <p className="font-serif font-bold text-sm">Admin</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">
              Hara Ceylon
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-brand-gold text-brand-dark"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Store className="h-4 w-4 shrink-0" />
          View storefront
          <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
        </a>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        {email && (
          <p className="px-4 text-xs text-white/50 truncate" title={email}>
            {email}
          </p>
        )}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-red-900/40 hover:text-red-200 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
