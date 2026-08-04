import type { Metadata } from "next";
import Home from "../page";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Applied AI Lab",
  description: "Interact with Algrid's applied AI experiences for customer journeys, operations, decision intelligence and business growth.",
  alternates: { canonical: "/ai-lab" },
  openGraph: {
    title: "Applied AI Lab — Algrid International",
    description: "Useful AI infrastructure across decisions, operations, customer experience and growth.",
    url: "/ai-lab",
    images: [socialImage],
  },
};

export default Home;
