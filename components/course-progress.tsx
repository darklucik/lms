"use client";

import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

export const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  const { lang } = useLanguage();
  const isSuccess = variant === "success" || value === 100;
  const label = lang === "uz"
    ? `${Math.round(value)}% bajarildi`
    : `${Math.round(value)}% выполнено`;

  return (
    <div className="space-y-1.5">
      <Progress
        className={cn("h-1.5", isSuccess ? "[&>div]:bg-emerald-500" : "[&>div]:bg-violet-600")}
        value={value}
        variant={variant}
      />
      <div className="flex items-center gap-x-1.5">
        {isSuccess ? <CheckCircle2 className="h-3 w-3 text-emerald-600" /> : null}
        <p className={cn(
          "text-xs font-medium",
          isSuccess ? "text-emerald-700" : "text-violet-700",
          size === "sm" && "text-xs"
        )}>
          {label}
        </p>
      </div>
    </div>
  );
};
