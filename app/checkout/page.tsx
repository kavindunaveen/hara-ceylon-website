import { PageShell } from "@/components/page-shell";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <PageShell title="Checkout" subtitle="Complete your purchase.">
      <p>
        Multi-step checkout (contact &rarr; shipping &rarr; payment) and the
        PayHere Onsite Checkout integration ship in <strong>Phase 3 &amp; 4</strong> of
        the build.
      </p>
    </PageShell>
  );
}
