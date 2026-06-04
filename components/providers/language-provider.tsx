"use client";

import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Lang, translations } from "@/lib/i18n";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const setLang = useLanguage((s) => s.setLang);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("lang="))
      ?.split("=")[1] as Lang | undefined;
    const lang: Lang = stored === "ru" || cookie === "ru" ? "ru" : "uz";
    useLanguage.setState({ lang, t: translations[lang] });
  }, []);

  return <>{children}</>;
}
