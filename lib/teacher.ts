import { db } from "./db";

// Проверяет БД + fallback на env var (для суперадмина)
export const isTeacher = async (userId: string | null | undefined): Promise<boolean> => {
  if (!userId) return false;
  if (userId === process.env.NEXT_PUBLIC_TEACHER_ID) return true;
  const teacher = await db.teacher.findUnique({ where: { userId } });
  return !!teacher;
};
