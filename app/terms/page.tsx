import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Sense-Optimization software and services.",
};

const toc = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "description", label: "2. Service Description" },
  { id: "accounts", label: "3. Accounts & Eligibility" },
  { id: "license", label: "4. License & Usage" },
  { id: "payment", label: "5. Payments & Billing" },
  { id: "acceptable", label: "6. Acceptable Use" },
  { id: "ip", label: "7. Intellectual Property" },
  { id: "disclaimer", label: "8. Disclaimer of Warranties" },
  { id: "liability", label: "9. Limitation of Liability" },
  { id: "indemnification", label: "10. Indemnification" },
  { id: "termination", label: "11. Termination" },
  { id: "governing", label: "12. Governing Law" },
  { id: "changes", label: "13. Changes to Terms" },
  { id: "contact", label: "14. Contact" },
];

const Email = () => <a href={mailto()}>{site.supportEmail}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      toc={toc}
      intro={
        <p>
          Please read these terms carefully before using {site.name} products or services. By accessing
          or using our services, you agree to be bound by these terms.
        </p>
      }
    >
      <h2 id="acceptance">1. Acceptance of Terms</h2>
      <p>
        These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) form a binding agreement between you
        (&ldquo;<strong>User</strong>&rdquo;, &ldquo;<strong>you</strong>&rdquo;) and {site.legalEntity}, trading
        as {site.name} (&ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;,
        &ldquo;<strong>our</strong>&rdquo;), the operator of the {site.name} software and website (collectively,
        the &ldquo;<strong>Service</strong>&rdquo;).
      </p>
      <p>
        By creating an account, purchasing a license, downloading our software, or otherwise using the
        Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, our{" "}
        <Link href="/refunds">Refund &amp; Cancellation Policy</Link>, and our{" "}
        <Link href="/privacy">Privacy Policy</Link>. If you do not agree, you may not use the Service.
      </p>

      <h2 id="description">2. Service Description</h2>
      <p>
        {site.name} provides downloadable software and related services for system performance tuning and
        hardware monitoring on Windows operating systems. The Service includes, without limitation:
      </p>
      <ul>
        <li>Process prioritization and CPU affinity management tools</li>
        <li>Input latency measurement and calibration utilities</li>
        <li>
          Hardware monitoring overlays displaying system telemetry (FPS, frametime, CPU/GPU temperature,
          memory usage)
        </li>
        <li>Benchmark reporting and configuration management features</li>
      </ul>
      <p>
        The Service is delivered digitally. After payment you receive a license key and download link by
        email. No physical goods are shipped.
      </p>
      <p>
        We reserve the right to modify, suspend, or discontinue any feature of the Service at any time, with
        reasonable notice where practicable.
      </p>

      <h2 id="accounts">3. Accounts &amp; Eligibility</h2>
      <h3>3.1 Eligibility</h3>
      <p>
        You must be at least 18 years of age, or the age of majority in your jurisdiction, to use the
        Service. By using the Service, you represent that you meet this requirement and that you have the
        legal capacity to enter into this agreement.
      </p>
      <h3>3.2 Account Security</h3>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and license keys
        and for all activities that occur under your account. You agree to notify us immediately of any
        unauthorized use at <Email />.
      </p>
      <h3>3.3 Accurate Information</h3>
      <p>
        You agree to provide accurate, current, and complete information during purchase or registration and
        to keep such information updated. We may suspend or terminate accounts containing inaccurate
        information.
      </p>

      <h2 id="license">4. License &amp; Usage</h2>
      <h3>4.1 License Grant</h3>
      <p>
        Subject to your compliance with these Terms and payment of applicable fees, we grant you a limited,
        non-exclusive, non-transferable, revocable license to install and use the Service on the number of
        devices specified in your purchased plan, for your personal or internal business use.
      </p>
      <h3>4.2 Restrictions</h3>
      <p>You may not:</p>
      <ul>
        <li>
          Copy, modify, reverse engineer, decompile, or disassemble the Service, except to the extent
          expressly permitted by applicable law
        </li>
        <li>Rent, lease, lend, sell, sublicense, or otherwise transfer your license to any third party</li>
        <li>Remove or alter any proprietary notices, labels, or marks</li>
        <li>Use the Service to develop a competing product or service</li>
        <li>Circumvent, disable, or interfere with security-related features of the Service</li>
      </ul>

      <h2 id="payment">5. Payments &amp; Billing</h2>
      <h3>5.1 Plans and Fees</h3>
      <p>
        Fees are listed on our <Link href="/#pricing">pricing page</Link>. All fees are quoted in US Dollars
        (USD) and are exclusive of applicable taxes, which are calculated and shown at checkout before you
        pay. We currently offer:
      </p>
      <ul>
        <li>
          <strong>Basic (24-hour pass):</strong> a one-time charge for 24 hours of access starting at
          activation. It does not renew.
        </li>
        <li>
          <strong>Pro (monthly subscription):</strong> a recurring charge billed every month on the same
          calendar day as your first payment, until you cancel.
        </li>
        <li>
          <strong>Elite (lifetime license):</strong> a single one-time payment with no recurring charges.
        </li>
      </ul>
      <h3>5.2 Payment Processing</h3>
      <p>
        Payments are processed securely by our third-party payment processor, Stripe, Inc. We do not store
        full payment card details on our servers. By providing payment information, you authorize us (and our
        payment processor) to charge your designated payment method for the fees associated with your plan,
        including recurring charges for subscription plans. Charges appear on your statement as{" "}
        <strong>{site.statementDescriptor}</strong>.
      </p>
      <h3>5.3 Subscription Renewals and Cancellation</h3>
      <p>
        Monthly subscriptions renew automatically at the end of each billing cycle until cancelled. You can
        cancel at any time from your account dashboard or by emailing <Email />. Cancellation takes effect at
        the end of the current billing period, and you will not be charged again. Daily passes and lifetime
        licenses are one-time purchases and never renew.
      </p>
      <h3>5.4 Refunds</h3>
      <p>
        Refunds are governed by our <Link href="/refunds">Refund &amp; Cancellation Policy</Link>, which is
        incorporated by reference into these Terms.
      </p>
      <h3>5.5 Price Changes</h3>
      <p>
        We may change our fees at any time. For recurring plans, we will provide at least 30 days&rsquo;
        advance notice by email before any price change takes effect on your next renewal, giving you the
        opportunity to cancel first.
      </p>

      <h2 id="acceptable">6. Acceptable Use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>Violate any applicable law, regulation, or third-party right</li>
        <li>Interfere with, disrupt, or damage the Service, our infrastructure, or any user&rsquo;s access</li>
        <li>Attempt to gain unauthorized access to any part of the Service or related systems</li>
        <li>Transmit any malware, virus, or other harmful code</li>
        <li>
          Use automated means (scrapers, bots) to access the Service without our prior written permission
        </li>
        <li>Misrepresent your identity or affiliation with any person or entity</li>
      </ul>
      <p>
        We reserve the right to investigate suspected violations and to suspend or terminate offending
        accounts without prior notice where necessary to protect the Service or other users.
      </p>

      <h2 id="ip">7. Intellectual Property</h2>
      <p>
        The Service, including all software, designs, text, graphics, trademarks, and other content, is owned
        by {site.legalEntity} or its licensors and is protected by copyright, trademark, and other
        intellectual property laws. Except for the limited license granted in Section 4, no rights are
        transferred to you.
      </p>
      <p>
        Any feedback, suggestions, or ideas you provide regarding the Service may be used by us without
        obligation to you.
      </p>

      <h2 id="disclaimer">8. Disclaimer of Warranties</h2>
      <p>
        <strong>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of
          any kind, whether express, implied, or statutory.
        </strong>{" "}
        To the fullest extent permitted by law, we disclaim all warranties including merchantability, fitness
        for a particular purpose, non-infringement, and any warranties arising from course of dealing or usage
        of trade.
      </p>
      <p>
        We do not warrant that the Service will be uninterrupted, error-free, or achieve any specific
        performance result on your hardware. Performance improvements depend on numerous factors including
        your system configuration, workload, and third-party software.
      </p>

      <h2 id="liability">9. Limitation of Liability</h2>
      <p>
        <strong>To the maximum extent permitted by law</strong>, in no event will {site.legalEntity}, its
        directors, employees, or agents be liable for any indirect, incidental, special, consequential, or
        punitive damages, including lost profits, data loss, or business interruption, arising out of or
        relating to your use of the Service.
      </p>
      <p>
        Our total aggregate liability for any claim arising out of or relating to these Terms or the Service
        shall not exceed the greater of (i) the amount you paid us in the twelve (12) months preceding the
        event giving rise to the claim, or (ii) one hundred US dollars (USD 100).
      </p>

      <h2 id="indemnification">10. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless {site.legalEntity} and its affiliates from and
        against any claims, damages, liabilities, and expenses (including reasonable attorneys&rsquo; fees)
        arising out of your use of the Service, your violation of these Terms, or your violation of any
        third-party right.
      </p>

      <h2 id="termination">11. Termination</h2>
      <p>
        You may terminate your account at any time from your account settings or by contacting <Email />.
      </p>
      <p>
        We may suspend or terminate your access immediately, without notice, if you breach these Terms, if
        required by law, or to protect the security of the Service or other users. Upon termination, your
        license ends and you must cease all use of the Service. Sections 7 through 10, 12, and 14 survive
        termination.
      </p>

      <h2 id="governing">12. Governing Law &amp; Dispute Resolution</h2>
      <p>
        These Terms are governed by the laws of <strong>{site.governingLaw}</strong>, without regard to its
        conflict-of-laws rules. Any dispute arising out of or relating to these Terms shall be resolved
        exclusively in the courts located in <strong>{site.venue}</strong>, and you consent to personal
        jurisdiction there.
      </p>
      <p>
        If you reside in the European Union or the United Kingdom, you retain the protections of mandatory
        consumer laws of your country of residence.
      </p>

      <h2 id="changes">13. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be notified by email to registered
        users and/or by prominent notice on our website at least 14 days before they take effect. Your
        continued use of the Service after the effective date constitutes acceptance of the updated Terms.
      </p>

      <h2 id="contact">14. Contact</h2>
      <p>Questions about these Terms? Contact us at:</p>
      <ul>
        <li>
          <strong>Email:</strong> <Email />
        </li>
        <li>
          <strong>Operator:</strong> {site.legalEntity}
        </li>
        <li>
          <strong>Postal address:</strong> {site.address}
        </li>
        {site.registration && (
          <li>
            <strong>Company registration:</strong> {site.registration}
          </li>
        )}
      </ul>
    </LegalPage>
  );
}
