"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Currency } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

function parseImages(raw: string): string[] {
  return raw
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function optNum(v: FormDataEntryValue | null): number | null {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

async function ensureUniqueSlug(base: string, excludeId?: string) {
  let slug = base;
  let n = 0;
  for (;;) {
    const existing = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

const productFields = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slugInput: z.string().max(200).optional(),
  shortDescription: z.string().max(500).optional(),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  imagesRaw: z.string(),
  stock: z.coerce.number().int().min(0),
  lowStockAt: z.coerce.number().int().min(0),
  sku: z.string().max(80).optional(),
  weightGrams: z.coerce.number().int().min(1),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  priceLKR: z.coerce.number().min(0),
  priceUSD: z.coerce.number().min(0),
  priceGBP: z.coerce.number().min(0),
  saleLKR: z.number().min(0).nullable(),
  saleUSD: z.number().min(0).nullable(),
  saleGBP: z.number().min(0).nullable(),
});

function parseProductForm(formData: FormData) {
  const raw = {
    title: String(formData.get("title") ?? ""),
    slugInput: String(formData.get("slug") ?? "").trim() || undefined,
    shortDescription: String(formData.get("shortDescription") ?? "").trim() || undefined,
    description: String(formData.get("description") ?? ""),
    categoryId: String(formData.get("categoryId") ?? ""),
    imagesRaw: String(formData.get("images") ?? ""),
    stock: formData.get("stock"),
    lowStockAt: formData.get("lowStockAt"),
    sku: String(formData.get("sku") ?? "").trim() || undefined,
    weightGrams: formData.get("weightGrams"),
    isActive: formData.get("isActive") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || undefined,
    metaDescription: String(formData.get("metaDescription") ?? "").trim() || undefined,
    priceLKR: formData.get("priceLKR"),
    priceUSD: formData.get("priceUSD"),
    priceGBP: formData.get("priceGBP"),
    saleLKR: optNum(formData.get("saleLKR")),
    saleUSD: optNum(formData.get("saleUSD")),
    saleGBP: optNum(formData.get("saleGBP")),
  };
  return productFields.safeParse(raw);
}

async function revalidateProductPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/admin/products");
}

export type ActionState = { error?: string; success?: string } | null;

export async function createProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getAdminSession();
  if (!session) return { error: "Not authorized." };

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().formErrors.join(" ") };
  }
  const d = parsed.data;
  const images = parseImages(d.imagesRaw);
  if (images.length === 0) {
    return { error: "Add at least one image URL (one per line)." };
  }

  const baseSlug = d.slugInput ? slugify(d.slugInput) : slugify(d.title);
  if (!baseSlug) return { error: "Could not generate a URL slug from the title." };
  const slug = await ensureUniqueSlug(baseSlug);

  const product = await prisma.product.create({
    data: {
      slug,
      title: d.title,
      shortDescription: d.shortDescription,
      description: d.description,
      categoryId: d.categoryId,
      images,
      stock: d.stock,
      lowStockAt: d.lowStockAt,
      sku: d.sku || null,
      weightGrams: d.weightGrams,
      isActive: d.isActive,
      isFeatured: d.isFeatured,
      metaTitle: d.metaTitle,
      metaDescription: d.metaDescription,
      deletedAt: null,
      prices: {
        create: [
          { currency: Currency.LKR, amount: d.priceLKR, salePrice: d.saleLKR },
          { currency: Currency.USD, amount: d.priceUSD, salePrice: d.saleUSD },
          { currency: Currency.GBP, amount: d.priceGBP, salePrice: d.saleGBP },
        ],
      },
    },
  });

  await revalidateProductPaths(product.slug);
  redirect(`/admin/products/${product.id}/edit?created=1`);
}

export async function updateProduct(
  productId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getAdminSession();
  if (!session) return { error: "Not authorized." };

  const existing = await prisma.product.findUnique({ where: { id: productId } });
  if (!existing) return { error: "Product not found." };

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().formErrors.join(" ") };
  }
  const d = parsed.data;
  const images = parseImages(d.imagesRaw);
  if (images.length === 0) {
    return { error: "Add at least one image URL (one per line)." };
  }

  let slug = existing.slug;
  if (d.slugInput) {
    const next = slugify(d.slugInput);
    if (next && next !== existing.slug) {
      slug = await ensureUniqueSlug(next, existing.id);
    }
  }

  const oldSlug = existing.slug;

  await prisma.$transaction([
    prisma.product.update({
      where: { id: productId },
      data: {
        slug,
        title: d.title,
        shortDescription: d.shortDescription,
        description: d.description,
        categoryId: d.categoryId,
        images,
        stock: d.stock,
        lowStockAt: d.lowStockAt,
        sku: d.sku || null,
        weightGrams: d.weightGrams,
        isActive: d.isActive,
        isFeatured: d.isFeatured,
        metaTitle: d.metaTitle,
        metaDescription: d.metaDescription,
      },
    }),
    prisma.productPrice.upsert({
      where: {
        productId_currency: { productId, currency: Currency.LKR },
      },
      update: { amount: d.priceLKR, salePrice: d.saleLKR },
      create: {
        productId,
        currency: Currency.LKR,
        amount: d.priceLKR,
        salePrice: d.saleLKR,
      },
    }),
    prisma.productPrice.upsert({
      where: {
        productId_currency: { productId, currency: Currency.USD },
      },
      update: { amount: d.priceUSD, salePrice: d.saleUSD },
      create: {
        productId,
        currency: Currency.USD,
        amount: d.priceUSD,
        salePrice: d.saleUSD,
      },
    }),
    prisma.productPrice.upsert({
      where: {
        productId_currency: { productId, currency: Currency.GBP },
      },
      update: { amount: d.priceGBP, salePrice: d.saleGBP },
      create: {
        productId,
        currency: Currency.GBP,
        amount: d.priceGBP,
        salePrice: d.saleGBP,
      },
    }),
  ]);

  if (slug !== oldSlug) {
    revalidatePath(`/products/${oldSlug}`);
  }
  await revalidateProductPaths(slug);
  return { success: "Product saved." };
}

export async function softDeleteProduct(formData: FormData) {
  const session = await getAdminSession();
  if (!session) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return;

  await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date(), isActive: false },
  });

  await revalidateProductPaths(p.slug);
  redirect("/admin/products");
}

export async function restoreProduct(formData: FormData) {
  const session = await getAdminSession();
  if (!session) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return;

  await prisma.product.update({
    where: { id },
    data: { deletedAt: null, isActive: true },
  });

  await revalidateProductPaths(p.slug);
  redirect("/admin/products");
}
