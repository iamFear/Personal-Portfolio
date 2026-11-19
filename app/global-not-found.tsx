import type { Metadata } from "next";
import { Document } from "../components/document";

export const metadata: Metadata = { title: "Page not found | Daniel Burgoa", robots: { index: false } };

export default function GlobalNotFound() {
  return <Document locale="en">
    <main className="wrap not-found">
      <h1>Page not found</h1>
      <div className="hero-actions">
        <a className="button button-primary" href="/">Back to the portfolio</a>
        <a className="button button-outline" href="/es/" lang="es" hrefLang="es">Volver al portafolio</a>
      </div>
    </main>
  </Document>;
}
