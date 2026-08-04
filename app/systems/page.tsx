import type { Metadata } from "next";
import Home from "../page";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Connected Growth Systems",
  description: "See how Algrid connects venture creation, digital transformation and intelligent growth into one accountable operating system.",
  alternates: { canonical: "/systems" },
  openGraph: {
    title: "Connected Growth Systems — Algrid International",
    description: "Move from strategy to repeatable growth through one connected delivery partner.",
    url: "/systems",
    images: [socialImage],
  },
};

export default Home;
