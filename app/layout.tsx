import type { Metadata } from "next";
import { HashCleaner } from "./components/HashCleaner";
import { SiteLanguageProvider } from "./components/useSiteLanguage";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.algridinternational.com"),
  title: {
    default: "Algrid International — AI Venture Builder",
    template: "%s — Algrid International",
  },
  description:
    "A Kuala Lumpur AI venture builder and digital transformation partner unifying strategy, brand, software, automation and growth.",
  keywords: [
    "AI venture builder",
    "digital transformation Malaysia",
    "AI automation company",
    "software development",
    "brand strategy",
    "growth systems",
  ],
  icons: {
    icon: "/algrid-logo.png",
    shortcut: "/algrid-logo.png",
  },
  applicationName: "Algrid International",
  authors: [{ name: "Algrid International", url: "https://www.algridinternational.com" }],
  creator: "Algrid International",
  publisher: "Algrid International",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Algrid International — Build the next version of your business.",
    description:
      "AI ventures, digital systems and intelligent growth—built by one integrated senior team.",
    type: "website",
    url: "https://www.algridinternational.com",
    siteName: "Algrid International",
    locale: "en_MY",
    images: [
      {
        url: "/og-gold.png",
        width: 1730,
        height: 909,
        alt: "Algrid International — Build the next version of your business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algrid International — AI Venture Builder",
    description:
      "Build the next version of your business with brand, software, AI and growth working as one.",
    images: ["/og-gold.png"],
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Algrid International",
  url: "https://www.algridinternational.com",
  email: "social@algridinternational.com",
  telephone: "+601169194826",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15-13A, Wisma UOA II, Jalan Pinang",
    postalCode: "50450",
    addressLocality: "Kuala Lumpur",
    addressCountry: "MY",
  },
  areaServed: "Worldwide",
  logo: "https://www.algridinternational.com/algrid-logo.png",
  description:
    "AI venture builder and digital transformation partner integrating strategy, branding, software engineering, automation and growth.",
  sameAs: [
    "https://www.instagram.com/algrid_international/",
    "https://www.facebook.com/people/Algrid-International/61575191317051/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+601169194826",
    email: "social@algridinternational.com",
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Malay"],
  },
  knowsAbout: [
    "Artificial intelligence automation",
    "Software engineering",
    "Brand systems",
    "Digital product development",
    "Growth strategy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteLanguageProvider>
          <HashCleaner />
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          {children}
        </SiteLanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
