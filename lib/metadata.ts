import type { Metadata } from "next";
import { copy, localeRoot, profile, projectPath, type Locale, type Project } from "./content";

export const siteOrigin = process.env.SITE_URL
  ? new URL(process.env.SITE_URL).origin
  : undefined;

export function pageMetadata(locale: Locale, project?: Project): Metadata {
  const text = copy[locale];
  const pathFor = (lang: Locale) => project ? projectPath(lang, project.slug) : localeRoot(lang);
  const canonical = siteOrigin ? `${siteOrigin}${pathFor(locale)}` : undefined;
  const title = project
    ? `${project[locale].title} | ${profile.name}`
    : `${profile.name} | ${text.role}`;
  const description = project ? project[locale].blurb : text.meta;
  const image = siteOrigin ? `${siteOrigin}/share/${locale}.png` : undefined;

  return {
    title,
    description,
    icons: { icon: "/icon.svg" },
    alternates: siteOrigin ? {
      canonical,
      languages: {
        en: `${siteOrigin}${pathFor("en")}`,
        es: `${siteOrigin}${pathFor("es")}`,
        "x-default": `${siteOrigin}${pathFor("en")}`,
      },
    } : undefined,
    openGraph: {
      title, description, url: canonical, type: "website", siteName: profile.name,
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CO",
      images: image ? [{ url: image, width: 1200, height: 630, alt: `${profile.name} | ${text.role}` }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}
