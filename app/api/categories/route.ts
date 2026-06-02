import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId || !await isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existing = await db.category.findUnique({ where: { name } });
    if (existing) {
      return new NextResponse("Категория уже существует", { status: 400 });
    }

    const category = await db.category.create({ data: { name } });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
