/**
 * Backfill relevant YouTube videos onto existing chapters.
 *
 * For every chapter that has no video yet, picks a topic-matched YouTube
 * tutorial (see lib/course-videos.ts) based on the course + chapter title.
 *
 * Run with:
 *   npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/add-chapter-videos.ts
 *
 * Set FORCE_VIDEOS=1 to overwrite chapters that already have a video.
 */

import { PrismaClient } from "@prisma/client";
import { getChapterVideo } from "../lib/course-videos";

const db = new PrismaClient();
const FORCE = process.env.FORCE_VIDEOS === "1";

async function main() {
  console.log("🎬 Boblar uchun video qo'shilmoqda...\n");

  const courses = await db.course.findMany({ include: { chapters: true } });
  let updated = 0;
  let skipped = 0;

  for (const course of courses) {
    for (const ch of course.chapters) {
      if (!FORCE && ch.videoUrl && ch.videoUrl.trim()) {
        skipped++;
        continue;
      }
      const url = getChapterVideo(course.title, ch.title);
      if (!url) {
        skipped++;
        continue;
      }
      await db.chapter.update({ where: { id: ch.id }, data: { videoUrl: url } });
      updated++;
      console.log(`  ✓ ${ch.title.slice(0, 45)} → ${url}`);
    }
  }

  console.log(`\n🎉 Tayyor! Yangilandi: ${updated}, o'tkazib yuborildi: ${skipped}.`);
}

main()
  .catch((e) => {
    console.error("❌ Xato:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
