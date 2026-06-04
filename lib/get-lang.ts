import { cookies } from "next/headers";
import { Lang, translations } from "./i18n";

/** Read language preference from cookie in server components */
export function getLang(): Lang {
  try {
    const cookieStore = cookies();
    const lang = cookieStore.get("lang")?.value as Lang | undefined;
    return lang === "ru" ? "ru" : "uz";
  } catch {
    return "uz";
  }
}

/** Get translation object for server components */
export function getT() {
  return translations[getLang()];
}
