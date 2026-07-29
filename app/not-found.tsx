import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page error-page">
      <SiteHeader />
      <section>
        <p className="editorial-kicker">404 / Signal lost</p>
        <h1>This route has not been built.</h1>
        <p>The page may have moved, or the address may be incomplete.</p>
        <Link className="button button-primary" href="/">
          Return home <span aria-hidden="true">+</span>
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
