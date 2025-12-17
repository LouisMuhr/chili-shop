// i18n.ts

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Liste der unterstützten Sprachen
export const locales = ["de", "en", "bg"] as const;

export default getRequestConfig(async ({ locale }) => {
    const safeLocale = locale ?? 'de';
  // Prüfen, ob die Locale gültig ist
  if (!locales.includes(locale as any)) notFound();

  // Dynamisch die JSON-Datei laden
  return {
    locale: safeLocale,
    messages: (await import(`/messages/${locale}.json`)).default,
  };
});