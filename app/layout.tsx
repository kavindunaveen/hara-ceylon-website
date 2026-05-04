import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { siteConfig } from "@/lib/site";
import { isCurrencyCode, DEFAULT_CURRENCY } from "@/lib/currency";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/img/logo.webp",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cookieCurrency = cookieStore.get("hc_currency")?.value;
  const initialCurrency = isCurrencyCode(cookieCurrency)
    ? cookieCurrency
    : DEFAULT_CURRENCY;

  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans text-gray-800 bg-gray-50 overflow-x-hidden">
        <SessionProvider>
          <CurrencyProvider initial={initialCurrency}>
            {children}
          </CurrencyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
