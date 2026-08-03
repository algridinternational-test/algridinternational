"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { mvpProducts, type MvpProduct } from "./data";

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

function ProductPreview({ product }: { product: MvpProduct }) {
  const kind = previewKinds[product.id] ?? "analytics";

  return (
    <div className={`mvp-product-preview preview-kind-${kind}`} aria-hidden="true">
      <div className="preview-chrome">
        <div className="preview-product-mark">
          <ProductGlyph kind={kind} />
        </div>
        <span>{product.name}</span>
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
            <span>How can we help?</span>
            <p>Tell me about your project.</p>
            <p>We’ll shape the right next step.</p>
            <div><i /> Type a message <b>↑</b></div>
          </div>
        )}

        {kind === "learning" && (
          <div className="preview-learning">
            <div><i>▶</i><span>Module 04</span></div>
            <b><i /></b>
            <p><span>01</span><i /></p>
            <p><span>02</span><i /></p>
            <p><span>03</span><i /></p>
          </div>
        )}

        {(kind === "membership" || kind === "community") && (
          <div className="preview-community">
            <div className="preview-avatars"><i /><i /><i /><i /></div>
            <strong>{kind === "community" ? "Community pulse" : "Member space"}</strong>
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
            <b>QUALIFIED</b>
          </div>
        )}

        {kind === "pipeline" && (
          <div className="preview-pipeline">
            <div><span>New</span><i /><i /></div>
            <div><span>Active</span><i /><i /><i /></div>
            <div><span>Won</span><i /></div>
          </div>
        )}

        {kind === "booking" && (
          <div className="preview-booking">
            <strong>July <span>2026</span></strong>
            <div>{Array.from({ length: 21 }, (_, index) => <i key={index} className={index === 11 ? "is-active" : ""} />)}</div>
            <p><i /> 10:30 AM <b>Confirm</b></p>
          </div>
        )}

        {kind === "portal" && (
          <div className="preview-portal">
            <strong>Project overview</strong>
            <div><span><b>72%</b><i /></span><span><b>06</b><i /></span></div>
            <p><i /><span /></p>
            <p><i /><span /></p>
          </div>
        )}

        {kind === "inventory" && (
          <div className="preview-inventory">
            <strong>Inventory <span>Live</span></strong>
            <p><i /><b>SKU-142</b><span /><em>128</em></p>
            <p><i /><b>SKU-088</b><span /><em>42</em></p>
            <p><i /><b>SKU-216</b><span /><em>09</em></p>
          </div>
        )}

        {kind === "analytics" && (
          <div className="preview-analytics">
            <div><span>Revenue</span><strong>{product.metric}</strong></div>
            <svg viewBox="0 0 220 70" preserveAspectRatio="none">
              <path d="M0 58 C26 54 36 28 61 36 S102 57 126 30 S169 34 187 17 S207 11 220 4" />
              <path className="area" d="M0 58 C26 54 36 28 61 36 S102 57 126 30 S169 34 187 17 S207 11 220 4 V70 H0 Z" />
            </svg>
            <p><i /><i /><i /><i /><i /><i /></p>
          </div>
        )}

        {kind === "calculator" && (
          <div className="preview-calculator">
            <span>Estimated outcome</span>
            <strong>RM 248,500</strong>
            <p><i /><i /></p>
            <div>{Array.from({ length: 9 }, (_, index) => <i key={index}>{index + 1}</i>)}</div>
          </div>
        )}

        {kind === "mobile" && (
          <div className="preview-mobile">
            <div>
              <i />
              <strong>Your day</strong>
              <span><b>74%</b></span>
              <p /><p /><p />
            </div>
          </div>
        )}

        {kind === "marketplace" && (
          <div className="preview-marketplace">
            <div><i /><i /><i /></div>
            <p><span /><b>Featured</b></p>
            <p><span /><b>New</b></p>
            <p><span /><b>Popular</b></p>
          </div>
        )}

        {kind === "knowledge" && (
          <div className="preview-knowledge">
            <div><i /> Search company knowledge <b>⌘ K</b></div>
            <p><span>01</span><i /><em>↗</em></p>
            <p><span>02</span><i /><em>↗</em></p>
            <p><span>03</span><i /><em>↗</em></p>
          </div>
        )}
      </div>
      <div className="mvp-visual-metric">
        <strong>{product.metric}</strong>
        <span>{product.metricLabel}</span>
      </div>
    </div>
  );
}

