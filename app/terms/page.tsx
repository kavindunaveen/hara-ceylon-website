import { PageShell } from "@/components/page-shell";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <PageShell title="Terms of Service" subtitle="The rules of using haraceylon.com.">
      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <h2>1. Acceptance</h2>
      <p>
        By accessing haraceylon.com you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>2. Orders &amp; Pricing</h2>
      <p>
        Prices are listed in LKR, USD or GBP depending on your selected currency
        and may change at any time. We reserve the right to refuse or cancel any
        order, including for stock or pricing errors.
      </p>

      <h2>3. Payment</h2>
      <p>
        Payments are processed by PayHere. By placing an order you authorise us to
        charge the full amount including shipping and any applicable taxes.
      </p>

      <h2>4. Shipping</h2>
      <p>
        Shipping times depend on destination and are estimates only. See our
        <a href="/shipping-policy"> Shipping Policy</a> for details.
      </p>

      <h2>5. Returns</h2>
      <p>
        See our <a href="/refund-policy">Refund Policy</a>.
      </p>

      <h2>6. Accounts</h2>
      <p>
        You are responsible for keeping your account credentials confidential.
        Notify us immediately of any unauthorised access.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content on this site (logos, copy, photography) is owned by Hara
        Ceylon Ltd and may not be reproduced without permission.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Hara Ceylon Ltd&apos;s total
        liability for any claim arising from your use of the site is limited to
        the amount you paid for the products giving rise to the claim.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are governed by the laws of Sri Lanka.
      </p>

      <h2>10. Contact</h2>
      <p>
        Email <a href="mailto:info@haraceylon.com">info@haraceylon.com</a>.
      </p>
    </PageShell>
  );
}
