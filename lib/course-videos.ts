/**
 * Curated, real YouTube tutorial videos (Russian-language) mapped to chapter
 * topics. Single source of truth shared by the seed scripts and the
 * `scripts/add-chapter-videos.ts` backfill, so every chapter that lacks a video
 * gets a relevant one picked by keyword.
 *
 * Matching: the course title selects a "family" (Python / JavaScript / Web /
 * Git), then the chapter title is matched against ordered, most-specific-first
 * rules within that family.
 */

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

interface Rule {
  match: RegExp;
  url: string;
}

// ── Python (and the generic programming fallback) ───────────────────────────
const PYTHON: Rule[] = [
  { match: /docker|deployment|развёрт|развертыв|production/i, url: yt("dNS61T4MmlM") },
  { match: /django/i, url: yt("FZAO72uTj0M") },
  { match: /flask/i, url: yt("jgAVGtkk03Q") },
  { match: /fastapi|rest\s*api|rest-api/i, url: yt("RUddtw-oqFU") },
  { match: /sqlalchemy|postgre|ma'?lumotlar bazas|баз[аы] данных|\bбд\b/i, url: yt("hJsEVtaWOWM") },
  { match: /asinxron|асинхрон|asyncio/i, url: yt("_4QY1nGFRY8") },
  { match: /test|тест|pytest|unittest/i, url: yt("cBt7DveuuS0") },
  { match: /modul|модул|paket|пакет/i, url: yt("bVYvtpMeepU") },
  { match: /xato|exception|исключен|boshqarish/i, url: yt("KTosYqzyLpU") },
  { match: /fayl|файл/i, url: yt("tNfJ7EHN_Vw") },
  { match: /oop|ооп|ob'?ekt|yo'?naltirilgan/i, url: yt("gFRa6qVN980") },
  { match: /ro'?yxat|lug'?at|to'?plam|списк|словар|множеств|коллекц|кортеж/i, url: yt("qFRIRi3XwWk") },
  { match: /funksiya|функци/i, url: yt("6K5v4--G__U") },
  { match: /shart|tsikl|услови|цикл/i, url: yt("P0-jowMUwNk") },
  { match: /o'?zgaruvchi|переменн|turlar|типы данных/i, url: yt("DZvNZ9l9NT4") },
  { match: /kalkulyator|калькулятор/i, url: yt("8Ca7oT5RlxU") },
  { match: /yakuniy|loyiha|финальн|проект|backend/i, url: yt("gBfkX9H3szQ") },
  // Intro / fallback
  { match: /.*/i, url: yt("34Rp6KVGIEM") },
];

// ── JavaScript ──────────────────────────────────────────────────────────────
const JAVASCRIPT: Rule[] = [
  { match: /\bdom\b|sahifa|страниц|событи|element/i, url: yt("2DRJ07ykYQs") },
  { match: /massiv|массив|tsikl|цикл/i, url: yt("H39s52IW3bk") },
  { match: /o'?zgaruvchi|переменн|let|const/i, url: yt("JPIJ6DlLzK8") },
  { match: /funksiya|функци|shart|услови/i, url: yt("maPRR_jjyOE") },
  { match: /.*/i, url: yt("fHl7UyRjOf0") },
];

// ── HTML & CSS ────────────────────────────────────────────────────────────────
const WEB: Rule[] = [
  { match: /flexbox|joylash|вёрстк|верстк/i, url: yt("nIMrrrFnFuQ") },
  { match: /css|stil|стил|shrift|шрифт|rang|цвет/i, url: yt("o8neCiuAfsA") },
  { match: /teg|теги|rasm|havola|картинк|ссылк|ro'?yxat|список/i, url: yt("MFgwNOILQfQ") },
  { match: /.*/i, url: yt("_R5a-Kc0pRc") },
];

// ── Git & Terminal ────────────────────────────────────────────────────────────
const GIT: Rule[] = [
  { match: /github|yuklash|загрузк|push/i, url: yt("VJm_AjiTEEc") },
  { match: /commit|коммит/i, url: yt("O00FTZDxD0o") },
  { match: /git/i, url: yt("bkNCylkzFRk") },
  { match: /terminal|терминал|buyruq|команд/i, url: yt("XvqRTcRK7fU") },
  { match: /.*/i, url: yt("bkNCylkzFRk") },
];

function familyFor(courseTitle: string): Rule[] {
  const t = courseTitle.toLowerCase();
  if (t.includes("javascript")) return JAVASCRIPT;
  if (t.includes("html") || t.includes("css")) return WEB;
  if (t.includes("git") || t.includes("terminal")) return GIT;
  return PYTHON;
}

/** Pick a relevant YouTube video URL for a chapter, or null if nothing fits. */
export function getChapterVideo(courseTitle: string, chapterTitle: string): string | null {
  const rules = familyFor(courseTitle);
  for (const r of rules) {
    if (r.match.test(chapterTitle)) return r.url;
  }
  return null;
}
