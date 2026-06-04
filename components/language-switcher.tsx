"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === "uz" ? "ru" : "uz")}
      className="flex items-center gap-1.5 text-sm font-medium px-2"
      title={lang === "uz" ? "Русский тилига o'tish" : "O'zbek tiliga o'tish"}
    >
      <Languages className="h-4 w-4" />
      <span>{lang === "uz" ? "RU" : "UZ"}</span>
    </Button>
  );
}
