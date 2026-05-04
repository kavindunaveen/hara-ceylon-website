"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { CartIcon } from "@/components/cart-icon";
import { CurrencySwitcher } from "@/components/currency-switcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export function Header({ variant = "transparent" }: { variant?: "transparent" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = variant === "solid" || scrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        showSolid ? "glass-dark py-2" : "bg-transparent py-6",
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="hidden md:grid grid-cols-3 items-center">
          <div className="justify-self-start flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium uppercase tracking-widest text-white/90 hover:text-brand-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="justify-self-center">
            <Link href="/" className="block">
              <Image
                src="/img/logo.webp"
                alt="Hara Ceylon"
                width={128}
                height={128}
                priority
                className={cn(
                  "w-auto object-contain transition-all duration-500 drop-shadow-xl",
                  showSolid ? "h-14" : "h-24",
                )}
              />
            </Link>
          </div>
          <div className="justify-self-end flex items-center gap-3">
            <CurrencySwitcher />
            <Link
              href="/account"
              aria-label="Account"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <CartIcon />
          </div>
        </div>

        <div className="md:hidden flex justify-between items-center">
          <Link href="/" className="block">
            <Image
              src="/img/logo.webp"
              alt="Hara Ceylon"
              width={64}
              height={64}
              priority
              className={cn(
                "w-auto transition-all duration-500",
                showSolid ? "h-10" : "h-14",
              )}
            />
          </Link>
          <div className="flex items-center gap-1">
            <CurrencySwitcher />
            <CartIcon />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="text-white text-2xl ml-2 p-2"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-dark border-t border-white/10 shadow-2xl p-6 space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white font-serif text-lg tracking-wide hover:text-brand-gold border-b border-white/10 pb-2"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="block text-white font-serif text-lg tracking-wide hover:text-brand-gold border-b border-white/10 pb-2"
            >
              Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
