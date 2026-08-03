import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { SectionLink } from "../../components/SectionLink";
import { ventureStories } from "../../content";
import { siteOrigin, socialImage } from "../../seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ventureStories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = ventureStories.find((item) => item.slug === slug);
  if (!venture) return {};
  return {
    title: `${venture.name} — Venture story`,
    description: venture.summary,
    alternates: { canonical: `/work/${venture.slug}` },
    openGraph: {
      title: `${venture.name} Venture Story — Algrid International`,
      description: venture.summary,
      url: `/work/${venture.slug}`,
      images: [{ ...socialImage, url: venture.homepagePoster }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${venture.name} Venture Story — Algrid International`,
      description: venture.summary,
      images: [venture.homepagePoster],
    },
  };
}

export default async function VenturePage({ params }: PageProps) {
  const { slug } = await params;
  const index = ventureStories.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const venture = ventureStories[index];
  const next = ventureStories[(index + 1) % ventureStories.length];
  const ventureSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${venture.name} venture story`,
    headline: venture.title,
    description: venture.summary,
    url: `${siteOrigin}/work/${venture.slug}`,
    image: `${siteOrigin}${venture.homepagePoster}`,
    creator: { "@type": "Organization", name: "Algrid International" },
  };

  return (
    <main id="main-content" tabIndex={-1} className="editorial-page">
      <SiteHeader />
      <article>
        <header className="editorial-hero">
          <SectionLink className="editorial-back" section="work">← Selected ventures</SectionLink>
          <p className="editorial-kicker">{venture.code} · {venture.type}</p>
          <h1>{venture.title}</h1>
          <p className="editorial-intro">{venture.summary}</p>
        </header>

        <div className="case-film case-film-feature" style={{ "--venture-color": venture.color } as React.CSSProperties}>
          <video controls playsInline preload="metadata" poster={venture.poster}>
            <source src={venture.films[0].src} type="video/mp4" />
            <track
              kind="captions"
              src="/captions/brand-film-en.vtt"
              srcLang="en"
              label="English captions"
            />
            Your browser does not support embedded video.
          </video>
          <div className="case-film-meta">
            <span>Campaign film / 01</span>
            <div>
              <strong>{venture.films[0].title}</strong>
              <small>{venture.films[0].note}</small>
            </div>
          </div>
        </div>

        <section className="venture-story-band">
          <div className="venture-story-lead">
            <p className="editorial-kicker">The venture story</p>
            <h2>A product range designed as a commercial platform.</h2>
          </div>
          <div className="venture-story-points">
            <article>
              <span>01 / Opportunity</span>
              <p>{venture.story.opportunity}</p>
            </article>
            <article>
              <span>02 / Product</span>
              <p>{venture.story.product}</p>
            </article>
            <article>
              <span>03 / Market system</span>
              <p>{venture.story.market}</p>
            </article>
            <article>
              <span>04 / Creative direction</span>
              <p>{venture.story.direction}</p>
            </article>
          </div>
        </section>

        <div className="editorial-grid">
          <section className="editorial-section">
            <p className="editorial-kicker">The challenge</p>
            <h2>Finding the clearest strategic opening.</h2>
            <p>{venture.challenge}</p>
          </section>
          <section className="editorial-section">
            <p className="editorial-kicker">The response</p>
            <h2>One connected system, designed to move.</h2>
            <ol className="editorial-list">
              {venture.response.map((item, itemIndex) => (
                <li key={item}><span>0{itemIndex + 1}</span>{item}</li>
              ))}
            </ol>
          </section>
        </div>

        <section className="venture-gallery-section">
          <div className="venture-gallery-head">
            <p className="editorial-kicker">Campaign system</p>
            <h2>One visual language, expressed across every customer moment.</h2>
            <p>
              A curated view of the product, range and campaign artwork—built to
              remain recognisable from a fast mobile scroll to the retail shelf.
            </p>
          </div>
          <div className={`venture-gallery venture-gallery-${venture.slug} venture-gallery-${venture.gallery.length}`}>
            {venture.gallery.map((asset, assetIndex) => (
              <figure
                className={`${assetIndex === 0 ? "venture-gallery-feature" : ""} venture-gallery-item-${assetIndex + 1}`}
                key={asset.src}
              >
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  sizes={assetIndex === 0 ? "(max-width: 760px) 100vw, 52vw" : "(max-width: 760px) 100vw, 32vw"}
                  style={
                    venture.slug === "leroselle" ||
                    venture.slug === "solid-coffee" ||
                    venture.slug === "matts" ||
                    venture.slug === "tomms"
                      ? { objectFit: "contain", objectPosition: "center top" }
                      : undefined
                  }
                  unoptimized
                />
                <figcaption>
                  <span>{String(assetIndex + 1).padStart(2, "0")}</span>
                  {venture.name} / Campaign asset
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {venture.films.length > 1 ? (
          <section className="venture-film-library">
            <div className="venture-film-library-head">
              <p className="editorial-kicker">More from the campaign</p>
              <h2>Full-length campaign cuts.</h2>
              <p>Press play to watch each complete film and explore the campaign in motion.</p>
            </div>
            <div className="venture-film-grid">
              {venture.films.slice(1).map((film, filmIndex) => (
                <article key={film.src}>
                  <video controls playsInline preload="metadata">
                    <source src={film.src} type="video/mp4" />
                    <track
                      kind="captions"
                      src="/captions/brand-film-en.vtt"
                      srcLang="en"
                      label="English captions"
                    />
                    Your browser does not support embedded video.
                  </video>
                  <div>
                    <span>Film / {String(filmIndex + 2).padStart(2, "0")}</span>
                    <strong>{film.title}</strong>
                    <small>{film.note}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="editorial-section editorial-outcome">
          <div>
            <p className="editorial-kicker">Built as a system</p>
            <div className="system-pills">
              {venture.system.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div>
            <p className="editorial-kicker">Outcome</p>
            <h2>{venture.outcome}</h2>
          </div>
        </section>

        <Link className="editorial-next" href={`/work/${next.slug}`}>
          <span>Next venture · {next.code}</span>
          <strong>{next.name}</strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ventureSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SiteFooter />
    </main>
  );
}
