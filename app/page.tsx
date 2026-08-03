"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ContactIcon,
  SiteFooter,
  SiteHeader,
  socialLinks,
} from "./components/SiteChrome";
import { SectionLink } from "./components/SectionLink";
import { ventureStories as ventures } from "./content";
import { mvpProducts } from "./mvps/data";

const featuredLaunchSystems = mvpProducts.slice(0, 4);

const portfolioSignals = [
  {
    value: "+20%",
    label: "reservations",
    context: "SEO system · Kuala Lumpur hospitality",
    period: "03 months",
  },
  {
    value: "+50%",
    label: "audience growth",
    context: "Social growth · Boutique retail",
    period: "02 months",
  },
  {
    value: "+15%",
    label: "conversions",
    context: "Lifecycle automation · Technology",
    period: "+30% opens",
  },
];

const clientVoices = [
  {
    quote: "Streamlined our workflows, saving us time and resources.",
    name: "Samantha Lee",
    focus: "Digital growth & automation",
  },
  {
    quote: "The results exceeded our expectations.",
    name: "Dinesh Kumar",
    focus: "Operations & online engagement",
  },
];

const systems = [
  {
    index: "01",
    title: "Venture Creation",
    text: "From opportunity thesis to product-market signal. We turn underdeveloped ideas into investable, operating ventures.",
    tags: ["Venture strategy", "Brand systems", "Product build"],
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

const services = [
  {
    index: "01",
    title: "AI & Automation",
    outcome: "Turn repetitive work into an intelligent operating advantage.",
    text: "Deploy trusted AI experiences that respond, qualify, retrieve and act across your customer and internal workflows.",
    capabilities: [
      "AI Chatbots",
      "AI Sales Assistants",
      "Workflow Automation",
      "CRM Integration",
      "Knowledge Base AI",
    ],
    visual: "automation",
    signal: "24/7",
    signalLabel: "intelligent execution",
  },
  {
    index: "02",
    title: "Web & Software",
    outcome: "Ship digital products people trust—and teams can scale.",
    text: "Create fast, resilient product infrastructure that connects the customer experience to the systems behind it.",
    capabilities: [
      "Next.js Websites",
      "SaaS Platforms",
      "Custom Dashboards",
      "Client Portals",
      "API Integrations",
    ],
    visual: "software",
    signal: "95+",
    signalLabel: "performance target",
  },
  {
    index: "03",
    title: "Brand & Creative",
    outcome: "Become the brand your category remembers.",
    text: "Build a distinctive commercial identity that stays coherent from shelf and screen to motion and campaign.",
    capabilities: [
      "Brand Identity",
      "Packaging",
      "Motion Graphics",
      "Commercial Videos",
      "Product Photography",
    ],
    visual: "brand",
    signal: "1×",
    signalLabel: "connected brand world",
  },
  {
    index: "04",
    title: "Growth Marketing",
    outcome: "Replace campaign spikes with a system that compounds.",
    text: "Connect acquisition, content and retention around one measurable learning loop.",
    capabilities: [
      "SEO",
      "Paid Advertising",
      "Content Marketing",
      "Email Marketing",
      "Social Media",
    ],
    visual: "growth",
    signal: "LOOP",
    signalLabel: "acquire · learn · retain",
  },
  {
    index: "05",
    title: "Business Intelligence",
    outcome: "Know what is working, why—and what to do next.",
    text: "Turn fragmented activity into decision-ready intelligence across the complete customer journey.",
    capabilities: [
      "Analytics Dashboards",
      "Conversion Tracking",
      "Customer Journey Mapping",
      "Reporting",
    ],
    visual: "intelligence",
    signal: "LIVE",
    signalLabel: "decision visibility",
  },
  {
    index: "06",
    title: "Business Launch",
    outcome: "Move from promising idea to market signal faster.",
    text: "Align the proposition, product and commercial story into a launch designed to learn and scale.",
    capabilities: [
      "Go-to-Market Strategy",
      "Product Development",
      "Sales Assets",
      "Product Launch",
    ],
    visual: "launch",
    signal: "0→1",
    signalLabel: "market momentum",
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

const guidedAnalyses = {
  consumer: [
    ["Own a repeatable consumption ritual", "Reframe the product around an occasion, not only a SKU."],
    ["Capture preference at the right moment", "Use zero-party data to improve bundles, guidance and CRM."],
    ["Connect creative to commercial signals", "Turn customer behaviour into a focused weekly content hypothesis."],
  ],
  operations: [
    ["Map the repeated decision", "Identify the handoff or judgement that creates the most operational delay."],
    ["Create one trusted knowledge layer", "Connect approved information before introducing automation across teams."],
    ["Automate the next action", "Move from alerts to governed workflows that update, route and follow through."],
  ],
  commerce: [
    ["Reduce the confidence gap", "Find the product information customers need before they can act."],
    ["Design the learning journey", "Use questions, comparison and guidance to make choice feel easier."],
    ["Close the retention loop", "Carry purchase and support signals into replenishment and lifecycle communication."],
  ],
} as const;

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
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function VentureMedia({
  venture,
}: {
  venture: (typeof ventures)[number];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [venture.loopVideo]);

  useEffect(() => {
    const video = videoRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!video || !shouldLoad || prefersReducedMotion) {
      video?.pause();
      setIsPlaying(false);
      return;
    }

    video.muted = true;
    video.play().catch(() => setIsPlaying(false));
  }, [shouldLoad, venture.loopVideo]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldLoad) {
      setShouldLoad(true);
      return;
    }

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className={`case-visual ${venture.captionMask ? "case-visual-caption-mask" : ""}`}>
      <video
        key={venture.loopVideo}
        ref={videoRef}
        className="case-video"
        muted
        loop
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        poster={shouldLoad ? venture.homepagePoster : undefined}
        aria-label={`${venture.name} silent eight-second brand-film loop`}
      >
        {shouldLoad ? <source src={venture.loopVideo} type="video/mp4" /> : null}
      </video>
      <div className="case-video-shade" />
      <div className="case-video-top">
        <span>BRAND FILM / {venture.code}</span>
        <i>08 SEC LOOP</i>
      </div>
      <div className="case-video-title">
        <span>{venture.type}</span>
        <strong>{venture.name}</strong>
      </div>
      <div className="case-video-controls">
        <button
          className="case-video-toggle"
          type="button"
          onClick={togglePlayback}
          aria-label={`${isPlaying ? "Pause" : "Play"} ${venture.name} brand film`}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>
      </div>
      <p>ALGRID VENTURE / {venture.code}</p>
    </div>
  );
}

export default function Home() {
  const [activeVenture, setActiveVenture] = useState(0);
  const [activeLaunchSystem, setActiveLaunchSystem] = useState(0);
  const [aiPrompt, setAiPrompt] = useState(
    "How could a traditional F&B brand create a repeatable growth engine?",
  );

  const [contactState, setContactState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [contactMessage, setContactMessage] = useState("");

  async function submitProjectBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setContactState("submitting");
    setContactMessage("Sending your project brief securely…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setContactState("success");
      setContactMessage(
        "Thank you. Your brief has been received and our team will reply within two business days.",
      );
    } catch {
      setContactState("error");
      setContactMessage(
        "We could not send the form right now. Please email social@algridinternational.com directly.",
      );
    }
  }
  const [aiState, setAiState] = useState<"idle" | "thinking" | "done">("idle");
  const [analysisKey, setAnalysisKey] =
    useState<keyof typeof guidedAnalyses>("consumer");
  const [monthlyLeads, setMonthlyLeads] = useState(320);
  const [closeRate, setCloseRate] = useState(12);
  const [dealValue, setDealValue] = useState(4200);
  const venture = ventures[activeVenture];
  const highlightedLaunchSystem = featuredLaunchSystems[activeLaunchSystem];
  const annualRevenue = useMemo(
    () => Math.round(monthlyLeads * (closeRate / 100) * dealValue * 12),
    [monthlyLeads, closeRate, dealValue],
  );

  function runAnalysis() {
    const prompt = aiPrompt.toLowerCase();
    const nextKey =
      /manual|workflow|crm|operation|process|team/.test(prompt)
        ? "operations"
        : /commerce|website|conversion|shop|sales|checkout/.test(prompt)
          ? "commerce"
          : "consumer";

    setAnalysisKey(nextKey);
    setAiState("thinking");
    window.setTimeout(() => setAiState("done"), 700);
  }

  function handleVentureKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + ventures.length) % ventures.length;
    setActiveVenture(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll("button");
    tabs?.[nextIndex]?.focus();
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <SiteHeader />

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
              <SectionLink className="button button-primary" section="contact">
                Build with Algrid <span aria-hidden="true">+</span>
              </SectionLink>
              <SectionLink className="button hero-work-cta" section="work">
                Explore our work <span aria-hidden="true">+</span>
              </SectionLink>
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
                <span>VENTURE SIGNAL MODEL</span>
                <span>INTERFACE DEMO ↗</span>
              </div>
              <div className="big-metric">
                <strong>06</strong>
                <span>CONNECTED GROWTH LAYERS</span>
              </div>
              <div className="sparkline" role="img" aria-label="Upward growth chart">
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
                  <b>04</b> DELIVERY PHASES
                </span>
                <span>
                  <b>01</b> ACCOUNTABLE TEAM
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

      <section className="section services-section" id="services">
        <FadeIn>
          <SectionIntro
            eyebrow="Our services / Solution platform"
            title="One platform. Six systems for growth."
            copy="A modular operating platform for building, launching and scaling companies. Activate one system—or connect all six through one accountable partner."
          />
        </FadeIn>
        <FadeIn className="services-platform-bar" delay={0.06}>
          <div>
            <i aria-hidden="true" />
            <span>ALGRID / SOLUTION OS</span>
          </div>
          <p>Strategy / Build / Intelligence / Growth</p>
          <div>
            <span>06 connected modules</span>
            <b>Platform active</b>
          </div>
        </FadeIn>
        <div className="service-grid">
          {services.map((service) => (
            <motion.article
              className={`service-card service-card-${service.visual}`}
              key={service.title}
              initial={false}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="service-card-head">
                <span>{service.index}</span>
                <p>{service.title}</p>
                <i aria-hidden="true">
                  <span />
                  Active
                </i>
              </div>

              <div
                className={`service-product service-product-${service.visual}`}
                aria-hidden="true"
              >
                <div className="service-product-label">
                  <span>Solution interface</span>
                  <i>Module {service.index}</i>
                </div>
                {service.visual === "automation" && (
                  <>
                    <div className="automation-node">
                      <span>IN</span>
                    </div>
                    <div className="automation-flow">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="automation-core">AI</div>
                    <div className="automation-output">
                      <span>QUALIFY</span>
                      <span>UPDATE</span>
                      <span>ACT</span>
                    </div>
                  </>
                )}
                {service.visual === "software" && (
                  <>
                    <div className="software-toolbar">
                      <span />
                      <span />
                      <span />
                      <i>DEPLOY / READY</i>
                    </div>
                    <div className="software-layout">
                      <span />
                      <div>
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                    <div className="software-status">● EDGE / READY</div>
                  </>
                )}
                {service.visual === "brand" && (
                  <>
                    <div className="brand-monogram">A.</div>
                    <div className="brand-palette">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="brand-word">DISTINCT / COHERENT</div>
                  </>
                )}
                {service.visual === "growth" && (
                  <>
                    <div className="growth-chart">
                      {[28, 42, 36, 58, 64, 81, 96].map((height) => (
                        <i key={height} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                    <div className="growth-loop">
                      <span>ACQUIRE</span>
                      <i>→</i>
                      <span>LEARN</span>
                      <i>→</i>
                      <span>COMPOUND</span>
                    </div>
                  </>
                )}
                {service.visual === "intelligence" && (
                  <>
                    <div className="bi-metric">
                      <span>CONVERSION SIGNAL</span>
                      <b>PRIORITY / HIGH</b>
                      <i>NEXT / TEST</i>
                    </div>
                    <div className="bi-map">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </>
                )}
                {service.visual === "launch" && (
                  <>
                    <div className="launch-orbit">
                      <span>01</span>
                      <i />
                    </div>
                    <div className="launch-steps">
                      <span className="done">THESIS</span>
                      <span className="done">PRODUCT</span>
                      <span>MARKET</span>
                    </div>
                  </>
                )}
              </div>

              <div className="service-card-copy">
                <h3>{service.outcome}</h3>
                <p>{service.text}</p>
              </div>
              <div className="service-capabilities" aria-label={`${service.title} capabilities`}>
                {service.capabilities.map((capability) => (
                  <span key={capability}>{capability}</span>
                ))}
              </div>
              <div className="service-signal">
                <div>
                  <span>Outcome signal</span>
                  <strong>{service.signal}</strong>
                  <small>{service.signalLabel}</small>
                </div>
                <SectionLink
                  section="contact"
                  aria-label={`Scope system: ${service.title} with Algrid`}
                >
                  Scope system <span aria-hidden="true">+</span>
                </SectionLink>
              </div>
            </motion.article>
          ))}
        </div>
        <FadeIn className="services-cta">
          <div>
            <span>Not sure where to start?</span>
            <p>We will map the highest-leverage system for your next stage.</p>
          </div>
          <SectionLink section="contact">
            Design your growth system <span aria-hidden="true">+</span>
          </SectionLink>
        </FadeIn>
      </section>

      <section className="section mvp-highlight-section" id="mvps">
        <FadeIn className="mvp-highlight-head">
          <div>
            <p className="eyebrow">Ready-to-launch products / Featured</p>
            <h2>Business products built to launch and grow.</h2>
          </div>
          <div>
            <p>
              Focused software products designed to reach market quickly,
              validate the core signal and scale without a rebuild.
            </p>
            <Link className="section-cta" href="/mvps">
              Explore all 15 products <span aria-hidden="true">+</span>
            </Link>
          </div>
        </FadeIn>
        <FadeIn className="mvp-home-browser">
          <div className="mvp-home-toolbar">
            <div aria-hidden="true"><i /><i /><i /></div>
            <span>
              ALGRID / BUSINESS PRODUCTS / <strong>FEATURED</strong>
            </span>
            <b><i aria-hidden="true" /> Product library online</b>
          </div>
          <div className="mvp-home-browser-body">
            <div className="mvp-home-index" role="group" aria-label="Featured business products">
              <div className="mvp-home-index-head">
                <span>Product library</span>
                <i>04 featured / 15 total</i>
              </div>
              {featuredLaunchSystems.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-pressed={activeLaunchSystem === index}
                  onClick={() => setActiveLaunchSystem(index)}
                >
                  <span>{product.code}</span>
                  <div>
                    <b>{product.name}</b>
                    <small>{product.category}</small>
                  </div>
                  <i>{product.buildTime}</i>
                  <strong aria-hidden="true">{activeLaunchSystem === index ? "●" : "○"}</strong>
                </button>
              ))}
              <Link href="/mvps">
                <span>View all 15 business products</span>
                <i>Open product library +</i>
              </Link>
            </div>

            <motion.article
              className="mvp-home-preview"
              key={highlightedLaunchSystem.id}
              initial={{ opacity: 0.45, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mvp-home-preview-head">
                <div>
                  <span>Blueprint / {highlightedLaunchSystem.code}</span>
                  <small>{highlightedLaunchSystem.category} product system</small>
                </div>
                <i><b aria-hidden="true" /> Reference configuration</i>
              </div>

              <div className="mvp-home-preview-overview">
                <div>
                  <h3>{highlightedLaunchSystem.name}</h3>
                  <strong>{highlightedLaunchSystem.promise}</strong>
                </div>
                <div className="mvp-home-readiness">
                  <span>Blueprint status</span>
                  <strong>Build-ready</strong>
                  <small>Scope, architecture and launch path mapped</small>
                </div>
              </div>

              <div className="mvp-home-kpis">
                <article>
                  <span>Outcome signal</span>
                  <strong>{highlightedLaunchSystem.metric}</strong>
                  <small>{highlightedLaunchSystem.metricLabel}</small>
                </article>
                <article>
                  <span>Estimated build</span>
                  <strong>{highlightedLaunchSystem.buildTime}</strong>
                  <small>Strategy through launch</small>
                </article>
                <article>
                  <span>Architecture</span>
                  <strong>{highlightedLaunchSystem.stack.length} layers</strong>
                  <small>Modular and scale-ready</small>
                </article>
              </div>

              <div className="mvp-home-command-grid">
                <section className="mvp-home-plan">
                  <div className="mvp-home-panel-head">
                    <span>Delivery plan</span>
                    <i>{highlightedLaunchSystem.buildTime} total</i>
                  </div>
                  {[
                    ["01", "Product strategy", "15%"],
                    ["02", "Experience system", "25%"],
                    ["03", "Build & integration", "45%"],
                    ["04", "Launch & learning", "15%"],
                  ].map((phase) => (
                    <div className="mvp-home-phase" key={phase[0]}>
                      <span>{phase[0]}</span>
                      <b>{phase[1]}</b>
                      <i>{phase[2]}</i>
                      <em aria-hidden="true"><span style={{ width: phase[2] }} /></em>
                    </div>
                  ))}
                </section>

                <section className="mvp-home-modules">
                  <div className="mvp-home-panel-head">
                    <span>Product architecture</span>
                    <i>{highlightedLaunchSystem.features.length} modules included</i>
                  </div>
                  <div className="mvp-home-module-list">
                    {highlightedLaunchSystem.features.map((feature, index) => (
                      <div key={feature}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <b>{feature}</b>
                        <i>Included</i>
                      </div>
                    ))}
                  </div>
                  <div className="mvp-home-stack">
                    <span>Technology stack</span>
                    <div>
                      {highlightedLaunchSystem.stack.map((technology) => (
                        <i key={technology}>{technology}</i>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className="mvp-home-preview-foot">
                <div className="mvp-home-fit">
                  <span>Best suited for</span>
                  <b>{highlightedLaunchSystem.idealFor}</b>
                  <small>{highlightedLaunchSystem.scalability}</small>
                </div>
                <a href={`/mvps#${highlightedLaunchSystem.id}`}>
                  View system <span aria-hidden="true">+</span>
                </a>
              </div>
            </motion.article>
          </div>
        </FadeIn>
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
                id={`venture-tab-${item.slug}`}
                role="tab"
                aria-selected={activeVenture === index}
                aria-controls="venture-panel"
                tabIndex={activeVenture === index ? 0 : -1}
                onClick={() => setActiveVenture(index)}
                onKeyDown={(event) => handleVentureKeyDown(event, index)}
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
            id="venture-panel"
            role="tabpanel"
            aria-labelledby={`venture-tab-${venture.slug}`}
            key={venture.name}
            initial={{ opacity: 0.4, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ "--case-color": venture.color } as React.CSSProperties}
          >
            <VentureMedia venture={venture} />
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
              <Link className="case-link" href={`/work/${venture.slug}`}>
                View venture story <span aria-hidden="true">+</span>
              </Link>
            </div>
          </motion.article>
        </div>

        <FadeIn className="portfolio-proof" delay={0.08}>
          <div className="portfolio-proof-bar">
            <span>ALGRID / EVIDENCE INDEX</span>
            <span><i /> SELECTED ENGAGEMENT SIGNALS</span>
            <span>03 OUTCOMES · 02 CLIENT NOTES</span>
          </div>
          <div className="portfolio-proof-head">
            <div>
              <p className="eyebrow">Portfolio highlights / Client evidence</p>
              <h3>Work that moves<br />the <em>business.</em></h3>
            </div>
            <div className="portfolio-proof-intro">
              <span>OUTCOMES, NOT OUTPUTS</span>
              <p>
                Selected outcome snapshots and client feedback showing what
                connected strategy, product and growth execution can unlock.
              </p>
            </div>
          </div>

          <div className="portfolio-signal-grid" aria-label="Selected portfolio outcomes">
            {portfolioSignals.map((signal, index) => (
              <article className={`portfolio-signal portfolio-signal-${index + 1}`} key={signal.label}>
                <div className="portfolio-signal-meta">
                  <span>SIGNAL / {String(index + 1).padStart(2, "0")}</span>
                  <small>{signal.period}</small>
                </div>
                <div className="portfolio-signal-value">
                  <strong>{signal.value}</strong>
                  <i>measured outcome</i>
                </div>
                <div className="portfolio-signal-copy">
                  <h4>{signal.label}</h4>
                  <p>{signal.context}</p>
                </div>
                <div className="portfolio-signal-chart" aria-hidden="true">
                  {Array.from({ length: 9 }, (_, barIndex) => <i key={barIndex} />)}
                </div>
              </article>
            ))}
          </div>

          <div className="client-voice-grid" aria-label="Client testimonials">
              <div className="client-voice-label">
              <div>
                <span>CLIENT PERSPECTIVE</span>
                <strong>What partners<br />noticed.</strong>
              </div>
              <b>02</b>
              <small>SELECTED NOTES</small>
            </div>
            {clientVoices.map((voice, index) => (
              <figure className="client-voice" key={voice.name}>
                <div className="client-voice-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true">“</i>
                </div>
                <blockquote>{voice.quote}</blockquote>
                <figcaption>
                  <b aria-hidden="true">{voice.name.charAt(0)}</b>
                  <span>
                    <strong>{voice.name}</strong>
                    <small>{voice.focus}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="portfolio-proof-foot">
            <span>Evidence note</span>
            <p>Selected engagement snapshots. Outcomes depend on scope, market conditions and implementation.</p>
            <i>ALGRID / CONNECTED EXECUTION</i>
          </div>
        </FadeIn>
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
              <span className="beta">GUIDED DEMO</span>
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
                <span aria-hidden="true">+</span>
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
                    <span>GUIDED OPPORTUNITY MAP</span>
                    <b>FRAMEWORK OUTPUT</b>
                  </div>
                  <ol>
                    {guidedAnalyses[analysisKey].map((item, index) => (
                      <li key={item[0]}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <b>{item[0]}</b>
                          <p>{item[1]}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="demo-disclosure">
                    Guided demonstration using a prebuilt decision framework.
                    No prompt data is stored or sent to an AI provider.
                  </p>
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
            <SectionLink section="contact">
              Build your business case <span aria-hidden="true">+</span>
            </SectionLink>
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
                <small>CLIENT INTERFACE / ILLUSTRATIVE</small>
                <b>Growth command centre</b>
              </div>
              <span>Q3 · DEMO</span>
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
              whileHover={{ y: -4, borderColor: "#d6a52b" }}
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
          <Link href="/insights">View all insights ↗</Link>
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
            <Link href="/insights/designing-companies-around-intelligence">Read field note ↗</Link>
          </article>
          <article>
            <div className="insight-art art-two">
              <span>BRAND</span>
              <span>↔</span>
              <span>SYSTEM</span>
            </div>
            <p>BRAND SYSTEMS · 6 MIN</p>
            <h3>Your brand is not a layer. It is the interface to your business.</h3>
            <Link href="/insights/brand-as-business-interface">Read field note ↗</Link>
          </article>
          <article>
            <div className="insight-art art-three">
              <div />
              <div />
              <div />
            </div>
            <p>GROWTH · 5 MIN</p>
            <h3>From campaigns to compounding: the growth operating system.</h3>
            <Link href="/insights/from-campaigns-to-compounding-growth">Read field note ↗</Link>
          </article>
        </div>
      </section>

      <section className="section philosophy-section" id="company">
        <FadeIn className="philosophy-head">
          <div className="philosophy-title">
            <p className="eyebrow">About Algrid / 10</p>
            <h2>
              The company behind
              <br /> the <em>next company.</em>
            </h2>
          </div>
          <div className="philosophy-intro">
            <span>Independent · Kuala Lumpur · Global</span>
            <p>
              Most companies do not need more advice. They need a partner who can
              see the whole system—and make it real.
            </p>
          </div>
        </FadeIn>

        <div className="philosophy-stage">
          <div className="philosophy-manifesto">
            <div className="philosophy-manifesto-top">
              <span>ALGRID / COMPANY PROFILE</span>
              <i>EST. KUALA LUMPUR</i>
            </div>
            <div className="philosophy-statement">
              <p>We operate where strategy usually stops.</p>
              <strong>
                One senior team to define the opportunity, shape the brand,
                engineer the product, apply intelligence and build growth.
              </strong>
            </div>
            <div className="philosophy-note">
              <p>
                Algrid International is an independent venture builder and
                digital transformation company. For almost a decade, we have
                helped founders and transformation leaders turn ambitious ideas
                into businesses that can operate, learn and scale.
              </p>
              <blockquote>
                The work is only successful when the business is stronger after
                we leave.
              </blockquote>
            </div>
          </div>

          <div className="philosophy-system" aria-label="Algrid integrated execution model">
            <div className="philosophy-system-head">
              <span>ONE ACCOUNTABLE SYSTEM</span>
              <i>05 / CONNECTED DISCIPLINES</i>
            </div>
            <div className="philosophy-orbit" aria-hidden="true">
              <span className="philosophy-ring philosophy-ring-one" />
              <span className="philosophy-ring philosophy-ring-two" />
              <b>A</b>
              <i className="philosophy-node node-strategy">STRATEGY</i>
              <i className="philosophy-node node-creative">CREATIVE</i>
              <i className="philosophy-node node-engineering">ENGINEERING</i>
              <i className="philosophy-node node-ai">AI</i>
              <i className="philosophy-node node-growth">GROWTH</i>
            </div>
            <div className="philosophy-system-foot">
              <span>VISION</span>
              <i />
              <span>OPERATING REALITY</span>
            </div>
          </div>
        </div>

        <div className="principles">
          {[
            [
              "01",
              "Systems over symptoms",
              "Solve the connected business problem, not the visible fragment.",
            ],
            [
              "02",
              "Senior talent, close to the work",
              "The people shaping the strategy stay accountable through delivery.",
            ],
            [
              "03",
              "Evidence before theatre",
              "Prototype, measure and learn before scaling the story.",
            ],
            [
              "04",
              "Build for ownership",
              "Create capability your team can operate long after launch.",
            ],
          ].map((principle) => (
            <div key={principle[0]}>
              <span>{principle[0]}</span>
              <b>{principle[1]}</b>
              <p>{principle[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" aria-hidden="true">
          <span />
        </div>
        <div className="contact-layout">
          <FadeIn className="contact-content">
            <p className="eyebrow">The next move / 11</p>
            <h2>
              Bring us the
              <br /> hard problem.
            </h2>
            <p>
              Tell us what you are changing, creating or trying to unlock. A
              senior team member will review the brief and return with a point
              of view—not a generic sales deck.
            </p>

            <div className="contact-proof">
              <div>
                <b>01</b>
                <span>Senior review from the first conversation</span>
              </div>
              <div>
                <b>02</b>
                <span>Clear next step within two business days</span>
              </div>
              <div>
                <b>03</b>
                <span>Project, launch or long-term partnership</span>
              </div>
            </div>

            <div className="contact-direct">
              <div className="contact-direct-head">
                <p>Prefer a direct channel?</p>
                <span>Kuala Lumpur · GMT+8</span>
              </div>
              <div className="contact-channel-grid">
                <a href="mailto:social@algridinternational.com">
                  <span className="contact-channel-icon">
                    <ContactIcon name="email" />
                  </span>
                  <span>
                    <small>Email our team</small>
                    <b>social@algridinternational.com</b>
                  </span>
                  <i aria-hidden="true">+</i>
                </a>
                <a
                  href="https://wa.me/601169194826"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel-icon">
                    <ContactIcon name="whatsapp" />
                  </span>
                  <span>
                    <small>Start on WhatsApp</small>
                    <b>+60 11 6919 4826</b>
                  </span>
                  <i aria-hidden="true">+</i>
                </a>
              </div>
              <div className="contact-location">
                <span className="contact-channel-icon">
                  <ContactIcon name="pin" />
                </span>
                <address>
                  15-13A, Wisma UOA II, Jalan Pinang<br />
                  50450 Kuala Lumpur, Malaysia
                </address>
              </div>
              <div className="contact-socials">
                <p>Follow our work</p>
                <div>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Algrid on ${social.name}`}
                    >
                      <ContactIcon name={social.icon} />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="contact-form-shell" delay={0.1}>
            <div className="contact-form-head">
              <span>PROJECT BRIEF / SECURE INTAKE</span>
              <i>Typically replies within 2 business days</i>
            </div>
            <form onSubmit={submitProjectBrief}>
              <label className="contact-honeypot" hidden>
                <span>Website</span>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="contact-fields">
                <label>
                  <span>Your name *</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Name"
                    required
                  />
                </label>
                <label>
                  <span>Work email *</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>
                <label>
                  <span>Company</span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or venture"
                  />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+60"
                  />
                </label>
                <label>
                  <span>What are we building? *</span>
                  <select name="projectType" defaultValue="" required>
                    <option value="" disabled>
                      Select a project type
                    </option>
                    <option>AI &amp; automation system</option>
                    <option>Website or software platform</option>
                    <option>Brand, packaging or creative system</option>
                    <option>Growth and performance engine</option>
                    <option>Business or product launch</option>
                    <option>Multi-system transformation</option>
                    <option>Long-term execution partnership</option>
                  </select>
                </label>
                <label>
                  <span>Preferred start *</span>
                  <select name="timeline" defaultValue="" required>
                    <option value="" disabled>
                      Select a timeframe
                    </option>
                    <option>As soon as possible</option>
                    <option>Within 30 days</option>
                    <option>Within 1–3 months</option>
                    <option>Exploring the right approach</option>
                  </select>
                </label>
                <label className="contact-message">
                  <span>What are you trying to change or launch? *</span>
                  <textarea
                    name="challenge"
                    rows={5}
                    placeholder="Share the business context, the friction you see and what a strong outcome would look like."
                    required
                  />
                </label>
              </div>

              <button
                className="contact-submit"
                type="submit"
                disabled={contactState === "submitting"}
              >
                {contactState === "submitting" ? "Sending brief…" : "Send project brief"}
                <span aria-hidden="true">+</span>
              </button>
              <p className="contact-privacy">
                Your details are used only to assess and respond to this
                enquiry. They are never sold or used for unsolicited marketing.
              </p>
              <p
                className={`contact-status contact-status-${contactState}`}
                role="status"
                aria-live="polite"
              >
                {contactMessage}
                {contactState === "error" ? (
                  <> <a href="mailto:social@algridinternational.com">Open email</a>.</>
                ) : null}
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
