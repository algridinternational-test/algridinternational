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
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Algrid International — Build the next version of your business.",
    description:
      "AI ventures, digital systems and intelligent growth—built by one integrated senior team.",
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
  },
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
      <body>{children}</body>
    </html>
  );
}
