import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.trackksa.com";

  // Define actual site routes
  const routes = [
    "",             // Home
    "/about",     // About Us
    "/services",    // Services overvie
    "/jobs",      
    "/contact",     // Contact page
  ];

  const sitemapEntries: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" || route === ""
      ? 1
      : route.startsWith("/services") || route.startsWith("/jobs")
      ? 0.8
      : 0.6,
  }));

  return sitemapEntries;
}
