import Link from "next/link";
import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  EditProductForm,
  type ProductFormValues,
} from "../../_components/product-form";

export const metadata = { title: "Edit product · Admin" };

type ProductEdit = Prisma.ProductGetPayload<{
  include: { prices: true };
}>;

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { created?: string };
}) {
  let categories: { id: string; name: string; slug: string }[] = [];
  let product: ProductEdit | null = null;

  try {
    categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      select: { id: true, name: true, slug: true },
    });
    product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { prices: true },
    });
  } catch {
    categories = [];
    product = null;
  }

  if (!product) return notFound();

  const values: ProductFormValues = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    shortDescription: product.shortDescription,
    description: product.description,
    categoryId: product.categoryId,
    images: product.images,
    stock: product.stock,
    lowStockAt: product.lowStockAt,
    sku: product.sku,
    weightGrams: product.weightGrams,
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    prices: product.prices.map((pr) => ({
      currency: pr.currency,
      amount: Number(pr.amount),
      salePrice: pr.salePrice ? Number(pr.salePrice) : null,
    })),
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="text-sm text-brand-green font-semibold hover:underline mb-2 inline-block"
        >
          ← Products
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Edit product
        </h1>
        <p className="text-gray-600 text-sm mt-1 font-mono">{product.slug}</p>
        {searchParams.created === "1" && (
          <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 inline-block">
            Product created. You can keep editing below.
          </p>
        )}
      </div>
      {categories.length === 0 ? (
        <p className="text-red-600 text-sm">Categories missing — run db:seed.</p>
      ) : (
        <EditProductForm categories={categories} product={values} />
      )}
    </div>
  );
}
