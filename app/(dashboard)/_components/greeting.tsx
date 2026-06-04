"use client";

import { useLanguage } from "@/hooks/use-language";

export const Greeting = ({ totalCourses, firstName }: { totalCourses: number; firstName?: string }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">
        {t.dashboard.welcome}{firstName ? `, ${firstName}` : ""} 👋
      </h1>
      <p className="text-muted-foreground text-sm">
        {totalCourses > 0
          ? t.dashboard.enrolled(totalCourses)
          : t.dashboard.noEnrolled}
      </p>
    </div>
  );
};
