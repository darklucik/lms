import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  const { userId } = auth();
  if (!userId || userId !== process.env.NEXT_PUBLIC_TEACHER_ID) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  await db.teacher.delete({ where: { id: params.teacherId } });
  return NextResponse.json({ id: params.teacherId });
}
