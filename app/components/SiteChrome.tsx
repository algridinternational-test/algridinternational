import Link from "next/link";
import Image from "next/image";

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
  return (
    <header className="nav-shell">
      <a
        className="brand logo-brand"
        href="/#top"
        aria-label="Algrid International home"
      >
        <Image
          src="/algrid-logo.png"
          alt=""
          width={440}
          height={178}
          priority
          sizes="154px"
        />
        <small>AI VENTURE BUILDER</small>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#services">Services</a>
        <Link href="/mvps">MVPs</Link>
        <a href="/#work">Ventures</a>
        <a href="/#systems">Systems</a>
        <a href="/#ai">AI Lab</a>
        <Link href="/insights">Insights</Link>
      </nav>
      <div className="nav-compact-links">
        <a href="/#services">Services</a>
        <Link href="/mvps">MVPs</Link>
      </div>
      <a className="nav-cta" href="/#contact">
        Start a project <span aria-hidden="true">+</span>
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-shell">
      <div className="footer-main">
        <a
          className="brand logo-brand footer-brand"
          href="/#top"
          aria-label="Algrid International home"
        >
          <Image
            src="/algrid-logo.png"
            alt=""
            width={440}
            height={178}
            sizes="154px"
          />
          <small>AI VENTURE BUILDER</small>
        </a>

        <nav aria-label="Footer navigation">
          <a href="/#services">Services</a>
          <Link href="/mvps">MVPs</Link>
          <a href="/#work">Ventures</a>
          <a href="/#systems">Systems</a>
          <Link href="/insights">Insights</Link>
        </nav>

        <a className="footer-cta" href="/#contact">
          Start a project <span aria-hidden="true">+</span>
        </a>
      </div>

      <div className="footer-meta">
        <p>AI ventures · Digital systems · Growth</p>
        <div className="footer-legal">
          <a href="/#company">Company</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
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
        </div>
        <span>© 2026 Algrid International</span>
      </div>
    </footer>
  );
}
