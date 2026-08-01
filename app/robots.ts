import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://algridinternational.com/sitemap.xml",
    host: "https://algridinternational.com",
  };
}
