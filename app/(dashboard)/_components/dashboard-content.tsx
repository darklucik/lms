"use client";

import CoursesList from "@/components/courses-list";
import { EnrolledCourseCard } from "@/components/enrolled-course-card";
import { CheckCircle2, Clock, BookOpen, TrendingUp } from "lucide-react";
import InfoCard from "./info-card";
import { Greeting } from "./greeting";
import { useLanguage } from "@/hooks/use-language";

interface CourseItem {
  id: string;
  title: string;
  imageUrl?: string | null;
  progress: number | null;
  category?: { name: string } | null;
  chapters: { id: string }[];
}

interface DashboardContentProps {
  completedCourses: CourseItem[];
  coursesInProgress: CourseItem[];
  firstName?: string;
}

export function DashboardContent({
  completedCourses,
  coursesInProgress,
  firstName,
}: DashboardContentProps) {
  const { t } = useLanguage();
  const totalCourses = completedCourses.length + coursesInProgress.length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <Greeting totalCourses={totalCourses} firstName={firstName} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard icon={TrendingUp} label={t.nav.courses} numberOfItems={totalCourses} />
        <InfoCard icon={Clock} label={t.dashboard.inProgress} numberOfItems={coursesInProgress.length} variant="default" />
        <InfoCard icon={CheckCircle2} label={t.dashboard.completed} numberOfItems={completedCourses.length} variant="success" />
      </div>

      {/* In-progress courses — horizontal cards */}
      {coursesInProgress.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-x-2">
            <Clock className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">{t.dashboard.inProgress}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coursesInProgress.map((course) => (
              <EnrolledCourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageUrl={course.imageUrl || ""}
                chaptersLength={course.chapters.length}
                progress={course.progress ?? 0}
                category={course.category?.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed courses */}
      {completedCourses.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">{t.dashboard.completed}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {completedCourses.map((course) => (
              <EnrolledCourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageUrl={course.imageUrl || ""}
                chaptersLength={course.chapters.length}
                progress={100}
                category={course.category?.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {totalCourses === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-y-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-violet-100 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-violet-600" />
          </div>
          <div>
            <p className="font-semibold text-lg">{t.search.noResults}</p>
            <p className="text-muted-foreground text-sm mt-1">{t.dashboard.noEnrolled}</p>
          </div>
        </div>
      )}
    </div>
  );
}
