import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { LocalizedText } from "../components/LocalizedText";
import { insightArticles } from "../content";
import { insightMalay } from "../localization";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Insights",
  description: "Perspectives on AI ventures, brand systems and compounding growth.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — Algrid International",
    description: "Perspectives on AI ventures, brand systems and compounding growth.",
    url: "/insights",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — Algrid International",
    description: "Perspectives on AI ventures, brand systems and compounding growth.",
    images: [socialImage.url],
  },
};

export default function InsightsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page">
      <SiteHeader />
      <header className="editorial-hero insight-hero">
        <p className="editorial-kicker"><LocalizedText en="Insights / Field notes" ms="Wawasan / Catatan lapangan" /></p>
        <h1><LocalizedText en="Ideas for building the next version of a business." ms="Idea untuk membina versi perniagaan yang seterusnya." /></h1>
        <p className="editorial-intro">
          <LocalizedText en="Practical thinking across intelligence, product, brand and growth." ms="Pemikiran praktikal merangkumi kecerdasan, produk, jenama dan pertumbuhan." />
        </p>
      </header>
      <section className="article-index" aria-label="All insights">
        {insightArticles.map((article, index) => {
          const ms = insightMalay[article.slug as keyof typeof insightMalay];
          return (
          <Link key={article.slug} href={`/insights/${article.slug}`}>
            <span>0{index + 1}</span>
            <div>
              <small><LocalizedText en={`${article.category} · ${article.readTime} read`} ms={`${ms.category} · bacaan ${ms.readTime}`} /></small>
              <h2><LocalizedText en={article.title} ms={ms.title} /></h2>
              <p><LocalizedText en={article.description} ms={ms.description} /></p>
            </div>
            <i aria-hidden="true">↗</i>
          </Link>
          );
        })}
      </section>
      <SiteFooter />
    </main>
  );
}
