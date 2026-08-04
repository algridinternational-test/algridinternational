"use client";

import { motion } from "framer-motion";
import { SectionLink } from "../components/SectionLink";
import { useMemo, useState } from "react";
import { mvpProducts, type MvpProduct } from "./data";
import { mvpDetailsMalay, mvpMalay } from "../localization";
import { useSiteLanguage } from "../components/useSiteLanguage";

const categories = ["All", "AI", "Platforms", "Operations", "Commerce", "Growth"] as const;
type Category = (typeof categories)[number];

const categoryMeta: Record<
  Category,
  { label: string; title: string; description: string }
> = {
  All: {
    label: "All systems",
    title: "Launch, sell and operate from one product foundation.",
    description:
      "Explore the complete system library, from customer-facing platforms to the operational infrastructure behind them.",
  },
  AI: {
    label: "AI systems",
    title: "Put intelligence inside a valuable business workflow.",
    description:
      "Customer-facing assistants and internal knowledge products designed around action, governance and human oversight.",
  },
  Platforms: {
    label: "Digital platforms",
    title: "Turn access, expertise or community into a scalable product.",
    description:
      "Secure product foundations for recurring relationships, content, workflows and multi-sided user journeys.",
  },
  Operations: {
    label: "Operations",
    title: "Give teams one clear system for running the business.",
    description:
      "Dashboards and operating tools that replace fragmented spreadsheets with visible, connected workflows.",
  },
  Commerce: {
    label: "Commerce",
    title: "Build trust into every side of the transaction.",
    description:
      "Marketplace infrastructure designed for discovery, seller operations, payments and repeatable network growth.",
  },
  Growth: {
    label: "Growth",
    title: "Convert complex decisions into measurable demand.",
    description:
      "Focused acquisition products that connect useful customer experiences to qualification, attribution and sales action.",
  },
};

const categoryCounts = Object.fromEntries(
  categories.map((category) => [
    category,
    category === "All"
      ? mvpProducts.length
      : mvpProducts.filter((product) => product.category === category).length,
  ]),
) as Record<Category, number>;

const categoryMetaMalay: Record<Category, { label: string; title: string; description: string }> = {
  All: { label: "Semua sistem", title: "Lancarkan, jual dan beroperasi daripada satu asas produk.", description: "Terokai keseluruhan pustaka sistem, daripada platform pelanggan hingga infrastruktur operasi di belakangnya." },
  AI: { label: "Sistem AI", title: "Letakkan kecerdasan dalam aliran kerja perniagaan yang bernilai.", description: "Pembantu pelanggan dan produk pengetahuan dalaman yang direka berasaskan tindakan, tadbir urus dan pengawasan manusia." },
  Platforms: { label: "Platform digital", title: "Ubah akses, kepakaran atau komuniti menjadi produk berskala.", description: "Asas produk selamat untuk hubungan berulang, kandungan, aliran kerja dan perjalanan pengguna pelbagai pihak." },
  Operations: { label: "Operasi", title: "Berikan pasukan satu sistem jelas untuk mengendalikan perniagaan.", description: "Papan pemuka dan alat operasi yang menggantikan hamparan berpecah dengan aliran kerja yang nyata dan terhubung." },
  Commerce: { label: "Perdagangan", title: "Bina kepercayaan pada setiap sisi transaksi.", description: "Infrastruktur pasaran untuk penemuan, operasi penjual, pembayaran dan pertumbuhan rangkaian berulang." },
  Growth: { label: "Pertumbuhan", title: "Ubah keputusan kompleks menjadi permintaan yang boleh diukur.", description: "Produk pemerolehan fokus yang menghubungkan pengalaman pelanggan berguna kepada kelayakan, atribusi dan tindakan jualan." },
};

type PreviewKind =
  | "chat"
  | "learning"
  | "membership"
  | "funnel"
  | "pipeline"
  | "booking"
  | "portal"
  | "inventory"
  | "analytics"
  | "calculator"
  | "mobile"
  | "marketplace"
  | "knowledge"
  | "community";

const previewKinds: Record<string, PreviewKind> = {
  "ai-chatbot-platform": "chat",
  "learning-management-system": "learning",
  "membership-website": "membership",
  "lead-generation-funnel": "funnel",
  "crm-dashboard": "pipeline",
  "booking-system": "booking",
  "customer-portal": "portal",
  "inventory-dashboard": "inventory",
  "analytics-dashboard": "analytics",
  "financial-calculator": "calculator",
  "mobile-app-mvp": "mobile",
  "marketplace-platform": "marketplace",
  "saas-dashboard": "analytics",
  "ai-knowledge-base": "knowledge",
  "community-platform": "community",
};

