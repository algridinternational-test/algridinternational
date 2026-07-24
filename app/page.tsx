"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const ventures = [
  {
    name: "Leroselle",
    type: "Oral care",
    code: "LR/01",
    color: "#d7ff59",
    title: "Turning a toothpaste into a modern oral-care ritual.",
    summary:
      "Brand strategy, packaging architecture and a conversion-led commerce experience designed to earn attention in a crowded category.",
    impact: ["2.8×", "conversion intent", "42%", "stronger recall"],
  },
  {
    name: "Mesfleur",
    type: "Beauty",
    code: "MF/02",
    color: "#ff758f",
    title: "A lip matte brand built for the camera-first shelf.",
    summary:
      "A confident identity and product system that translates naturally from packaging to creator content and digital commerce.",
    impact: ["3.1×", "content velocity", "64%", "repeat interest"],
  },
  {
    name: "Solid Coffee",
    type: "Beverage",
    code: "SC/03",
    color: "#d39a68",
    title: "Making daily coffee feel like an owned ritual.",
    summary:
      "Positioning, packaging and a retention engine designed to move a commodity product into a repeatable lifestyle platform.",
    impact: ["38%", "higher AOV", "4.6/5", "product intent"],
  },
  {
    name: "Glups",
    type: "Cordial drinks",
    code: "GL/04",
    color: "#56d8ff",
    title: "A cordial system with room to play and scale.",
    summary:
      "A modular flavour architecture, expressive campaign system and digital launch experience made for families and modern retail.",
    impact: ["6", "SKU system", "51%", "better recall"],
  },
  {
    name: "Matt's",
    type: "Sauces",
    code: "MT/05",
    color: "#ff8c42",
    title: "Shelf presence engineered from the bottle up.",
    summary:
      "A bold packaging family and retail-to-social brand language that makes flavour instantly legible without losing craft credibility.",
    impact: ["73%", "shelf standout", "2.4×", "social saves"],
  },
  {
    name: "Tomm's",
    type: "Health supplements",
    code: "TM/06",
    color: "#8ee7b1",
    title: "Health decisions made clear, credible and human.",
    summary:
      "A trust-first brand, information system and subscription journey that turns complexity into confident daily action.",
    impact: ["31%", "less friction", "58%", "subscription intent"],
  },
];

