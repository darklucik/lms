import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { isTeacher } from "@/lib/teacher";

export async function GET() {
  const { userId } = auth();
  const teacher = await isTeacher(userId);
  return NextResponse.json({ isTeacher: teacher });
}
