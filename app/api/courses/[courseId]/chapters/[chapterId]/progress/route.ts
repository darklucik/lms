import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { chapterId: string; courseId: string } }
) {
  try {
    const { userId, sessionId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      // DEBUG: helps diagnose intermittent 401s on prod (expired/missing Clerk session).
      console.warn("[CHAPTER_ID_PROGRESS_401]", {
        chapterId: params.chapterId,
        courseId: params.courseId,
        sessionId: sessionId ?? null,
        hasSessionCookie: req.headers.get("cookie")?.includes("__session") ?? false,
        cookieNames: (req.headers.get("cookie") ?? "")
          .split(";")
          .map((c) => c.trim().split("=")[0])
          .filter(Boolean),
        authHeader: req.headers.get("authorization") ? "present" : "absent",
        userAgent: req.headers.get("user-agent") ?? null,
      });
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProgress = await db.userProgress.upsert({
      where: { userId_chapterId: { userId, chapterId: params.chapterId } },
      update: { isCompleted },
      create: { userId, chapterId: params.chapterId, isCompleted },
    });

    console.log("[CHAPTER_ID_PROGRESS_OK]", {
      userId,
      chapterId: params.chapterId,
      isCompleted,
    });
    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
