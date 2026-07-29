import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { insightArticles } from "../content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Perspectives on AI ventures, brand systems and compounding growth.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page">
      <SiteHeader />
      <header className="editorial-hero insight-hero">
        <p className="editorial-kicker">Insights / Field notes</p>
        <h1>Ideas for building the next version of a business.</h1>
        <p className="editorial-intro">
          Practical thinking across intelligence, product, brand and growth.
        </p>
      </header>
      <section className="article-index" aria-label="All insights">
        {insightArticles.map((article, index) => (
          <Link key={article.slug} href={`/insights/${article.slug}`}>
            <span>0{index + 1}</span>
            <div>
              <small>{article.category} · {article.readTime} read</small>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
