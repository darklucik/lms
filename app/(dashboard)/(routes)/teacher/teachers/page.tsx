import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { TeachersClient } from "./_components/teachers-client";
import { getLang } from "@/lib/get-lang";
import { isTeacher } from "@/lib/teacher";

const TeachersPage = async () => {
  const { userId } = auth();
  if (!await isTeacher(userId)) {
    return redirect("/");
  }
  const lang = getLang();

  const teachers = await db.teacher.findMany({ orderBy: { createdAt: "desc" } });

  const title = lang === "uz" ? "O'qituvchilarni boshqarish" : "Управление учителями";
  const subtitle = lang === "uz"
    ? "Clerk User ID orqali o'qituvchi rolini bering yoki oling"
    : "Выдавайте и отзывайте роль учителя по Clerk User ID";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <TeachersClient initialTeachers={teachers} />
    </div>
  );
};

export default TeachersPage;
