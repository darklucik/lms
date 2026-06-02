"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked }: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle2 : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={isLocked}
      className={cn(
        "flex items-center gap-x-3 text-sm font-medium px-3 py-2.5 mx-2 rounded-lg transition-all w-[calc(100%-16px)] text-left",
        "text-muted-foreground hover:text-foreground hover:bg-secondary",
        isActive && !isCompleted && "text-violet-700 bg-violet-50 hover:bg-violet-50 hover:text-violet-700",
        isCompleted && "text-emerald-700",
        isCompleted && isActive && "bg-emerald-50 hover:bg-emerald-50",
        isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
      )}
    >
      <Icon
        size={17}
        className={cn(
          "shrink-0",
          isActive && !isCompleted && "text-violet-600",
          isCompleted && "text-emerald-600"
        )}
      />
      <span className="line-clamp-2 text-xs leading-snug">{label}</span>
      {isCompleted && (
        <CheckCircle2 size={14} className="ml-auto shrink-0 text-emerald-500" />
      )}
    </button>
  );
};

export default CourseSidebarItem;
