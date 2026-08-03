import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Algrid International handles information shared through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy — Algrid International", url: "/privacy", images: [socialImage] },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page legal-page">
      <SiteHeader />
      <article>
        <header className="editorial-hero">
          <p className="editorial-kicker">Legal / Last updated 3 August 2026</p>
          <h1>Privacy, in plain language.</h1>
          <p className="editorial-intro">
            This notice explains what happens when you contact Algrid International through this website.
          </p>
        </header>
        <div className="legal-copy">
          <section>
            <h2>Information you choose to share</h2>
            <p>
              The project form securely submits the details you provide to our email service. We use that information to respond to your enquiry, assess project fit and continue the conversation you requested. The website does not create a marketing profile from your enquiry.
            </p>
          </section>
          <section>
            <h2>Website data</h2>
            <p>
              This version of the website does not use advertising trackers or an analytics product. Our hosting provider may process limited technical logs needed to deliver, secure and maintain the site, such as IP address, request time, device information and requested pages.
            </p>
          </section>
          <section>
            <h2>Sharing and retention</h2>
            <p>
              We do not sell personal information. Information may be handled by service providers that support email, hosting or project delivery, only where needed for those functions. Enquiries are retained only while they are relevant to the conversation, a resulting business relationship or applicable record-keeping obligations.
            </p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>
              You may ask what information we hold about you, request a correction or deletion, or withdraw from a conversation by emailing <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>. Some information may need to be retained where required by law or legitimate business records.
            </p>
          </section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
