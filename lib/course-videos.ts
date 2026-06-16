/**
 * Curated, real YouTube tutorial videos (Uzbek-language) mapped to chapter
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
  // Docker / deployment
  { match: /docker|deployment|развёрт|развертыв|production/i, url: yt("f6Gwdyu65Tk") },
  // Django
  { match: /django/i, url: yt("ldBZVMI43xY") },
  // Flask
  { match: /flask/i, url: yt("f6Gwdyu65Tk") },
  // FastAPI / REST API
  { match: /fastapi|rest\s*api|rest-api/i, url: yt("f6Gwdyu65Tk") },
  // SQLAlchemy / PostgreSQL / database
  { match: /sqlalchemy|postgre|ma'?lumotlar bazas|баз[аы] данных|\bбд\b/i, url: yt("gDJZOTlHhcg") },
  // asyncio
  { match: /asinxron|асинхрон|asyncio/i, url: yt("f6Gwdyu65Tk") },
  // tests / pytest
  { match: /test|тест|pytest|unittest/i, url: yt("f6Gwdyu65Tk") },
  // modules / packages
  { match: /modul|модул|paket|пакет/i, url: yt("VMg3zsh1gCU") },
  // exceptions / error handling
  { match: /xato|exception|исключен|boshqarish/i, url: yt("bY9lnhZ5zqs") },
  // files
  { match: /fayl|файл/i, url: yt("PXACfvhS9vU") },
  // OOP / classes
  { match: /oop|ооп|ob'?ekt|yo'?naltirilgan/i, url: yt("x1V7sXukKE0") },
  // lists / dicts / collections
  { match: /ro'?yxat|lug'?at|to'?plam|списк|словар|множеств|коллекц|кортеж/i, url: yt("1XOYa0BlF54") },
  // functions
  { match: /funksiya|функци/i, url: yt("pBW9buTi9HM") },
  // conditions / loops
  { match: /shart|tsikl|услови|цикл/i, url: yt("RhgjRtIEFnI") },
  // variables / data types
  { match: /o'?zgaruvchi|переменн|turlar|типы данных/i, url: yt("P3XqsGJtxBM") },
  // calculator mini-project
  { match: /kalkulyator|калькулятор/i, url: yt("A_MGbcYzdcc") },
  // final project / backend
  { match: /yakuniy|loyiha|финальн|проект|backend/i, url: yt("ldBZVMI43xY") },
  // Intro / fallback
  { match: /.*/i, url: yt("fU-3YmGTWyg") },
];

// ── JavaScript ──────────────────────────────────────────────────────────────
const JAVASCRIPT: Rule[] = [
  { match: /\bdom\b|sahifa|страниц|событи|element/i, url: yt("E7_qUYYXazU") },
  { match: /massiv|массив|tsikl|цикл/i, url: yt("n3og3H5ToAQ") },
  { match: /o'?zgaruvchi|переменн|let|const/i, url: yt("n3og3H5ToAQ") },
  { match: /funksiya|функци|shart|услови/i, url: yt("f_w5Zx1yh2M") },
  { match: /.*/i, url: yt("n3og3H5ToAQ") },
];

// ── HTML & CSS ────────────────────────────────────────────────────────────────
const WEB: Rule[] = [
  { match: /flexbox|joylash|вёрстк|верстк/i, url: yt("CD8z2gxpCh4") },
  { match: /css|stil|стил|shrift|шрифт|rang|цвет/i, url: yt("xwaA2R7vJm8") },
  { match: /teg|теги|rasm|havola|картинк|ссылк|ro'?yxat|список/i, url: yt("rbdIJkeBkDY") },
  { match: /.*/i, url: yt("xwaA2R7vJm8") },
];

// ── Git & Terminal ────────────────────────────────────────────────────────────
const GIT: Rule[] = [
  { match: /github|yuklash|загрузк|push/i, url: yt("vj6wUBcJWU8") },
  { match: /commit|коммит/i, url: yt("vj6wUBcJWU8") },
  { match: /git/i, url: yt("vj6wUBcJWU8") },
  { match: /terminal|терминал|buyruq|команд/i, url: yt("vj6wUBcJWU8") },
  { match: /.*/i, url: yt("vj6wUBcJWU8") },
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
