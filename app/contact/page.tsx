import type { Metadata } from "next";
import { ProjectBriefForm } from "../components/ProjectBriefForm";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Share your project brief with Algrid International. Discuss AI, software, brand, growth or business transformation with our senior team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a Project — Algrid International",
    description:
      "Tell Algrid what you are building, changing or trying to unlock.",
    url: "https://algridinternational.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page" tabIndex={-1}>
      <SiteHeader />
      <section className="contact-page-hero">
        <div className="contact-page-intro">
          <p className="eyebrow">Start a project / Secure intake</p>
          <h1>Bring us the<br /><em>hard problem.</em></h1>
          <p>
            Share the opportunity, friction and outcome you are aiming for. A
            senior Algrid team member will review the brief and respond with a
            clear next step within two business days.
          </p>
          <div className="contact-page-assurance" aria-label="Enquiry process">
            <span><b>01</b> Senior review</span>
            <span><b>02</b> Confidential intake</span>
            <span><b>03</b> Clear next step</span>
          </div>
        </div>
        <ProjectBriefForm className="contact-page-form" />
      </section>
      <section className="contact-page-direct">
        <p>Prefer a direct channel?</p>
        <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>
        <a href="https://wa.me/601169194826" target="_blank" rel="noopener noreferrer">
          WhatsApp +60 11 6919 4826
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
