import { Lang } from "./i18n";

/**
 * Bilingual course content.
 *
 * The teacher authors ONE block per language. We store both languages inside the
 * single existing DB column (`title` / `description`) using explicit markers:
 *
 *   [[uz]]
 *   ...Uzbek content...
 *   [[ru]]
 *   ...Russian content...
 *
 * Students only ever see the block for the language they picked. This module is
 * the single source of truth for composing/parsing that format.
 *
 * Legacy data (seeded before this change) used a different convention:
 *   - titles:       "Uzbek title | Russian title"
 *   - descriptions: "<h2>UZ: ...</h2> ... <hr/> <h2>RU: ...</h2> ..."
 * parseContent() transparently understands the legacy formats too, so existing
 * rows render correctly per-language without a database migration.
 */

export interface BilingualContent {
  uz: string;
  ru: string;
}

const UZ_MARK = "[[uz]]";
const RU_MARK = "[[ru]]";

/** Remove the leading "UZ:" / "RU:" labels the legacy seed put inside headers. */
function stripLangLabel(html: string): string {
  return html.replace(/(<h[1-6][^>]*>)\s*(UZ|RU)\s*:\s*/gi, "$1");
}

/** Split stored content into { uz, ru }, handling both the new and legacy formats. */
export function parseContent(raw: string | null | undefined): BilingualContent {
  if (!raw) return { uz: "", ru: "" };
  const text = raw;

  // ── New explicit marker format ──────────────────────────────────────────
  if (text.includes(UZ_MARK) || text.includes(RU_MARK)) {
    const uzAt = text.indexOf(UZ_MARK);
    const ruAt = text.indexOf(RU_MARK);
    let uz = "";
    let ru = "";
    if (uzAt !== -1 && ruAt !== -1) {
      if (uzAt < ruAt) {
        uz = text.slice(uzAt + UZ_MARK.length, ruAt);
        ru = text.slice(ruAt + RU_MARK.length);
      } else {
        ru = text.slice(ruAt + RU_MARK.length, uzAt);
        uz = text.slice(uzAt + UZ_MARK.length);
      }
    } else if (uzAt !== -1) {
      uz = text.slice(uzAt + UZ_MARK.length);
    } else {
      ru = text.slice(ruAt + RU_MARK.length);
    }
    return { uz: uz.trim(), ru: ru.trim() };
  }

  // ── Legacy description: two halves separated by the first <hr> ───────────
  const hr = text.match(/<hr\s*\/?>/i);
  if (hr) {
    const idx = text.indexOf(hr[0]);
    return {
      uz: stripLangLabel(text.slice(0, idx)).trim(),
      ru: stripLangLabel(text.slice(idx + hr[0].length)).trim(),
    };
  }

  // ── Legacy title: "uz | ru" ──────────────────────────────────────────────
  if (text.includes("|")) {
    const i = text.indexOf("|");
    return { uz: text.slice(0, i).trim(), ru: text.slice(i + 1).trim() };
  }

  // ── Unknown / single language: show the same text for both ───────────────
  const t = text.trim();
  return { uz: t, ru: t };
}

/** Pick the content for `lang`, falling back to the other language if empty. */
export function pickContent(raw: string | null | undefined, lang: Lang): string {
  const { uz, ru } = parseContent(raw);
  if (lang === "ru") return ru || uz;
  return uz || ru;
}

/** Compose a { uz, ru } pair back into the stored marker format. */
export function composeContent({ uz, ru }: BilingualContent): string {
  return `${UZ_MARK}\n${uz.trim()}\n${RU_MARK}\n${ru.trim()}`;
}
