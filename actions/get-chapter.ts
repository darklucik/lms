import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
  try {
    const course = await db.course.findUnique({
      where: { isPublished: true, id: courseId },
      select: { title: true },
    });

    const chapter = await db.chapter.findUnique({
      where: { id: chapterId, isPublished: true },
    });

    if (!chapter || !course) throw new Error("Not found");

    const attachments = await db.attachment.findMany({ where: { courseId } });

    const nextChapter = await db.chapter.findFirst({
      where: { courseId, isPublished: true, position: { gt: chapter.position } },
      orderBy: { position: "asc" },
    });

    const userProgress = await db.userProgress.findUnique({
      where: { userId_chapterId: { userId, chapterId } },
    });

    return { chapter, course, attachments, nextChapter, userProgress };
  } catch {
    return { chapter: null, course: null, attachments: [], nextChapter: null, userProgress: null };
  }
};
