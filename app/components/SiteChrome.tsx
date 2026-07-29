import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="nav-shell">
      <Link
        className="brand logo-brand"
        href="/#top"
        aria-label="Algrid International home"
      >
        <img
          src="/algrid-logo.png"
          alt=""
          width={440}
          height={178}
        />
        <small>AI VENTURE BUILDER</small>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#services">Services</Link>
        <Link href="/mvps">MVPs</Link>
        <Link href="/#work">Ventures</Link>
        <Link href="/#systems">Systems</Link>
        <Link href="/#ai">AI Lab</Link>
        <Link href="/insights">Insights</Link>
      </nav>
      <div className="nav-compact-links">
        <Link href="/#services">Services</Link>
        <Link href="/mvps">MVPs</Link>
      </div>
      <Link className="nav-cta" href="/#contact">
        Start a project <span aria-hidden="true">+</span>
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-shell">
      <div className="footer-main">
        <Link
          className="brand logo-brand footer-brand"
          href="/#top"
          aria-label="Algrid International home"
        >
          <img
            src="/algrid-logo.png"
            alt=""
            width={440}
            height={178}
            loading="lazy"
          />
          <small>AI VENTURE BUILDER</small>
        </Link>

        <nav aria-label="Footer navigation">
          <Link href="/#services">Services</Link>
          <Link href="/mvps">MVPs</Link>
          <Link href="/#work">Ventures</Link>
          <Link href="/#systems">Systems</Link>
          <Link href="/insights">Insights</Link>
        </nav>

        <Link className="footer-cta" href="/#contact">
          Start a project <span aria-hidden="true">+</span>
        </Link>
      </div>

      <div className="footer-meta">
        <p>AI ventures · Digital systems · Growth</p>
        <div className="footer-legal">
          <Link href="/#company">Company</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:social@algridinternational.com">Email</a>
          <a
            href="https://wa.me/601169194826"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
        <span>© 2026 Algrid International</span>
      </div>
    </footer>
  );
}
