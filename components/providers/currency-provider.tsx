"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CurrencyCode,
  DEFAULT_CURRENCY,
  isCurrencyCode,
} from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const COOKIE_KEY = "hc_currency";

function readCookie(): CurrencyCode | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  if (!m) return null;
  const v = decodeURIComponent(m[1]);
  return isCurrencyCode(v) ? v : null;
}

function writeCookie(c: CurrencyCode) {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE_KEY}=${c}; max-age=${oneYear}; path=/; SameSite=Lax`;
}

export function CurrencyProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial?: CurrencyCode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(
    initial ?? DEFAULT_CURRENCY,
  );

  useEffect(() => {
    const stored = readCookie();
    if (stored && stored !== currency) setCurrencyState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    writeCookie(c);
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