const systems = [
  {
    index: "01",
    title: "Venture Creation",
    text: "From opportunity thesis to product-market signal. We turn underdeveloped ideas into investable, operating ventures.",
    tags: ["Venture strategy", "Brand systems", "MVP build"],
  },
  {
    index: "02",
    title: "Digital Transformation",
    text: "Modern customer journeys, connected operations and scalable software—designed as one transformation roadmap.",
    tags: ["Product design", "Software engineering", "Data"],
  },
  {
    index: "03",
    title: "Intelligent Growth",
    text: "AI-powered content, lifecycle automation and experimentation systems that compound instead of creating campaign debt.",
    tags: ["AI automation", "Growth loops", "Performance"],
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "OpenAI",
  "Claude",
  "LangChain",
  "Postgres",
  "Supabase",
  "Vercel",
  "Cloudflare",
  "Shopify",
  "HubSpot",
  "Figma",
];

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [activeVenture, setActiveVenture] = useState(0);
  const [aiPrompt, setAiPrompt] = useState(
    "How could a traditional F&B brand create a repeatable growth engine?",
  );
  const [aiState, setAiState] = useState<"idle" | "thinking" | "done">("idle");
  const [monthlyLeads, setMonthlyLeads] = useState(320);
  const [closeRate, setCloseRate] = useState(12);
  const [dealValue, setDealValue] = useState(4200);
  const venture = ventures[activeVenture];
  const annualRevenue = useMemo(
    () => Math.round(monthlyLeads * (closeRate / 100) * dealValue * 12),
    [monthlyLeads, closeRate, dealValue],
  );

  function runAnalysis() {
    setAiState("thinking");
    window.setTimeout(() => setAiState("done"), 1100);
  }

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Algrid International home">
          ALGRID<span>®</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Ventures</a>
          <a href="#systems">Systems</a>
          <a href="#ai">AI Lab</a>
          <a href="#company">Company</a>
        </nav>
        <a className="nav-cta" href="#contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero section" id="top">
        <FadeIn className="hero-kicker">
          <span className="status-dot" />
          AI venture builder · Kuala Lumpur / Global
        </FadeIn>
        <div className="hero-grid">
          <FadeIn>
            <h1>
              Build the next version
              <br /> of your <em>business.</em>
            </h1>
          </FadeIn>
          <FadeIn className="hero-aside" delay={0.12}>
            <p>
              Algrid unifies brand, software, AI and growth into one senior
              execution partner—built to create ventures and transform
              ambitious companies.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Build with Algrid <span>↗</span>
              </a>
              <a className="text-link" href="#work">
                Explore our work <span>↓</span>
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="hero-system" delay={0.2}>
          <div className="system-topbar">
            <span>ALGRID / VENTURE OS</span>
            <span className="system-live">
              <i /> SYSTEM ONLINE
            </span>
          </div>
          <div className="hero-dashboard">
            <div className="signal-map" aria-hidden="true">
              <span className="orbit orbit-a" />
              <span className="orbit orbit-b" />
              <span className="core">A</span>
              {["STRATEGY", "BRAND", "PRODUCT", "AI", "GROWTH"].map(
                (label, i) => (
                  <span
                    className={`signal signal-${i + 1}`}
                    key={label}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
            <div className="metric-board">
              <div className="metric-head">
                <span>VENTURE SIGNALS</span>
                <span>LIVE ↗</span>
              </div>
              <div className="big-metric">
                <strong>+184%</strong>
                <span>COMPOUND SIGNAL</span>
              </div>
              <div className="sparkline" aria-label="Upward growth chart">
                {[24, 32, 27, 42, 48, 44, 61, 68, 74, 93, 88, 100].map(
                  (height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
              <div className="micro-metrics">
                <span>
                  <b>06</b> ACTIVE SYSTEMS
                </span>
                <span>
                  <b>91%</b> VELOCITY
                </span>
                <span>
                  <b>24/7</b> AUTOMATION
                </span>
              </div>
            </div>
          </div>
          <div className="system-ticker">
            <span>STRATEGY</span>
            <i>→</i>
            <span>IDENTITY</span>
            <i>→</i>
            <span>PRODUCT</span>
            <i>→</i>
            <span>INTELLIGENCE</span>
            <i>→</i>
            <span>GROWTH</span>
          </div>
        </FadeIn>
      </section>

      <section className="proof-strip">
        <p>Built for category creators, transformation leaders and founders</p>
        <div>
          <span>CONSUMER</span>
          <span>COMMERCE</span>
          <span>HEALTH</span>
          <span>F&B</span>
          <span>ENTERPRISE</span>
          <span>VENTURES</span>
        </div>
      </section>

      <section className="section work-section" id="work">
        <FadeIn>
          <SectionIntro
            eyebrow="Selected ventures / 01"
            title="Proof, not promises."
            copy="We build the identity, product and growth infrastructure behind ventures designed to last."
          />
        </FadeIn>

        <div className="case-layout">
          <div className="case-tabs" role="tablist" aria-label="Case studies">
            {ventures.map((item, index) => (
              <button
                key={item.name}
                role="tab"
                aria-selected={activeVenture === index}
                onClick={() => setActiveVenture(index)}
              >
                <span>{item.code}</span>
                <b>{item.name}</b>
                <small>{item.type}</small>
                <i>↗</i>
              </button>
            ))}
          </div>
          <motion.article
            className="case-stage"
            key={venture.name}
            initial={{ opacity: 0.4, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ "--case-color": venture.color } as React.CSSProperties}
          >
            <div className="case-visual">
              <div className="case-brand">{venture.name}</div>
              <div className="pack pack-one">
                <span>{venture.name}</span>
                <i>{venture.type}</i>
              </div>
              <div className="pack pack-two">
                <span>{venture.name}</span>
                <i>01 / DAILY</i>
              </div>
              <p>ALGRID VENTURE / {venture.code}</p>
            </div>
            <div className="case-content">
              <p className="eyebrow">{venture.type} · Selected work</p>
              <h3>{venture.title}</h3>
              <p>{venture.summary}</p>
              <div className="case-results">
                <span>
                  <b>{venture.impact[0]}</b>
                  {venture.impact[1]}
                </span>
                <span>
                  <b>{venture.impact[2]}</b>
                  {venture.impact[3]}
                </span>
              </div>
              <button className="case-link">
                View venture story <span>↗</span>
              </button>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="section systems-section" id="systems">
        <FadeIn>
          <SectionIntro
            eyebrow="Growth systems / 02"
            title="One partner. Every growth layer."
            copy="Traditional agencies hand you deliverables. We engineer connected systems that move a business from strategy to repeatable growth."
          />
        </FadeIn>
        <div className="systems-grid">
          {systems.map((system, index) => (
            <FadeIn className="system-card" delay={index * 0.08} key={system.title}>
              <div className="card-index">{system.index}</div>
              <div className={`system-glyph glyph-${index + 1}`} aria-hidden="true">
                <span />
                <i />
                <b />
              </div>
              <h3>{system.title}</h3>
              <p>{system.text}</p>
              <div className="tags">
                {system.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section ai-section" id="ai">
        <FadeIn>
          <SectionIntro
            eyebrow="Applied intelligence / 03"
            title="AI you can interact with."
            copy="We turn AI from a presentation slide into useful infrastructure across decisions, operations, customer experience and growth."
          />
        </FadeIn>
        <div className="ai-grid">
          <div className="ai-playground">
            <div className="panel-top">
              <span>ALGRID / OPPORTUNITY ENGINE</span>
              <span className="beta">DEMO</span>
            </div>
            <div className="ai-terminal">
              <label htmlFor="ai-prompt">Ask the venture strategist</label>
              <textarea
                id="ai-prompt"
                value={aiPrompt}
                onChange={(event) => {
                  setAiPrompt(event.target.value);
                  setAiState("idle");
                }}
              />
              <button onClick={runAnalysis} disabled={!aiPrompt.trim()}>
                {aiState === "thinking" ? "Mapping opportunity…" : "Run analysis"}
                <span>↗</span>
              </button>
            </div>
            <div className={`ai-output ${aiState}`}>
              {aiState === "idle" && (
                <p>Select a question or write your own to reveal a strategy map.</p>
              )}
              {aiState === "thinking" && (
                <div className="scan-state">
                  <i />
                  <span>Connecting market, brand and operating signals…</span>
                </div>
              )}
              {aiState === "done" && (
                <>
                  <div className="output-head">
                    <span>OPPORTUNITY MAP</span>
                    <b>HIGH SIGNAL</b>
                  </div>
                  <ol>
                    <li>
                      <span>01</span>
                      <div>
                        <b>Own a repeatable consumption ritual</b>
                        <p>Reframe the product around an occasion, not a SKU.</p>
                      </div>
                    </li>
                    <li>
                      <span>02</span>
                      <div>
                        <b>Build zero-party data into the journey</b>
                        <p>Use preference capture to personalise bundles and CRM.</p>
                      </div>
                    </li>
                    <li>
                      <span>03</span>
                      <div>
                        <b>Automate the content learning loop</b>
                        <p>Turn sales signals into weekly creative hypotheses.</p>
                      </div>
                    </li>
                  </ol>
                </>
              )}
            </div>
          </div>
          <div className="ai-products">
            <article>
              <span className="product-icon">◎</span>
              <p className="eyebrow">AI / CUSTOMER</p>
              <h3>Concierge</h3>
              <p>Trained product guidance that converts complex choices into confident action.</p>
              <div className="mini-chat">
                <span>What fits my daily routine?</span>
                <span>Based on your goals, start here ↗</span>
              </div>
            </article>
            <article>
              <span className="product-icon">⌁</span>
              <p className="eyebrow">AI / OPERATIONS</p>
              <h3>Command Centre</h3>
              <p>One intelligence layer across workflows, teams and business performance.</p>
              <div className="bars">
                <i style={{ width: "84%" }} />
                <i style={{ width: "61%" }} />
                <i style={{ width: "72%" }} />
              </div>
            </article>
            <article>
              <span className="product-icon">✦</span>
              <p className="eyebrow">AI / GROWTH</p>
              <h3>Content Engine</h3>
              <p>Brand-trained creative systems that learn from the market without diluting identity.</p>
              <div className="content-tiles">
                <i />
                <i />
                <i />
                <i />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section transformation-section">
        <FadeIn>
          <SectionIntro
            eyebrow="Business case / 04"
            title="Make transformation measurable."
            copy="Model the commercial impact of connecting better experience, faster execution and intelligent operations."
          />
        </FadeIn>
        <div className="roi-shell">
          <div className="calculator">
            <div className="calc-row">
              <label htmlFor="leads">
                Monthly qualified leads <b>{monthlyLeads}</b>
              </label>
              <input
                id="leads"
                type="range"
                min="50"
                max="1200"
                step="10"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
              />
            </div>
            <div className="calc-row">
              <label htmlFor="rate">
                Current close rate <b>{closeRate}%</b>
              </label>
              <input
                id="rate"
                type="range"
                min="2"
                max="40"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
              />
            </div>
            <div className="calc-row">
              <label htmlFor="value">
                Average deal value <b>RM {dealValue.toLocaleString()}</b>
              </label>
              <input
                id="value"
                type="range"
                min="500"
                max="20000"
                step="100"
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
              />
            </div>
            <p>Illustrative model based on a 20% conversion improvement.</p>
          </div>
          <div className="roi-result" aria-live="polite">
            <p>Potential annual opportunity</p>
            <strong>RM {Math.round(annualRevenue * 0.2).toLocaleString()}</strong>
            <span>INCREMENTAL REVENUE / YEAR</span>
            <div>
              <i />
              <p>
                <b>+20%</b>
                modelled conversion lift
              </p>
            </div>
            <a href="#contact">Build your business case ↗</a>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <FadeIn>
          <SectionIntro
            eyebrow="Delivery system / 05"
            title="From ambiguity to momentum."
            copy="A senior, integrated team moves through four connected phases—with evidence, decisions and working outputs at every step."
          />
        </FadeIn>
        <div className="process-line">
          {[
            ["01", "Frame", "Opportunity, audience, economics"],
            ["02", "Design", "Positioning, product, experience"],
            ["03", "Build", "Technology, content, automation"],
            ["04", "Compound", "Launch, learn, scale"],
          ].map((phase, index) => (
            <FadeIn className="process-step" delay={index * 0.08} key={phase[0]}>
              <span>{phase[0]}</span>
              <i />
              <h3>{phase[1]}</h3>
              <p>{phase[2]}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section dashboard-section">
        <FadeIn className="dashboard-copy">
          <p className="eyebrow">Shared command centre / 06</p>
          <h2>One view of the work. And the value.</h2>
          <p>
            Every engagement includes a transparent operating layer for
            decisions, milestones, experiments and performance—so momentum is
            visible, not buried in status meetings.
          </p>
          <ul>
            <li>Live roadmap and decision log</li>
            <li>Venture, product and growth metrics</li>
            <li>Weekly senior-team signals</li>
          </ul>
        </FadeIn>
        <FadeIn className="dashboard-ui" delay={0.1}>
          <div className="dash-sidebar">
            <b>A.</b>
            <span className="active">Overview</span>
            <span>Roadmap</span>
            <span>Experiments</span>
            <span>Assets</span>
            <span>Signals</span>
          </div>
          <div className="dash-main">
            <div className="dash-header">
              <div>
                <small>VENTURE / LEROSELLE</small>
                <b>Growth command centre</b>
              </div>
              <span>Q3 · LIVE</span>
            </div>
            <div className="dash-stats">
              <article>
                <small>Launch readiness</small>
                <b>86%</b>
                <i style={{ width: "86%" }} />
              </article>
              <article>
                <small>Experiment velocity</small>
                <b>12</b>
                <span>+4 this sprint</span>
              </article>
              <article>
                <small>Signal quality</small>
                <b>High</b>
                <span className="green">↑ 18.2%</span>
              </article>
            </div>
            <div className="dash-chart">
              <div className="chart-head">
                <span>COMPOUND GROWTH SIGNAL</span>
                <span>90 DAYS</span>
              </div>
              <div className="line-chart">
                {[18, 24, 21, 32, 38, 35, 49, 56, 64, 72, 81].map(
                  (height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section compare-section">
        <FadeIn>
          <SectionIntro
            eyebrow="Transformation view / 07"
            title="Not a redesign. A new operating reality."
            copy="We connect the experience customers see with the systems teams use behind it."
          />
        </FadeIn>
        <div className="compare-grid">
          <article className="before">
            <span>BEFORE / FRAGMENTED</span>
            <h3>Many activities.<br />Little compounding.</h3>
            {["Separate suppliers", "Manual operations", "Campaign-led growth", "Disconnected data"].map(
              (item) => <p key={item}>× {item}</p>,
            )}
          </article>
          <div className="compare-arrow">→</div>
          <article className="after">
            <span>AFTER / ALGRID SYSTEM</span>
            <h3>One strategy.<br />Every layer aligned.</h3>
            {["Integrated senior team", "AI-enabled workflows", "Always-on growth loops", "Shared intelligence layer"].map(
              (item) => <p key={item}>✓ {item}</p>,
            )}
          </article>
        </div>
      </section>

      <section className="section ecosystem-section">
        <FadeIn>
          <SectionIntro
            eyebrow="Technology ecosystem / 08"
            title="Built on the modern stack."
            copy="We choose proven technology around the problem—not the other way around—and leave every system maintainable, observable and ready to scale."
          />
        </FadeIn>
        <div className="stack-cloud">
          {stack.map((item, index) => (
            <motion.span
              key={item}
              whileHover={{ y: -4, borderColor: "#b8ff3d" }}
              transition={{ duration: 0.2 }}
              className={index % 4 === 0 ? "featured" : ""}
            >
              {item}
            </motion.span>
          ))}
        </div>
        <div className="industry-row">
          <p>Built across</p>
          <div>
            <span>Consumer brands</span>
            <span>Retail & commerce</span>
            <span>Food & beverage</span>
            <span>Health & wellness</span>
            <span>Professional services</span>
            <span>Enterprise transformation</span>
          </div>
        </div>
      </section>

      <section className="section insights-section">
        <FadeIn className="insights-head">
          <SectionIntro
            eyebrow="Field notes / 09"
            title="Ideas for builders."
            copy="Practical thinking at the intersection of brand, technology, intelligence and growth."
          />
          <a href="#insights">View all insights ↗</a>
        </FadeIn>
        <div className="insights-grid" id="insights">
          <article className="insight-featured">
            <div className="insight-art art-one">
              <span>01</span>
              <i />
              <b>AI ≠ TOOL</b>
            </div>
            <p>VENTURE STRATEGY · 8 MIN</p>
            <h3>Why the next generation of companies will be designed around intelligence.</h3>
            <a href="#contact">Read field note ↗</a>
          </article>
          <article>
            <div className="insight-art art-two">
              <span>BRAND</span>
              <span>↔</span>
              <span>SYSTEM</span>
            </div>
            <p>BRAND SYSTEMS · 6 MIN</p>
            <h3>Your brand is not a layer. It is the interface to your business.</h3>
            <a href="#contact">Read field note ↗</a>
          </article>
          <article>
            <div className="insight-art art-three">
              <div />
              <div />
              <div />
            </div>
            <p>GROWTH · 5 MIN</p>
            <h3>From campaigns to compounding: the growth operating system.</h3>
            <a href="#contact">Read field note ↗</a>
          </article>
        </div>
      </section>

      <section className="section philosophy-section" id="company">
        <FadeIn className="philosophy-grid">
          <div>
            <p className="eyebrow">About Algrid / 10</p>
            <h2>Built for the space between vision and reality.</h2>
          </div>
          <div className="philosophy-copy">
            <p>
              Most companies do not need more advice. They need a partner who can
              see the whole system—and make it real.
            </p>
            <p>
              Algrid International is an independent venture builder and digital
              transformation company. We bring strategy, creative, engineering,
              AI and growth into one accountable team.
            </p>
            <blockquote>
              “The work is only successful when the business is stronger after
              we leave.”
            </blockquote>
          </div>
        </FadeIn>
        <div className="principles">
          {[
            ["01", "Systems over symptoms"],
            ["02", "Senior talent, close to the work"],
            ["03", "Evidence before theatre"],
            ["04", "Build for ownership"],
          ].map((principle) => (
            <div key={principle[0]}>
              <span>{principle[0]}</span>
              <b>{principle[1]}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" aria-hidden="true">
          <span />
        </div>
        <FadeIn className="contact-content">
          <p className="eyebrow">The next move</p>
          <h2>
            Build what your
            <br /> business could become.
          </h2>
          <p>
            Tell us what you are changing, creating or trying to unlock. We will
            come back with a point of view—not a sales deck.
          </p>
          <a className="button button-primary" href="mailto:hello@algrid.com">
            Start a conversation <span>↗</span>
          </a>
          <small>Typical response within 2 business days.</small>
        </FadeIn>
      </section>

      <footer>
        <a className="brand" href="#top">
          ALGRID<span>®</span>
        </a>
        <p>AI ventures · Digital systems · Growth</p>
        <div>
          <a href="#work">Work</a>
          <a href="#ai">AI Lab</a>
          <a href="#company">Company</a>
          <a href="mailto:hello@algrid.com">Email</a>
        </div>
        <span>© 2026 Algrid International</span>
      </footer>
    </main>
  );
}
