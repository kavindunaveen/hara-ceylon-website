import "server-only";
import { prisma } from "./prisma";
import { CurrencyCode } from "./currency";
import { FALLBACK_PRODUCTS } from "./fallback-products";

export type StorefrontProduct = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  description: string;
  category: { slug: string; name: string };
  images: string[];
  stock: number;
  weightGrams: number;
  isFeatured: boolean;
  prices: Record<CurrencyCode, { amount: number; salePrice: number | null }>;
};

function shape(p: Awaited<ReturnType<typeof rawQuery>>[number]): StorefrontProduct {
  const prices: StorefrontProduct["prices"] = {
    LKR: { amount: 0, salePrice: null },
    USD: { amount: 0, salePrice: null },
    GBP: { amount: 0, salePrice: null },
  };
  for (const pp of p.prices) {
    prices[pp.currency as CurrencyCode] = {
      amount: Number(pp.amount),
      salePrice: pp.salePrice ? Number(pp.salePrice) : null,
    };
  }
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    shortDescription: p.shortDescription,
    description: p.description,
    category: { slug: p.category.slug, name: p.category.name },
    images: p.images,
    stock: p.stock,
    weightGrams: p.weightGrams,
    isFeatured: p.isFeatured,
    prices,
  };
}

function rawQuery() {
  return prisma.product.findMany({
    where: { isActive: true, deletedAt: null },
    include: { prices: true, category: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
}

function dbConfigured() {
  return !!process.env.DATABASE_URL;
}

export async function getAllStorefrontProducts(): Promise<StorefrontProduct[]> {
  if (!dbConfigured()) return FALLBACK_PRODUCTS;
  try {
    const list = await rawQuery();
    if (list.length === 0) return FALLBACK_PRODUCTS;
    return list.map(shape);
  } catch (e) {
    console.warn("[products] DB query failed, falling back to seed data:", (e as Error).message);
    return FALLBACK_PRODUCTS;
  }
}

export async function getFeaturedProducts(
  limit = 4,
): Promise<StorefrontProduct[]> {
  if (!dbConfigured()) return FALLBACK_PRODUCTS.slice(0, limit);
  try {
    const list = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true, deletedAt: null },
      include: { prices: true, category: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    if (list.length === 0) return FALLBACK_PRODUCTS.slice(0, limit);
    return list.map(shape);
  } catch (e) {
    console.warn("[products] DB query failed, falling back to seed data:", (e as Error).message);
    return FALLBACK_PRODUCTS.slice(0, limit);
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  if (!dbConfigured()) {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  try {
    const p = await prisma.product.findFirst({
      where: { slug, isActive: true, deletedAt: null },
      include: { prices: true, category: true },
    });
    if (p) return shape(p);
    return FALLBACK_PRODUCTS.find((x) => x.slug === slug) ?? null;
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}
