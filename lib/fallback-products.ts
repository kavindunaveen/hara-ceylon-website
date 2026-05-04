import type { StorefrontProduct } from "./products";

/**
 * Static fallback products used when DATABASE_URL is not configured yet
 * (e.g. first-time clone before running `npm run db:push && npm run db:seed`).
 * Once the database is reachable and seeded, these are no longer used.
 */
export const FALLBACK_PRODUCTS: StorefrontProduct[] = [
  {
    id: "fallback-1",
    slug: "premium-ceylon-black-tea",
    title: "Premium Ceylon Black",
    shortDescription:
      "Bold and full-bodied Ceylon black tea with a smooth, refreshing finish.",
    description:
      "Bold, full-bodied Ceylon black tea with a smooth, refreshing finish.",
    category: { slug: "tea", name: "Tea" },
    images: ["/img/PREMIUM-BLACK-TEA.png"],
    stock: 50,
    weightGrams: 100,
    isFeatured: true,
    prices: {
      LKR: { amount: 1800, salePrice: null },
      USD: { amount: 7.5, salePrice: null },
      GBP: { amount: 5.9, salePrice: null },
    },
  },
  {
    id: "fallback-2",
    slug: "premium-green-tea",
    title: "Premium Green Tea",
    shortDescription:
      "Light and refreshing Ceylon green tea with a clean, soothing taste.",
    description:
      "Light and refreshing Ceylon green tea with a clean, soothing taste.",
    category: { slug: "tea", name: "Tea" },
    images: ["/img/PREMIUM-GREEN-TEA.png"],
    stock: 50,
    weightGrams: 100,
    isFeatured: true,
    prices: {
      LKR: { amount: 1900, salePrice: null },
      USD: { amount: 7.9, salePrice: null },
      GBP: { amount: 6.2, salePrice: null },
    },
  },
  {
    id: "fallback-3",
    slug: "arabica-extra-fine-medium-roasted-coffee",
    title: "Arabica Extra Fine Medium Roasted Coffee",
    shortDescription:
      "Rich Arabica coffee with deep roasted notes and a smooth aroma.",
    description:
      "Rich Arabica coffee with deep roasted notes and a smooth aroma.",
    category: { slug: "coffee", name: "Coffee" },
    images: ["/img/Arabica-Extra-Fine-Medium-Roasted-Coffee.png"],
    stock: 40,
    weightGrams: 250,
    isFeatured: true,
    prices: {
      LKR: { amount: 2400, salePrice: null },
      USD: { amount: 9.9, salePrice: null },
      GBP: { amount: 7.9, salePrice: null },
    },
  },
  {
    id: "fallback-4",
    slug: "arabica-medium-dark-roasted-coffee",
    title: "Arabica Medium Dark Roasted Coffee",
    shortDescription:
      "Smooth medium-dark roasted Arabica coffee with refined flavor and aroma.",
    description:
      "Smooth medium-dark roasted Arabica coffee with refined flavor and aroma.",
    category: { slug: "coffee", name: "Coffee" },
    images: ["/img/Arabica-Medium-Dark-Rosated-Coffee.png"],
    stock: 40,
    weightGrams: 250,
    isFeatured: true,
    prices: {
      LKR: { amount: 2500, salePrice: null },
      USD: { amount: 10.5, salePrice: null },
      GBP: { amount: 8.2, salePrice: null },
    },
  },
];
