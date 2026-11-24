import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { mailto, operatorName, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal data Sense Optimization collects, why, and the choices you have.",
};

const toc = [
  { id: "who", label: "1. Who we are" },
  { id: "what", label: "2. Data we collect" },
  { id: "how", label: "3. How we use it" },
  { id: "legal-basis", label: "4. Legal basis (GDPR)" },
  { id: "sharing", label: "5. Sharing with third parties" },
  { id: "retention", label: "6. Data retention" },
  { id: "security", label: "7. Security" },
  { id: "rights", label: "8. Your rights" },
  { id: "cookies", label: "9. Cookies" },
  { id: "transfers", label: "10. International transfers" },
  { id: "children", label: "11. Children's privacy" },
  { id: "changes", label: "12. Changes to this policy" },
  { id: "contact", label: "13. Contact" },
];

const dataInventory = [
  ["Purchase & account data", "Name, email address, plan type, license key", "You, at checkout or signup"],
  [
    "Payment data",
    "Billing address, last 4 digits of card, transaction ID. Full card numbers are handled by Stripe. We never see or store them.",
    "Stripe",
  ],
  ["Technical data", "IP address, browser type, OS, device identifier, timestamps", "Automatic, when you use the Service"],
  ["Telemetry (optional)", "Anonymous hardware specs, feature usage statistics, crash reports", "Software, only if you opt in"],
  ["Support correspondence", "Messages you send us, attachments", "You, when you contact support"],
];

