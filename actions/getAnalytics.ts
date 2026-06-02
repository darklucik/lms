import { db } from "@/lib/db";

export const getAnalytics = async (userId: string) => {
  try {
    const courses = await db.course.findMany({
      where: { userId },
      include: {
        chapters: { where: { isPublished: true } },
        _count: { select: { chapters: { where: { isPublished: true } } } },
      },
    });

    const totalCourses = courses.length;
    const publishedCourses = courses.filter(c => c.isPublished).length;

    // Подсчёт студентов по прогрессу
    const courseIds = courses.map(c => c.id);
    const progressEntries = await db.userProgress.findMany({
      where: { chapter: { courseId: { in: courseIds } } },
      select: { userId: true, chapter: { select: { courseId: true } } },
      distinct: ["userId"],
    });

    const uniqueStudents = new Set(progressEntries.map(p => p.userId)).size;

    const data = courses
      .filter(c => c.isPublished)
      .map(c => ({ name: c.title, total: c._count.chapters }));

    return { data, totalCourses, publishedCourses, totalStudents: uniqueStudents };
  } catch {
    return { data: [], totalCourses: 0, publishedCourses: 0, totalStudents: 0 };
  }
};
