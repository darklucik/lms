import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { TeachersClient } from "./_components/teachers-client";

const TeachersPage = async () => {
  const { userId } = auth();
  // Только суперадмин видит эту страницу
  if (!userId || userId !== process.env.NEXT_PUBLIC_TEACHER_ID) {
    return redirect("/");
  }

  const teachers = await db.teacher.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Управление учителями</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Выдавайте и отзывайте роль учителя по Clerk User ID
        </p>
      </div>
      <TeachersClient initialTeachers={teachers} />
    </div>
  );
};

export default TeachersPage;
