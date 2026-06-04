"use client";

import { create } from "zustand";
import { translations, Lang } from "@/lib/i18n";

interface LanguageStore {
  lang: Lang;
  t: (typeof translations)["uz"];
  setLang: (lang: Lang) => void;
}

const getInitialLang = (): Lang => {
  if (typeof window === "undefined") return "uz";
  const stored = localStorage.getItem("lang") as Lang | null;
  if (stored === "ru" || stored === "uz") return stored;
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("lang="))
    ?.split("=")[1] as Lang | undefined;
  return cookie === "ru" ? "ru" : "uz";
};

export const useLanguage = create<LanguageStore>((set) => ({
  lang: "uz",
  t: translations["uz"],
  setLang: (lang: Lang) => {
    localStorage.setItem("lang", lang);
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
    set({ lang, t: translations[lang] });
  },
}));