const Email = () => <a href={mailto("Privacy request")}>{site.supportEmail}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      toc={toc}
      intro={
        <p>
          This policy explains what personal data {site.name} collects, why we collect it, how we use it, and
          the choices you have. If anything is unclear, please reach out.
        </p>
      }
    >
      <h2 id="who">1. Who we are</h2>
      <p>
        {operatorName} (&ldquo;<strong>we</strong>&rdquo;,
        &ldquo;<strong>us</strong>&rdquo;, &ldquo;<strong>our</strong>&rdquo;), is the data controller
        responsible for your personal data in connection with the {site.name} software and website (the
        &ldquo;<strong>Service</strong>&rdquo;).
      </p>
      <ul>
        <li>
          <strong>Legal entity:</strong> {site.legalEntity}
        </li>
        {site.address && (
          <li>
            <strong>Registered address:</strong> {site.address}
          </li>
        )}
        {site.registration && (
          <li>
            <strong>Registration number:</strong> {site.registration}
          </li>
        )}
        <li>
          <strong>Contact:</strong> <Email />
        </li>
      </ul>

      <h2 id="what">2. Data we collect</h2>
      <p>We collect the minimum data needed to provide and improve the Service:</p>
      <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-ink-800 text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium">Examples</th>
              <th scope="col" className="px-4 py-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-ink-300">
            {dataInventory.map(([cat, ex, src]) => (
              <tr key={cat}>
                <th scope="row" className="px-4 py-3 font-medium text-ink-200 align-top">{cat}</th>
                <td className="px-4 py-3 leading-relaxed">{ex}</td>
                <td className="px-4 py-3 leading-relaxed">{src}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>We do not collect:</strong> passwords from other services, browsing history outside our site,
        contents of your files, or biometric data.
      </p>

      <h2 id="how">3. How we use your data</h2>
      <p>We use personal data to:</p>
      <ul>
        <li>Deliver your license key and download link, and manage your account</li>
        <li>Process payments, issue receipts and invoices, and prevent fraud</li>
        <li>Provide the Service and customer support</li>
        <li>Send service-related communications (license activation, security alerts, policy updates)</li>
        <li>Improve reliability and performance through anonymous telemetry (opt-in only)</li>
        <li>Comply with legal obligations (tax records, responses to lawful requests)</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal data to third parties, and we do <strong>not</strong>{" "}
        use it for advertising or profiling unrelated to the Service.
      </p>

      <h2 id="legal-basis">4. Legal basis for processing (GDPR)</h2>
      <p>
        If you are located in the European Economic Area, UK, or Switzerland, we rely on the following legal
        bases:
      </p>
      <ul>
        <li>
          <strong>Contract performance</strong>: to deliver the Service you purchased (Art. 6(1)(b))
        </li>
        <li>
          <strong>Legal obligation</strong>: for tax, accounting, and regulatory compliance (Art. 6(1)(c))
        </li>
        <li>
          <strong>Legitimate interests</strong>: to secure the Service, prevent fraud, and improve product
          quality (Art. 6(1)(f))
        </li>
        <li>
          <strong>Consent</strong>: for optional telemetry, which you can withdraw at any time (Art. 6(1)(a))
        </li>
      </ul>

      <h2 id="sharing">5. Sharing with third parties</h2>
      <p>
        We share personal data only with service providers who process it on our behalf under contractual
        obligations of confidentiality and security:
      </p>
      <ul>
        <li>
          <strong>Stripe, Inc.</strong>: payment processing (
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            Stripe privacy policy
          </a>
          )
        </li>
        <li>
          <strong>Vercel Inc.</strong>: website hosting
        </li>
        <li>
          <strong>Our transactional email provider</strong>: delivery of receipts, license keys and support
          replies
        </li>
      </ul>
      <p>
        We may also disclose data if required by law, to enforce our <Link href="/terms">Terms</Link>, or to
        protect the rights, safety, or property of {site.name}, our users, or the public.
      </p>

      <h2 id="retention">6. Data retention</h2>
      <p>We keep personal data only as long as necessary:</p>
      <ul>
        <li>
          <strong>Account data:</strong> while your account is active, plus 30 days after deletion
        </li>
        <li>
          <strong>Billing records:</strong> 7 years, as required by tax law
        </li>
        <li>
          <strong>Support tickets:</strong> 2 years after resolution
        </li>
        <li>
          <strong>Telemetry data:</strong> aggregated and anonymized after 90 days
        </li>
        <li>
          <strong>Server logs:</strong> 30 days
        </li>
      </ul>

      <h2 id="security">7. Security</h2>
      <p>
        We protect your data with industry-standard measures: TLS for data in transit, encryption at rest for
        sensitive fields, least-privilege internal access, and regular security reviews. Card data never
        touches our servers.
      </p>
      <p>
        No system is perfectly secure. If we become aware of a personal data breach likely to result in a risk
        to your rights, we will notify affected users and the competent authority within 72 hours, as required
        by applicable law.
      </p>

      <h2 id="rights">8. Your rights</h2>
      <p>Depending on your jurisdiction (GDPR, UK GDPR, CCPA, and similar laws), you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong>: request a copy of the personal data we hold about you
        </li>
        <li>
          <strong>Rectify</strong>: correct inaccurate or incomplete data
        </li>
        <li>
          <strong>Erase</strong>: request deletion of your data
        </li>
        <li>
          <strong>Restrict</strong>: limit how we process your data
        </li>
        <li>
          <strong>Portability</strong>: receive your data in a structured, machine-readable format
        </li>
        <li>
          <strong>Object</strong>: object to processing based on legitimate interests
        </li>
        <li>
          <strong>Withdraw consent</strong>: at any time, where processing is based on consent
        </li>
        <li>
          <strong>Lodge a complaint</strong>: with your local data protection authority
        </li>
      </ul>
      <p>
        To exercise any of these rights, email <Email />. We respond within 30 days and may request identity
        verification for security.
      </p>
      <p>
        <strong>California residents:</strong> under the CCPA, you have additional rights including the right
        to know and the right to non-discrimination for exercising your rights. We do not sell or share
        personal information as defined by the CCPA.
      </p>

      <h2 id="cookies">9. Cookies &amp; similar technologies</h2>
      <p>
        This website does not set advertising or analytics cookies. Stripe sets strictly necessary cookies on
        its checkout pages for fraud prevention and to complete your payment. You can manage cookies in your
        browser settings at any time.
      </p>

      <h2 id="transfers">10. International data transfers</h2>
      <p>
        Your data may be transferred to and processed in countries other than your own, including the United
        States. When we do so, we rely on appropriate safeguards such as the European Commission&rsquo;s
        Standard Contractual Clauses.
      </p>

      <h2 id="children">11. Children&rsquo;s privacy</h2>
      <p>
        The Service is not intended for persons under 18. We do not knowingly collect personal data from
        children. If you believe a child has provided us with data, please contact us and we will delete it.
      </p>

      <h2 id="changes">12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be notified by email to registered
        users and/or by prominent notice on our website at least 14 days before they take effect.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>For any privacy-related question or request:</p>
      <ul>
        <li>
          <strong>Email:</strong> <Email />
        </li>
        {site.address && (
          <li>
            <strong>Postal:</strong> {site.legalEntity}, {site.address}
          </li>
        )}
      </ul>
    </LegalPage>
  );
}
