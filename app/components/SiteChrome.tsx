"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionLink } from "./SectionLink";
import { useSiteLanguage } from "./useSiteLanguage";

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/algrid_international/",
    icon: "instagram" as const,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Algrid-International/61575191317051/",
    icon: "facebook" as const,
  },
];

export function ContactIcon({
  name,
}: {
  name: "email" | "facebook" | "instagram" | "pin" | "whatsapp";
}) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="icon-fill" cx="17.4" cy="6.7" r="1" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path className="icon-fill" d="M14.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H18V3.9c-.7-.1-1.5-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2V10H9v3h2.5v8h3Z" />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.7l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z" />
      <path d="M8.2 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8c.3.1.5.2.5.4 0 .2-.1 1.2-.6 1.7-.5.6-1.4.9-2.2.9-.7 0-1.6-.2-2.8-.7-1.7-.7-3-1.8-4-3.2-1.1-1.5-1.6-2.9-1.6-4 0-.5.2-.9.4-1.1Z" />
    </svg>
  );
}

export function SiteHeader() {
  const { language, setLanguage } = useSiteLanguage();
  const labels = language === "ms"
    ? {
        services: "Perkhidmatan",
        products: "Produk",
        ventures: "Usaha",
        systems: "Sistem",
        ai: "Makmal AI",
        insights: "Wawasan",
        menu: "Menu",
        contact: "Hubungi kami",
      }
    : {
        services: "Services",
        products: "Products",
        ventures: "Ventures",
        systems: "Systems",
        ai: "AI Lab",
        insights: "Insights",
        menu: "Menu",
        contact: "Contact us",
      };

  return (
    <header className="nav-shell">
      <Link className="brand logo-brand" href="/">
        <Image
          src="/algrid-logo.png"
          alt="Algrid International"
          width={440}
          height={178}
          priority
          sizes="154px"
        />
        <small>AI VENTURE BUILDER</small>
      </Link>
      <nav aria-label="Primary navigation">
        <SectionLink section="services">{labels.services}</SectionLink>
        <Link href="/mvps">{labels.products}</Link>
        <SectionLink section="work">{labels.ventures}</SectionLink>
        <SectionLink section="systems">{labels.systems}</SectionLink>
        <SectionLink section="ai">{labels.ai}</SectionLink>
        <Link href="/insights">{labels.insights}</Link>
      </nav>
      <details className="nav-mobile-menu">
        <summary>{labels.menu} <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">
          <SectionLink section="services">{labels.services}</SectionLink>
          <Link href="/mvps">{labels.products}</Link>
          <SectionLink section="work">{labels.ventures}</SectionLink>
          <SectionLink section="systems">{labels.systems}</SectionLink>
          <SectionLink section="ai">{labels.ai}</SectionLink>
          <Link href="/insights">{labels.insights}</Link>
        </nav>
      </details>
      <div className="nav-actions">
        <div className="language-toggle" role="group" aria-label="Website language">
          <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          <button type="button" onClick={() => setLanguage("ms")} aria-pressed={language === "ms"}>BM</button>
        </div>
        <Link className="nav-cta" href="/contact">
          {labels.contact} <span aria-hidden="true">+</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { language } = useSiteLanguage();
  const labels = language === "ms"
    ? { services: "Perkhidmatan", products: "Produk", ventures: "Usaha", systems: "Sistem", insights: "Wawasan", project: "Mulakan projek", company: "Syarikat", privacy: "Privasi", terms: "Terma" }
    : { services: "Services", products: "Products", ventures: "Ventures", systems: "Systems", insights: "Insights", project: "Start a project", company: "Company", privacy: "Privacy", terms: "Terms" };
  return (
    <footer className="footer-shell">
      <div className="footer-main">
        <Link className="brand logo-brand footer-brand" href="/">
          <Image
            src="/algrid-logo.png"
            alt="Algrid International"
            width={440}
            height={178}
            sizes="154px"
          />
          <small>AI VENTURE BUILDER</small>
        </Link>

        <nav aria-label="Footer navigation">
          <SectionLink section="services">{labels.services}</SectionLink>
          <Link href="/mvps">{labels.products}</Link>
          <SectionLink section="work">{labels.ventures}</SectionLink>
          <SectionLink section="systems">{labels.systems}</SectionLink>
          <Link href="/insights">{labels.insights}</Link>
        </nav>

        <Link className="footer-cta" href="/contact">
          {labels.project} <span aria-hidden="true">+</span>
        </Link>
      </div>

      <div className="footer-meta">
        <div className="footer-signature">
          <i aria-hidden="true" />
          <p>AI ventures · Digital systems · Growth</p>
        </div>
        <div className="footer-utility">
          <nav className="footer-legal" aria-label="Legal navigation">
            <SectionLink section="company">{labels.company}</SectionLink>
            <Link href="/privacy">{labels.privacy}</Link>
            <Link href="/terms">{labels.terms}</Link>
          </nav>
          <div className="footer-socials" aria-label="Algrid social media">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Algrid on ${social.name}`}
              >
                <ContactIcon name={social.icon} />
              </a>
            ))}
          </div>
          <span>© 2026 Algrid International</span>
        </div>
      </div>
    </footer>
  );
}
