import { PageShell } from "@/components/page-shell";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy" subtitle="How we protect your information.">
      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <h2>1. Introduction</h2>
      <p>
        Hara Ceylon Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy and is committed to
        protecting your personal data. This policy explains what information we
        collect when you visit haraceylon.com and how we use it.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>Account information: name, email, phone number, address.</li>
        <li>Order details: items purchased, shipping address, billing address.</li>
        <li>Payment information: handled directly by PayHere (we do not store card numbers).</li>
        <li>Usage data: pages viewed, device, browser, approximate location.</li>
      </ul>

      <h2>3. How We Use It</h2>
      <ul>
        <li>To process and ship your orders.</li>
        <li>To send transactional emails (order confirmations, shipping updates).</li>
        <li>To respond to your inquiries.</li>
        <li>With your consent, to send marketing emails about new products and offers.</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>
        We share data only with service providers required to fulfil your order
        (e.g. PayHere for payments, courier companies for shipping). We do not sell
        your data.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal data
        at any time by emailing <a href="mailto:info@haraceylon.com">info@haraceylon.com</a>.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We use essential cookies for authentication, cart, and currency selection.
        Optional analytics cookies are only set with your consent.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions? Email <a href="mailto:info@haraceylon.com">info@haraceylon.com</a>.
      </p>
    </PageShell>
  );
}
