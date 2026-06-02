import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    // Показываем курсы где у пользователя есть прогресс
    const userProgressEntries = await db.userProgress.findMany({
      where: { userId },
      select: { chapter: { select: { courseId: true } } },
      distinct: ["chapterId"],
    });

    const courseIds = [...new Set(userProgressEntries.map(e => e.chapter.courseId))];

    const courses = await db.course.findMany({
      where: { id: { in: courseIds }, isPublished: true },
      include: {
        category: true,
        chapters: { where: { isPublished: true } },
      },
    }) as CourseWithProgressWithCategory[];

    for (const course of courses) {
      course.progress = await getProgress(userId, course.id);
    }

    return {
      completedCourses: courses.filter(c => c.progress === 100),
      coursesInProgress: courses.filter(c => (c.progress ?? 0) < 100),
    };
  } catch {
    return { completedCourses: [], coursesInProgress: [] };
  }
};
