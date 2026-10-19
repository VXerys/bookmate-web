import type { MetadataRoute } from "next";

// No sitemap line yet: a sitemap needs absolute URLs, and the domain is still open (A-004, F-008 T-003).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
