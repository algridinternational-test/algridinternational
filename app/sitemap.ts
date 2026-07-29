import type { MetadataRoute } from "next";
import { insightArticles, ventureStories } from "./content";

const origin = "https://algridinternational.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/mvps", "/insights", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${origin}${route}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...ventureStories.map(({ slug }) => ({
      url: `${origin}/work/${slug}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...insightArticles.map(({ slug }) => ({
      url: `${origin}/insights/${slug}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
