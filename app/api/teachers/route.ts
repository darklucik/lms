import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function GET() {
  const { userId } = auth();
  if (!userId || !await isTeacher(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const teachers = await db.teacher.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(teachers);
}

export async function POST(req: Request) {
  const { userId } = auth();
  // Любой учитель (супер-админ через env var ИЛИ учитель из БД) может добавлять учителей
  if (!userId || !await isTeacher(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { teacherUserId } = await req.json();
  if (!teacherUserId) return new NextResponse("userId required", { status: 400 });

  const existing = await db.teacher.findUnique({ where: { userId: teacherUserId } });
  if (existing) return new NextResponse("Уже является учителем", { status: 400 });

  const teacher = await db.teacher.create({ data: { userId: teacherUserId } });
  return NextResponse.json(teacher);
}
