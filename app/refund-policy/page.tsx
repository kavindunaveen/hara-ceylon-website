import { PageShell } from "@/components/page-shell";

export const metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <PageShell title="Refund Policy" subtitle="Our promise on quality and returns.">
      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <h2>Quality Guarantee</h2>
      <p>
        We stand behind every Hara Ceylon product. If your item arrives damaged,
        spoiled, or not as described, please contact us within <strong>7 days</strong> of
        delivery.
      </p>

      <h2>Eligible Returns</h2>
      <ul>
        <li>Damaged or defective items.</li>
        <li>Wrong product shipped.</li>
        <li>Items not received within the expected window.</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <ul>
        <li>Items that have been opened and used (for hygiene reasons).</li>
        <li>Items reported more than 7 days after delivery.</li>
      </ul>

      <h2>How to Request a Refund</h2>
      <ol>
        <li>Email <a href="mailto:info@haraceylon.com">info@haraceylon.com</a> with your order number and photos of the issue.</li>
        <li>We&apos;ll respond within 2 business days.</li>
        <li>If approved, refunds are issued via PayHere to the original payment method within 7&ndash;14 business days.</li>
      </ol>

      <h2>Shipping Costs</h2>
      <p>
        For damaged or incorrect items we cover return shipping. For other approved
        returns, the customer is responsible for return shipping.
      </p>
    </PageShell>
  );
}
