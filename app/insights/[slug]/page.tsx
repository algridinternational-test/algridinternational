import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { LocalizedText } from "../../components/LocalizedText";
import { insightArticles } from "../../content";
import { insightMalay } from "../../localization";
import { articleSeoTitles, siteOrigin, socialImage } from "../../seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insightArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = insightArticles.find((item) => item.slug === slug);
  if (!article) return {};
  const seoTitle = articleSeoTitles[article.slug] || article.title;
  return {
    title: seoTitle,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: `${seoTitle} — Algrid International`,
      description: article.description,
      url: `/insights/${article.slug}`,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} — Algrid International`,
      description: article.description,
      images: [socialImage.url],
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const index = insightArticles.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const article = insightArticles[index];
  const next = insightArticles[(index + 1) % insightArticles.length];
  const ms = insightMalay[article.slug as keyof typeof insightMalay];
  const nextMs = insightMalay[next.slug as keyof typeof insightMalay];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: `${siteOrigin}/insights/${article.slug}`,
    author: { "@type": "Organization", name: "Algrid International" },
    publisher: { "@type": "Organization", name: "Algrid International" },
  };

  return (
    <main id="main-content" tabIndex={-1} className="editorial-page">
      <SiteHeader />
      <article className="article-body">
        <header className="editorial-hero">
          <Link className="editorial-back" href="/insights"><LocalizedText en="← All insights" ms="← Semua wawasan" /></Link>
          <p className="editorial-kicker"><LocalizedText en={`${article.category} · ${article.readTime} read`} ms={`${ms.category} · bacaan ${ms.readTime}`} /></p>
          <h1><LocalizedText en={article.title} ms={ms.title} /></h1>
          <p className="editorial-intro"><LocalizedText en={article.description} ms={ms.description} /></p>
        </header>
        <div className="article-copy">
          {article.sections.map((section, sectionIndex) => (
            <section key={section.heading}>
              <span>0{sectionIndex + 1}</span>
              <div>
                <h2><LocalizedText en={section.heading} ms={ms.sections[sectionIndex].heading} /></h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraph}><LocalizedText en={paragraph} ms={ms.sections[sectionIndex].paragraphs[paragraphIndex]} /></p>)}
              </div>
            </section>
          ))}
        </div>
        <Link className="editorial-next" href={`/insights/${next.slug}`}>
          <span><LocalizedText en={`Read next · ${next.category}`} ms={`Baca seterusnya · ${nextMs.category}`} /></span>
          <strong><LocalizedText en={next.title} ms={nextMs.title} /></strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SiteFooter />
    </main>
  );
}
