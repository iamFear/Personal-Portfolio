import type { ReactNode } from "react";
import "@fontsource-variable/sora/wght.css";
import "@fontsource-variable/onest/wght.css";
import "../app/globals.css";
import type { Locale } from "../lib/content";

export function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <html lang={locale}><body>{children}</body></html>;
}
