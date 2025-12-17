// i18n.ts (im Root)

import { getRequestConfig } from "next-intl/server";

export const locales = ["de", "en", "bg"] as const;

export default getRequestConfig(async ({ locale }) => {
    const safeLocale = locale ?? 'de';
  // Einfach fallback auf "de", wenn Locale ungültig
  if (!locales.includes(locale as any)) {
    locale = "de";
  }

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});