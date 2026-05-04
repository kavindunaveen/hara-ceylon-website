"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "@/components/providers/currency-provider";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-brand-gold transition-colors"
        aria-label="Change currency"
      >
        {currency}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-lg bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden">
          {SUPPORTED_CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-2.5 text-left text-sm transition-colors",
                currency === c.code
                  ? "bg-brand-gold/10 text-brand-green font-semibold"
                  : "text-gray-700 hover:bg-gray-50",
              )}
            >
              <span className="font-mono font-bold mr-2">{c.code}</span>
              <span className="text-xs text-gray-500">{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
