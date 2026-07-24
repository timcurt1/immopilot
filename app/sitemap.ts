import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";

const BASE_URL = "https://immopilot.fr";

const STATIC_ROUTES = [
  "",
  "/solution",
  "/fonctionnalites",
  "/cas-dusage",
  "/securite",
  "/tarifs",
  "/ressources",
  "/a-propos",
  "/contact",
  "/demande-demo",
  "/statut",
  "/legal/mentions-legales",
  "/legal/confidentialite",
  "/legal/cookies",
  "/legal/cgu-cgv",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const articleEntries = ARTICLES.map((a) => ({
    url: `${BASE_URL}/ressources/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...articleEntries];
}
