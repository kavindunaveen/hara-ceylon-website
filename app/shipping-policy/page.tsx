import { PageShell } from "@/components/page-shell";

export const metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <PageShell title="Shipping Policy" subtitle="Delivery times, zones and rates.">
      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <h2>Processing Time</h2>
      <p>
        Orders are processed within 1&ndash;2 business days. You&apos;ll receive a
        tracking number by email once your order ships.
      </p>

      <h2>Shipping Zones &amp; Estimates</h2>
      <table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Estimated Delivery</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sri Lanka</td>
            <td>2&ndash;4 business days</td>
          </tr>
          <tr>
            <td>United Kingdom</td>
            <td>7&ndash;10 business days</td>
          </tr>
          <tr>
            <td>Rest of World</td>
            <td>10&ndash;21 business days</td>
          </tr>
        </tbody>
      </table>

      <h2>Shipping Costs</h2>
      <p>
        Calculated at checkout based on weight and destination. Free shipping
        thresholds apply per zone (e.g. orders over LKR 10,000 ship free within
        Sri Lanka).
      </p>

      <h2>Customs &amp; Duties</h2>
      <p>
        International orders may be subject to import duties and taxes levied by
        your destination country. These are the responsibility of the customer.
      </p>

      <h2>Lost or Delayed Parcels</h2>
      <p>
        If your order has not arrived within the estimated window, please contact
        us at <a href="mailto:info@haraceylon.com">info@haraceylon.com</a> with
        your order number.
      </p>
    </PageShell>
  );
}
