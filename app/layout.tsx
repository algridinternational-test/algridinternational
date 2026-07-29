import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://algridinternational.com"),
  title: {
    default: "Algrid International — AI Venture Builder",
    template: "%s — Algrid International",
  },
  description:
    "Algrid builds ventures and transforms ambitious companies through integrated brand, software engineering, AI automation and growth systems.",
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Algrid International — Build the next version of your business.",
    description:
      "AI ventures, digital systems and intelligent growth—built by one integrated senior team.",
    type: "website",
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
  url: "https://algridinternational.com",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