export function MvpMarketplace() {
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
          <p className="eyebrow">Algrid / Ready-to-launch products</p>
          <h1>
            Products designed
            <br /> to reach <em>market.</em>
          </h1>
          <p>
            Not prototypes for a pitch deck. Focused, production-ready business
            systems designed to validate demand, create operating leverage and
            become the foundation for what comes next.
          </p>
        </div>
        <div className="mvp-hero-terminal">
          <div>
            <span>LAUNCH INDEX</span>
            <i>LIVE</i>
          </div>
          <strong>15</strong>
          <p>READY-TO-SHAPE PRODUCT SYSTEMS</p>
          <dl>
            <div>
              <dt>Typical launch</dt>
              <dd>3–16 weeks</dd>
            </div>
            <div>
              <dt>Architecture</dt>
              <dd>Scale-ready</dd>
            </div>
            <div>
              <dt>Ownership</dt>
              <dd>100% yours</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mvp-marketplace">
        <div className="mvp-market-head">
          <div>
            <p className="eyebrow">Explore ready-to-launch products</p>
            <h2>Choose the business outcome.</h2>
          </div>
          <p>
            Every product is shaped around your operating model, customer and
            commercial advantage. Timelines are directional and confirmed
            during the product framing sprint.
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
              <span>ALGRID / BUSINESS PRODUCTS</span>
              <b>Product index</b>
            </div>
            <div className="mvp-browser-status">
              <i aria-hidden="true" />
              Scoping open
            </div>
          </div>

          <div className="mvp-browser-layout">
            <aside className="mvp-browser-sidebar">
              <div>
                <span>01</span>
                <p>Filter by outcome</p>
              </div>
              <div className="mvp-filter" role="group" aria-label="Filter business products">
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
                    <b>{categoryMeta[category].label}</b>
                    <span className="mvp-filter-count">{categoryCounts[category]}</span>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>
              <div className="mvp-browser-note">
                <span>Need a custom system?</span>
                <p>We can frame a product around your own operating model.</p>
                <Link href="/#contact">
                  Start with the problem <i aria-hidden="true">+</i>
                </Link>
              </div>
            </aside>

            <div className="mvp-browser-results">
              <div className="mvp-results-head" aria-live="polite">
                <div>
                  <p className="eyebrow">{categoryMeta[activeCategory].label}</p>
                  <h3>{categoryMeta[activeCategory].title}</h3>
                </div>
                <div className="mvp-results-summary">
                  <span>Showing</span>
                  <strong>{String(visibleProducts.length).padStart(2, "0")}</strong>
                  <p>{categoryMeta[activeCategory].description}</p>
                </div>
              </div>

              <motion.div layout className="mvp-product-grid">
                {visibleProducts.map((product) => (
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
                      <i>{product.category}</i>
                    </div>
                    <ProductPreview product={product} />
                    <div className="mvp-card-title">
                      <h3>{product.name}</h3>
                      <p>{product.promise}</p>
                    </div>
                    <dl className="mvp-specs">
                      <div>
                        <dt>Estimated build</dt>
                        <dd>{product.buildTime}</dd>
                      </div>
                      <div>
                        <dt>Ideal business</dt>
                        <dd>{product.idealFor}</dd>
                      </div>
                      <div>
                        <dt>Scalability</dt>
                        <dd>{product.scalability}</dd>
                      </div>
                    </dl>
                    <div className="mvp-detail-block">
                      <span>CORE FEATURES</span>
                      <div>
                        {product.features.map((feature) => (
                          <i key={feature}>{feature}</i>
                        ))}
                      </div>
                    </div>
                    <div className="mvp-stack">
                      <span>STACK</span>
                      <div>
                        {product.stack.map((technology) => (
                          <i key={technology}>{technology}</i>
                        ))}
                      </div>
                    </div>
                    <a href={`mailto:social@algridinternational.com?subject=${encodeURIComponent(`Product enquiry: ${product.name}`)}`}>
                      Scope this product <span aria-hidden="true">+</span>
                    </a>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="mvp-method">
        <div>
          <p className="eyebrow">How product delivery works</p>
          <h2>Fixed focus. Real product. Clear next move.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <b>Frame the signal</b>
              <p>Define the riskiest assumption and smallest valuable product.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>Design the system</b>
              <p>Map the core journey, operating logic and scale architecture.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>Build the advantage</b>
              <p>Ship the production product with analytics and admin control.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <b>Launch and learn</b>
              <p>Activate the market, read behaviour and prioritise the next release.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="mvp-page-cta">
        <p className="eyebrow">Have a different product in mind?</p>
        <h2>
          Bring the problem.
          <br /> We’ll shape the product.
        </h2>
        <Link className="button button-primary" href="/#contact">
          Start a product conversation <span aria-hidden="true">+</span>
        </Link>
      </section>
    </>
  );
}
