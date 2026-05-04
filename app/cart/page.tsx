import { PageShell } from "@/components/page-shell";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <PageShell title="Your Cart" subtitle="Review the items in your basket.">
      <p>
        The full cart experience ships in <strong>Phase 3</strong> of the build:
        line-item editing, quantity controls, coupon codes, and live shipping
        estimates.
      </p>
      <p>
        For now, the &ldquo;Add to Cart&rdquo; button on each product still records
        items in your browser via the cart store. Once Phase 3 lands you&apos;ll
        see them listed here.
      </p>
    </PageShell>
  );
}
