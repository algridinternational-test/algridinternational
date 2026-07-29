import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Terms for using the Algrid International website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page legal-page">
      <SiteHeader />
      <article>
        <header className="editorial-hero">
          <p className="editorial-kicker">Legal / Last updated 28 July 2026</p>
          <h1>Website terms.</h1>
          <p className="editorial-intro">
            These terms apply when you browse and use the Algrid International website.
          </p>
        </header>
        <div className="legal-copy">
          <section>
            <h2>Information, not professional advice</h2>
            <p>
              The site provides general information about our approach and capabilities. It is not legal, financial, medical or other regulated professional advice. Project scope, deliverables, fees and responsibilities are agreed separately in writing.
            </p>
          </section>
          <section>
            <h2>Demonstrations and estimates</h2>
            <p>
              Interactive tools, interface previews, opportunity maps and calculators are illustrative. Their outputs are not forecasts, guarantees or a substitute for analysis using your actual business data. MVP build-time ranges are initial planning guides and may change after discovery.
            </p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>
              Unless stated otherwise, the site’s design, text, graphics and original materials belong to Algrid International or are used with permission. You may view and share links to the site, but may not reproduce or commercially reuse its contents without written permission.
            </p>
          </section>
          <section>
            <h2>Availability and third-party links</h2>
            <p>
              We aim to keep the site accurate and available but cannot promise uninterrupted access or that every item will remain current. External websites and services are governed by their own terms and privacy practices.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>.
            </p>
          </section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
