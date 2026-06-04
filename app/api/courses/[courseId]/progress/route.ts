import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getProgress } from "@/actions/get-progress";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const progress = await getProgress(userId, params.courseId);
  return NextResponse.json({ progress });
}
