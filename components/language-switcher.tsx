"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const router = useRouter();

  const onToggle = () => {
    setLang(lang === "uz" ? "ru" : "uz");
    // Server components (course title, chapter content, sidebar) read the
    // language from the cookie — re-render them so content follows the switch.
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="flex items-center gap-1.5 text-sm font-medium px-2"
      title={lang === "uz" ? "Русский тилига o'tish" : "O'zbek tiliga o'tish"}
    >
      <Languages className="h-4 w-4" />
      <span>{lang === "uz" ? "RU" : "UZ"}</span>
    </Button>
  );
}
