import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { MvpMarketplace } from "../mvps/MvpMarketplace";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Ready-to-Launch Business Products",
  description: "Explore ready-to-launch AI, software, commerce and operations products built by Algrid International.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Ready-to-Launch Business Products — Algrid International",
    description: "AI, software, commerce and operations products engineered for scalable business growth.",
    url: "/products",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ready-to-Launch Business Products — Algrid International",
    description: "Explore focused business products designed to reach market and scale.",
    images: [socialImage.url],
  },
};

export default function ProductsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mvp-page">
      <SiteHeader />
      <MvpMarketplace />
      <SiteFooter />
    </main>
  );
}
