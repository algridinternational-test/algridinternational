import type { Metadata } from "next";
import Home from "../page";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Integrated AI, Software, Brand and Growth Services",
  description: "Explore Algrid International's integrated systems for AI automation, software, brand, growth, business intelligence and product launch.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Integrated Business Systems — Algrid International",
    description: "Six connected systems for building, launching and scaling ambitious companies.",
    url: "/services",
    images: [socialImage],
  },
};

export default Home;
