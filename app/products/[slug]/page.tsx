import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getProductBySlug } from "@/lib/products";
import { PdpAddToCart } from "./_components/pdp-add-to-cart";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title: "Product not found" };
  return {
    title: p.title,
    description: p.shortDescription ?? p.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <>
      <Header variant="solid" />

      <main className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-brand-green">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
              <Image
                src={product.images[0] ?? "/img/logo.webp"}
                alt={product.title}
                width={600}
                height={600}
                className="w-full max-w-md object-contain drop-shadow-lg"
              />
            </div>

            <div className="flex flex-col">
              <span className="inline-block bg-brand-gold text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide w-fit mb-3">
                {product.category.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <PdpAddToCart product={product} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat
        message={`Hello, I am interested in ${product.title}.`}
      />
    </>
  );
}
