"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => switchLocale("de")}
        className={`px-3 py-1 rounded ${currentLocale === "de" ? "bg-[#e63946] text-white" : "text-gray-400 hover:text-white"}`}
      >
        DE
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded ${currentLocale === "en" ? "bg-[#e63946] text-white" : "text-gray-400 hover:text-white"}`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("bg")}
        className={`px-3 py-1 rounded ${currentLocale === "bg" ? "bg-[#e63946] text-white" : "text-gray-400 hover:text-white"}`}
      >
        BG
      </button>
    </div>
  );
}