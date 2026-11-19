import type { MetadataRoute } from "next";
import { projectPath, projects } from "../lib/content";
import { siteOrigin } from "../lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  const pairs = [{ en: "/", es: "/es/" }, ...projects.map(({ slug }) => ({
    en: projectPath("en", slug), es: projectPath("es", slug),
  }))];
  return pairs.flatMap(({ en, es }) => {
    const languages = { en: `${siteOrigin}${en}`, es: `${siteOrigin}${es}`, "x-default": `${siteOrigin}${en}` };
    return [languages.en, languages.es].map((url) => ({ url, alternates: { languages } }));
  });
}