function ProductGlyph({ kind }: { kind: PreviewKind }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "chat" || kind === "knowledge") {
    return (
      <svg {...commonProps}>
        <path d="M5 5.5h14v10H9l-4 3v-13Z" />
        <path d="M8.5 9h7M8.5 12h4.5" />
      </svg>
    );
  }
  if (kind === "booking") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="5.5" width="16" height="14" rx="2" />
        <path d="M8 3.5v4M16 3.5v4M4 9.5h16M8 13h3v3H8z" />
      </svg>
    );
  }
  if (kind === "calculator") {
    return (
      <svg {...commonProps}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 7h8M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1" />
      </svg>
    );
  }
  if (kind === "mobile") {
    return (
      <svg {...commonProps}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10 5h4M11 18.5h2" />
      </svg>
    );
  }
  if (kind === "marketplace") {
    return (
      <svg {...commonProps}>
        <path d="M4 9h16l-1.5-5h-13L4 9Z" />
        <path d="M5.5 9v10h13V9M9 19v-6h6v6" />
      </svg>
    );
  }
  if (kind === "membership" || kind === "community") {
    return (
      <svg {...commonProps}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2" />
        <path d="M3.5 19c.7-4 2.5-6 5.5-6s4.8 2 5.5 6M15 14c3.2 0 4.8 1.7 5.3 5" />
      </svg>
    );
  }
  if (kind === "learning") {
    return (
      <svg {...commonProps}>
        <path d="m3.5 8 8.5-4 8.5 4-8.5 4-8.5-4Z" />
        <path d="M6.5 10v5.5c3 2 8 2 11 0V10M20.5 8v6" />
      </svg>
    );
  }
  if (kind === "funnel") {
    return (
      <svg {...commonProps}>
        <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
      </svg>
    );
  }
  if (kind === "inventory") {
    return (
      <svg {...commonProps}>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z" />
        <path d="M12 11v10" />
      </svg>
    );
  }
  return (
    <svg {...commonProps}>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      <path d="m4 7 6-4 6 6 5-5" />
    </svg>
  );
}

