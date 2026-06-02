import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { BookOpen } from "lucide-react";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const completedCount = course.chapters.filter(
    (ch) => ch.userProgress?.[0]?.isCompleted
  ).length;

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white">
      <div className="p-5 border-b space-y-3">
        <div className="flex items-start gap-x-2">
          <div className="h-8 w-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="h-4 w-4 text-violet-600" />
          </div>
          <h1 className="font-semibold text-sm leading-tight">{course.title}</h1>
        </div>
        <div className="pt-1">
          <CourseProgress
            variant={progressCount === 100 ? "success" : "default"}
            value={progressCount}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {completedCount} из {course.chapters.length} уроков пройдено
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full py-2">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
