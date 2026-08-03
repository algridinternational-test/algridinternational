import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { insightArticles } from "../../content";
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
          <Link className="editorial-back" href="/insights">← All insights</Link>
          <p className="editorial-kicker">{article.category} · {article.readTime} read</p>
          <h1>{article.title}</h1>
          <p className="editorial-intro">{article.description}</p>
        </header>
        <div className="article-copy">
          {article.sections.map((section, sectionIndex) => (
            <section key={section.heading}>
              <span>0{sectionIndex + 1}</span>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
        <Link className="editorial-next" href={`/insights/${next.slug}`}>
          <span>Read next · {next.category}</span>
          <strong>{next.title}</strong>
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
