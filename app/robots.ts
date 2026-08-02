import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo", "/dashboard", "/applications", "/properties", "/candidate", "/messages", "/settings", "/api"],
      },
    ],
    sitemap: "https://immopilot.world/sitemap.xml",
  };
}
