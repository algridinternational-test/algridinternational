import type { Metadata } from "next";
import Home from "../page";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Selected Ventures and Client Work",
  description: "Explore Algrid venture stories across consumer products, beauty, food, beverages, health and digital growth systems.",
  alternates: { canonical: "/ventures" },
  openGraph: {
    title: "Selected Ventures — Algrid International",
    description: "Identity, product and growth infrastructure behind ventures designed to last.",
    url: "/ventures",
    images: [socialImage],
  },
};

export default Home;
