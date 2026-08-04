import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { LocalizedText } from "../../components/LocalizedText";
import { SectionLink } from "../../components/SectionLink";
import { ventureStories } from "../../content";
import { ventureMalay } from "../../localization";
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
  const ms = ventureMalay[venture.slug as keyof typeof ventureMalay];
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
          <SectionLink className="editorial-back" section="work"><LocalizedText en="← Selected ventures" ms="← Usaha niaga pilihan" /></SectionLink>
          <p className="editorial-kicker">{venture.code} · <LocalizedText en={venture.type} ms={ms.type} /></p>
          <h1><LocalizedText en={venture.title} ms={ms.title} /></h1>
          <p className="editorial-intro"><LocalizedText en={venture.summary} ms={ms.summary} /></p>
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
            <LocalizedText en="Your browser does not support embedded video." ms="Pelayar anda tidak menyokong video terbenam." />
          </video>
          <div className="case-film-meta">
            <span><LocalizedText en="Campaign film / 01" ms="Filem kempen / 01" /></span>
            <div>
              <strong>{venture.films[0].title}</strong>
              <small>{venture.films[0].note}</small>
            </div>
          </div>
        </div>

        <section className="venture-story-band">
          <div className="venture-story-lead">
            <p className="editorial-kicker"><LocalizedText en="The venture story" ms="Kisah usaha niaga" /></p>
            <h2><LocalizedText en="A product range designed as a commercial platform." ms="Rangkaian produk yang direka sebagai platform komersial." /></h2>
          </div>
          <div className="venture-story-points">
            <article>
              <span><LocalizedText en="01 / Opportunity" ms="01 / Peluang" /></span>
              <p><LocalizedText en={venture.story.opportunity} ms={ms.opportunity} /></p>
            </article>
            <article>
              <span><LocalizedText en="02 / Product" ms="02 / Produk" /></span>
              <p><LocalizedText en={venture.story.product} ms={ms.product} /></p>
            </article>
            <article>
              <span><LocalizedText en="03 / Market system" ms="03 / Sistem pasaran" /></span>
              <p><LocalizedText en={venture.story.market} ms={ms.market} /></p>
            </article>
            <article>
              <span><LocalizedText en="04 / Creative direction" ms="04 / Arah kreatif" /></span>
              <p><LocalizedText en={venture.story.direction} ms={ms.direction} /></p>
            </article>
          </div>
        </section>

        <div className="editorial-grid">
          <section className="editorial-section">
            <p className="editorial-kicker"><LocalizedText en="The challenge" ms="Cabaran" /></p>
            <h2><LocalizedText en="Finding the clearest strategic opening." ms="Mencari ruang strategik yang paling jelas." /></h2>
            <p><LocalizedText en={venture.challenge} ms={ms.challenge} /></p>
          </section>
          <section className="editorial-section">
            <p className="editorial-kicker"><LocalizedText en="The response" ms="Respons" /></p>
            <h2><LocalizedText en="One connected system, designed to move." ms="Satu sistem terhubung, direka untuk bergerak." /></h2>
            <ol className="editorial-list">
              {venture.response.map((item, itemIndex) => (
                <li key={item}><span>0{itemIndex + 1}</span><LocalizedText en={item} ms={ms.response[itemIndex]} /></li>
              ))}
            </ol>
          </section>
        </div>

        <section className="venture-gallery-section">
          <div className="venture-gallery-head">
            <p className="editorial-kicker"><LocalizedText en="Campaign system" ms="Sistem kempen" /></p>
            <h2><LocalizedText en="One visual language, expressed across every customer moment." ms="Satu bahasa visual, diterapkan pada setiap detik pelanggan." /></h2>
            <p>
              <LocalizedText en="A curated view of the product, range and campaign artwork—built to remain recognisable from a fast mobile scroll to the retail shelf." ms="Paparan terpilih produk, rangkaian dan karya seni kempen—dibina untuk kekal dikenali daripada skrol mudah alih yang pantas hingga ke rak runcit." />
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
                  {venture.name} / <LocalizedText en="Campaign asset" ms="Aset kempen" />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {venture.films.length > 1 ? (
          <section className="venture-film-library">
            <div className="venture-film-library-head">
              <p className="editorial-kicker"><LocalizedText en="More from the campaign" ms="Lagi daripada kempen" /></p>
              <h2><LocalizedText en="Full-length campaign cuts." ms="Filem kempen versi penuh." /></h2>
              <p><LocalizedText en="Press play to watch each complete film and explore the campaign in motion." ms="Tekan main untuk menonton setiap filem penuh dan meneroka kempen dalam gerakan." /></p>
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
                    <LocalizedText en="Your browser does not support embedded video." ms="Pelayar anda tidak menyokong video terbenam." />
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
            <p className="editorial-kicker"><LocalizedText en="Built as a system" ms="Dibina sebagai sistem" /></p>
            <div className="system-pills">
              {venture.system.map((item, itemIndex) => <span key={item}><LocalizedText en={item} ms={ms.system[itemIndex]} /></span>)}
            </div>
          </div>
          <div>
            <p className="editorial-kicker"><LocalizedText en="Outcome" ms="Hasil" /></p>
            <h2><LocalizedText en={venture.outcome} ms={ms.outcome} /></h2>
          </div>
        </section>

        <Link className="editorial-next" href={`/work/${next.slug}`}>
          <span><LocalizedText en={`Next venture · ${next.code}`} ms={`Usaha niaga seterusnya · ${next.code}`} /></span>
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
