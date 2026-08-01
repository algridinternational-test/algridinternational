import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { MvpMarketplace } from "./MvpMarketplace";

export const metadata: Metadata = {
  title: "Minimum Viable Products We Build",
  description:
    "Explore ready-to-launch AI, software, commerce and operations products built by Algrid International.",
  alternates: { canonical: "/mvps" },
  openGraph: {
    title: "Minimum Viable Products We Build — Algrid International",
    description:
      "Explore ready-to-launch AI, software, commerce and operations products engineered for scalable business growth.",
    url: "/mvps",
  },
};

export default function MvpsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mvp-page">
      <SiteHeader />
      <MvpMarketplace />
      <SiteFooter />
    </main>
  );
}
