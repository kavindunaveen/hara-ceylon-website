import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ProductCard } from "@/components/product-card";
import { getAllStorefrontProducts } from "@/lib/products";
import { ShopFilters } from "./_components/shop-filters";

export const metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string; sort?: string };
}) {
  const all = await getAllStorefrontProducts();
  const cat = searchParams.category;
  const q = (searchParams.q ?? "").toLowerCase().trim();
  const sort = searchParams.sort ?? "featured";

  let filtered = all;
  if (cat && cat !== "all")
    filtered = filtered.filter((p) => p.category.slug === cat);
  if (q)
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  if (sort === "price-asc")
    filtered = [...filtered].sort(
      (a, b) => a.prices.LKR.amount - b.prices.LKR.amount,
    );
  if (sort === "price-desc")
    filtered = [...filtered].sort(
      (a, b) => b.prices.LKR.amount - a.prices.LKR.amount,
    );
  if (sort === "name")
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  const categories = Array.from(
    new Map(all.map((p) => [p.category.slug, p.category])).values(),
  );

  return (
    <>
      <Header variant="solid" />

      <main>
        <header className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center px-4 overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/hero2.webp')" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-3xl mx-auto pt-16">
            <span className="block text-brand-gold font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm">
              Official Store
            </span>
            <h1 className="text-3xl md:text-6xl font-serif font-bold text-white mb-4">
              Our Full Collection
            </h1>
            <p className="text-sm md:text-lg text-gray-200 font-light leading-relaxed max-w-xl mx-auto">
              Discover premium teas and coffees harvested from the highlands of
              Sri Lanka.
            </p>
          </div>
        </header>

        <section className="py-16 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <ShopFilters categories={categories} />

            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <div className="inline-block p-10 rounded-3xl bg-white border border-gray-100 shadow-xl max-w-lg">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                    No products found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
