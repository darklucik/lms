import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !await isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.category.delete({ where: { id: params.categoryId } });
    return NextResponse.json({ id: params.categoryId });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