function ProductPreview({ product, isMalay }: { product: MvpProduct; isMalay: boolean }) {
  const kind = previewKinds[product.id] ?? "analytics";
  const details = mvpDetailsMalay[product.id as keyof typeof mvpDetailsMalay];

  return (
    <div className={`mvp-product-preview preview-kind-${kind}`} aria-hidden="true">
      <div className="preview-chrome">
        <div className="preview-product-mark">
          <ProductGlyph kind={kind} />
        </div>
        <span>{isMalay ? details.name : product.name}</span>
        <i />
        <i />
      </div>
      <div className="preview-canvas">
        <div className="preview-rail">
          <b />
          <i />
          <i />
          <i />
        </div>

        {kind === "chat" && (
          <div className="preview-chat">
            <span>{isMalay ? "Bagaimana kami boleh membantu?" : "How can we help?"}</span>
            <p>{isMalay ? "Ceritakan tentang projek anda." : "Tell me about your project."}</p>
            <p>{isMalay ? "Kami akan membentuk langkah seterusnya." : "We’ll shape the right next step."}</p>
            <div><i /> {isMalay ? "Taip mesej" : "Type a message"} <b>↑</b></div>
          </div>
        )}

        {kind === "learning" && (
          <div className="preview-learning">
            <div><i>▶</i><span>{isMalay ? "Modul" : "Module"} 04</span></div>
            <b><i /></b>
            <p><span>01</span><i /></p>
            <p><span>02</span><i /></p>
            <p><span>03</span><i /></p>
          </div>
        )}

        {(kind === "membership" || kind === "community") && (
          <div className="preview-community">
            <div className="preview-avatars"><i /><i /><i /><i /></div>
            <strong>{kind === "community" ? (isMalay ? "Nadi komuniti" : "Community pulse") : (isMalay ? "Ruang ahli" : "Member space")}</strong>
            <p><i /><span /></p>
            <p><i /><span /></p>
            <p><i /><span /></p>
          </div>
        )}

        {kind === "funnel" && (
          <div className="preview-funnel">
            <i /><span />
            <i /><span />
            <i />
            <b>{isMalay ? "LAYAK" : "QUALIFIED"}</b>
          </div>
        )}

        {kind === "pipeline" && (
          <div className="preview-pipeline">
            <div><span>{isMalay ? "Baharu" : "New"}</span><i /><i /></div>
            <div><span>{isMalay ? "Aktif" : "Active"}</span><i /><i /><i /></div>
            <div><span>{isMalay ? "Menang" : "Won"}</span><i /></div>
          </div>
        )}

        {kind === "booking" && (
          <div className="preview-booking">
            <strong>{isMalay ? "Julai" : "July"} <span>2026</span></strong>
            <div>{Array.from({ length: 21 }, (_, index) => <i key={index} className={index === 11 ? "is-active" : ""} />)}</div>
            <p><i /> 10:30 AM <b>{isMalay ? "Sahkan" : "Confirm"}</b></p>
          </div>
        )}

        {kind === "portal" && (
          <div className="preview-portal">
            <strong>{isMalay ? "Gambaran projek" : "Project overview"}</strong>
            <div><span><b>72%</b><i /></span><span><b>06</b><i /></span></div>
            <p><i /><span /></p>
            <p><i /><span /></p>
          </div>
        )}

        {kind === "inventory" && (
          <div className="preview-inventory">
            <strong>{isMalay ? "Inventori" : "Inventory"} <span>{isMalay ? "Langsung" : "Live"}</span></strong>
            <p><i /><b>SKU-142</b><span /><em>128</em></p>
            <p><i /><b>SKU-088</b><span /><em>42</em></p>
            <p><i /><b>SKU-216</b><span /><em>09</em></p>
          </div>
        )}

        {kind === "analytics" && (
          <div className="preview-analytics">
            <div><span>{isMalay ? "Hasil" : "Revenue"}</span><strong>{product.metric}</strong></div>
            <svg viewBox="0 0 220 70" preserveAspectRatio="none">
              <path d="M0 58 C26 54 36 28 61 36 S102 57 126 30 S169 34 187 17 S207 11 220 4" />
              <path className="area" d="M0 58 C26 54 36 28 61 36 S102 57 126 30 S169 34 187 17 S207 11 220 4 V70 H0 Z" />
            </svg>
            <p><i /><i /><i /><i /><i /><i /></p>
          </div>
        )}

        {kind === "calculator" && (
          <div className="preview-calculator">
            <span>{isMalay ? "Anggaran hasil" : "Estimated outcome"}</span>
            <strong>RM 248,500</strong>
            <p><i /><i /></p>
            <div>{Array.from({ length: 9 }, (_, index) => <i key={index}>{index + 1}</i>)}</div>
          </div>
        )}

        {kind === "mobile" && (
          <div className="preview-mobile">
            <div>
              <i />
              <strong>{isMalay ? "Hari anda" : "Your day"}</strong>
              <span><b>74%</b></span>
              <p /><p /><p />
            </div>
          </div>
        )}

        {kind === "marketplace" && (
          <div className="preview-marketplace">
            <div><i /><i /><i /></div>
            <p><span /><b>{isMalay ? "Pilihan" : "Featured"}</b></p>
            <p><span /><b>{isMalay ? "Baharu" : "New"}</b></p>
            <p><span /><b>Popular</b></p>
          </div>
        )}

        {kind === "knowledge" && (
          <div className="preview-knowledge">
            <div><i /> {isMalay ? "Cari pengetahuan syarikat" : "Search company knowledge"} <b>⌘ K</b></div>
            <p><span>01</span><i /><em>↗</em></p>
            <p><span>02</span><i /><em>↗</em></p>
            <p><span>03</span><i /><em>↗</em></p>
          </div>
        )}
      </div>
      <div className="mvp-visual-metric">
        <strong>{product.metric}</strong>
        <span>{isMalay ? details.metricLabel : product.metricLabel}</span>
      </div>
    </div>
  );
}

