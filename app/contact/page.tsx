import type { Metadata } from "next";
import { ProjectBriefForm } from "../components/ProjectBriefForm";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { LocalizedText } from "../components/LocalizedText";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Share your project brief with Algrid International. Discuss AI, software, brand, growth or business transformation with our senior team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a Project — Algrid International",
    description:
      "Tell Algrid what you are building, changing or trying to unlock.",
    url: "https://www.algridinternational.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page" tabIndex={-1}>
      <SiteHeader />
      <section className="contact-page-hero">
        <div className="contact-page-intro">
          <p className="eyebrow"><LocalizedText en="Start a project / Secure intake" ms="Mulakan projek / Pengambilan selamat" /></p>
          <h1><LocalizedText en={<>Bring us the<br /><em>hard problem.</em></>} ms={<>Bawa kepada kami<br /><em>cabaran yang sukar.</em></>} /></h1>
          <p>
            <LocalizedText en="Share the opportunity, friction and outcome you are aiming for. A senior Algrid team member will review the brief and respond with a clear next step within two business days." ms="Kongsikan peluang, halangan dan hasil yang anda sasarkan. Ahli kanan pasukan Algrid akan menyemak ringkasan anda dan memberi langkah seterusnya yang jelas dalam tempoh dua hari bekerja." />
          </p>
          <div className="contact-page-assurance" aria-label="Enquiry process">
            <span><b>01</b> <LocalizedText en="Senior review" ms="Semakan kanan" /></span>
            <span><b>02</b> <LocalizedText en="Confidential intake" ms="Pengambilan sulit" /></span>
            <span><b>03</b> <LocalizedText en="Clear next step" ms="Langkah seterusnya jelas" /></span>
          </div>
        </div>
        <ProjectBriefForm className="contact-page-form" />
      </section>
      <section className="contact-page-direct">
        <p><LocalizedText en="Prefer a direct channel?" ms="Lebih suka saluran terus?" /></p>
        <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>
        <a href="https://wa.me/601169194826" target="_blank" rel="noopener noreferrer">
          WhatsApp +60 11 6919 4826
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
