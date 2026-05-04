export type CurrencyCode = "LKR" | "USD" | "GBP";

export const SUPPORTED_CURRENCIES: { code: CurrencyCode; label: string; symbol: string; locale: string }[] = [
  { code: "LKR", label: "Sri Lankan Rupee", symbol: "Rs.", locale: "en-LK" },
  { code: "USD", label: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "GBP", label: "British Pound", symbol: "£", locale: "en-GB" },
];

export const DEFAULT_CURRENCY: CurrencyCode = "LKR";

export function formatPrice(
  amount: number | string | null | undefined,
  currency: CurrencyCode = DEFAULT_CURRENCY,
): string {
  const value =
    typeof amount === "string" ? parseFloat(amount) : (amount ?? 0);
  if (Number.isNaN(value)) return "—";
  const cfg = SUPPORTED_CURRENCIES.find((c) => c.code === currency)!;
  return new Intl.NumberFormat(cfg.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "LKR" ? 0 : 2,
  }).format(value);
}

export function isCurrencyCode(v: unknown): v is CurrencyCode {
  return typeof v === "string" && ["LKR", "USD", "GBP"].includes(v);
}