export function MvpMarketplace() {
  const { language } = useSiteLanguage();
  const isMalay = language === "ms";
  const meta = isMalay ? categoryMetaMalay : categoryMeta;
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All"
        ? mvpProducts
        : mvpProducts.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <section className="mvp-hero">
        <div className="mvp-hero-grid" aria-hidden="true" />
        <div className="mvp-hero-copy">
          <p className="eyebrow">{isMalay ? "Algrid / Produk sedia dilancarkan" : "Algrid / Ready-to-launch products"}</p>
          <h1>
            {isMalay ? "Produk yang direka" : "Products designed"}
            <br /> {isMalay ? "untuk sampai ke " : "to reach "}<em>{isMalay ? "pasaran." : "market."}</em>
          </h1>
          <p>
            {isMalay ? "Bukan prototaip untuk dek pembentangan. Sistem perniagaan fokus dan sedia produksi yang direka untuk mengesahkan permintaan, mencipta kelebihan operasi dan menjadi asas untuk langkah seterusnya." : "Not prototypes for a pitch deck. Focused, production-ready business systems designed to validate demand, create operating leverage and become the foundation for what comes next."}
          </p>
        </div>
        <div className="mvp-hero-terminal">
          <div>
            <span>{isMalay ? "INDEKS PELANCARAN" : "LAUNCH INDEX"}</span>
            <i>{isMalay ? "AKTIF" : "LIVE"}</i>
          </div>
          <strong>15</strong>
          <p>{isMalay ? "SISTEM PRODUK SEDIA DIBENTUK" : "READY-TO-SHAPE PRODUCT SYSTEMS"}</p>
          <dl>
            <div>
              <dt>{isMalay ? "Pelancaran biasa" : "Typical launch"}</dt>
              <dd>{isMalay ? "3–16 minggu" : "3–16 weeks"}</dd>
            </div>
            <div>
              <dt>{isMalay ? "Seni bina" : "Architecture"}</dt>
              <dd>{isMalay ? "Sedia diskala" : "Scale-ready"}</dd>
            </div>
            <div>
              <dt>{isMalay ? "Pemilikan" : "Ownership"}</dt>
              <dd>{isMalay ? "100% milik anda" : "100% yours"}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mvp-marketplace">
        <div className="mvp-market-head">
          <div>
            <p className="eyebrow">{isMalay ? "Terokai produk sedia dilancarkan" : "Explore ready-to-launch products"}</p>
            <h2>{isMalay ? "Pilih hasil perniagaan." : "Choose the business outcome."}</h2>
          </div>
          <p>
            {isMalay ? "Setiap produk dibentuk mengikut model operasi, pelanggan dan kelebihan komersial anda. Garis masa adalah anggaran dan disahkan semasa pecutan pembingkaian produk." : "Every product is shaped around your operating model, customer and commercial advantage. Timelines are directional and confirmed during the product framing sprint."}
          </p>
        </div>

        <div className="mvp-browser-shell">
          <div className="mvp-browser-toolbar">
            <div className="mvp-browser-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="mvp-browser-path">
              <span>ALGRID / {isMalay ? "PRODUK PERNIAGAAN" : "BUSINESS PRODUCTS"}</span>
              <b>{isMalay ? "Indeks produk" : "Product index"}</b>
            </div>
            <div className="mvp-browser-status">
              <i aria-hidden="true" />
              {isMalay ? "Skop dibuka" : "Scoping open"}
            </div>
          </div>

          <div className="mvp-browser-layout">
            <aside className="mvp-browser-sidebar">
              <div>
                <span>01</span>
                <p>{isMalay ? "Tapis mengikut hasil" : "Filter by outcome"}</p>
              </div>
              <div className="mvp-filter" role="group" aria-label={isMalay ? "Tapis produk perniagaan" : "Filter business products"}>
                {categories.map((category, categoryIndex) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    <span className="mvp-filter-index">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>
                    <b>{meta[category].label}</b>
                    <span className="mvp-filter-count">{categoryCounts[category]}</span>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>
              <div className="mvp-browser-note">
                <span>{isMalay ? "Perlukan sistem tersuai?" : "Need a custom system?"}</span>
                <p>{isMalay ? "Kami boleh membingkaikan produk mengikut model operasi anda sendiri." : "We can frame a product around your own operating model."}</p>
                <SectionLink section="contact">
                  {isMalay ? "Mulakan dengan masalah" : "Start with the problem"} <i aria-hidden="true">+</i>
                </SectionLink>
              </div>
            </aside>

            <div className="mvp-browser-results">
              <div className="mvp-results-head" aria-live="polite">
                <div>
                  <p className="eyebrow">{meta[activeCategory].label}</p>
                  <h3>{meta[activeCategory].title}</h3>
                </div>
                <div className="mvp-results-summary">
                  <span>{isMalay ? "Dipaparkan" : "Showing"}</span>
                  <strong>{String(visibleProducts.length).padStart(2, "0")}</strong>
                  <p>{meta[activeCategory].description}</p>
                </div>
              </div>

              <motion.div layout className="mvp-product-grid">
                {visibleProducts.map((product) => {
                  const translated = mvpMalay[product.id as keyof typeof mvpMalay];
                  const details = mvpDetailsMalay[product.id as keyof typeof mvpDetailsMalay];
                  return (
                  <motion.article
                    layout
                    id={product.id}
                    className="mvp-product-card"
                    key={product.id}
                    initial={{ opacity: 0.5, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mvp-card-top">
                      <span>{product.code}</span>
                      <i>{isMalay ? categoryMetaMalay[product.category].label : product.category}</i>
                    </div>
                    <ProductPreview product={product} isMalay={isMalay} />
                    <div className="mvp-card-title">
                      <h3>{isMalay ? details.name : product.name}</h3>
                      <p>{isMalay ? translated[0] : product.promise}</p>
                    </div>
                    <dl className="mvp-specs">
                      <div>
                        <dt>{isMalay ? "Anggaran pembangunan" : "Estimated build"}</dt>
                        <dd>{isMalay ? product.buildTime.replace("weeks", "minggu") : product.buildTime}</dd>
                      </div>
                      <div>
                        <dt>{isMalay ? "Perniagaan sesuai" : "Ideal business"}</dt>
                        <dd>{isMalay ? translated[1] : product.idealFor}</dd>
                      </div>
                      <div>
                        <dt>{isMalay ? "Kebolehskalaan" : "Scalability"}</dt>
                        <dd>{isMalay ? translated[2] : product.scalability}</dd>
                      </div>
                    </dl>
                    <div className="mvp-detail-block">
                      <span>{isMalay ? "CIRI TERAS" : "CORE FEATURES"}</span>
                      <div>
                        {(isMalay ? details.features : product.features).map((feature) => (
                          <i key={feature}>{feature}</i>
                        ))}
                      </div>
                    </div>
                    <div className="mvp-stack">
                      <span>{isMalay ? "SET TEKNOLOGI" : "STACK"}</span>
                      <div>
                        {product.stack.map((technology) => (
                          <i key={technology}>{technology}</i>
                        ))}
                      </div>
                    </div>
                    <a href={`mailto:social@algridinternational.com?subject=${encodeURIComponent(`${isMalay ? "Pertanyaan produk" : "Product enquiry"}: ${isMalay ? details.name : product.name}`)}`}>
                      {isMalay ? "Tentukan skop produk ini" : "Scope this product"} <span aria-hidden="true">+</span>
                    </a>
                  </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="mvp-method">
        <div>
          <p className="eyebrow">{isMalay ? "Cara penyampaian produk berfungsi" : "How product delivery works"}</p>
          <h2>{isMalay ? "Fokus tetap. Produk sebenar. Langkah seterusnya jelas." : "Fixed focus. Real product. Clear next move."}</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <b>{isMalay ? "Bingkaikan isyarat" : "Frame the signal"}</b>
              <p>{isMalay ? "Tentukan andaian paling berisiko dan produk bernilai paling kecil." : "Define the riskiest assumption and smallest valuable product."}</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>{isMalay ? "Reka sistem" : "Design the system"}</b>
              <p>{isMalay ? "Petakan perjalanan teras, logik operasi dan seni bina skala." : "Map the core journey, operating logic and scale architecture."}</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>{isMalay ? "Bina kelebihan" : "Build the advantage"}</b>
              <p>{isMalay ? "Lancarkan produk produksi dengan analitik dan kawalan pentadbir." : "Ship the production product with analytics and admin control."}</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <b>{isMalay ? "Lancar dan belajar" : "Launch and learn"}</b>
              <p>{isMalay ? "Aktifkan pasaran, baca tingkah laku dan utamakan keluaran seterusnya." : "Activate the market, read behaviour and prioritise the next release."}</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="mvp-page-cta">
        <p className="eyebrow">{isMalay ? "Ada produk lain dalam fikiran?" : "Have a different product in mind?"}</p>
        <h2>
          {isMalay ? "Bawa masalahnya." : "Bring the problem."}
          <br /> {isMalay ? "Kami akan membentuk produknya." : "We’ll shape the product."}
        </h2>
        <SectionLink className="button button-primary" section="contact">
          {isMalay ? "Mulakan perbualan produk" : "Start a product conversation"} <span aria-hidden="true">+</span>
        </SectionLink>
      </section>
    </>
  );
}
