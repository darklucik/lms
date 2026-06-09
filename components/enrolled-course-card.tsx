"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, Trophy } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { pickContent } from "@/lib/content-i18n";

interface EnrolledCourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number;
  category?: string;
}

export function EnrolledCourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  progress,
  category,
}: EnrolledCourseCardProps) {
  const { lang } = useLanguage();
  const localizedTitle = pickContent(title, lang);
  const isComplete = progress >= 100;
  const rounded = Math.round(progress);

  return (
    <Link href={`/courses/${id}`}>
      <div className="group flex items-stretch border rounded-xl overflow-hidden bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-28">
        {/* Left: info */}
        <div className="flex flex-col justify-between flex-1 px-4 py-3 min-w-0">
          {/* Category */}
          {category && (
            <span className="text-xs text-muted-foreground font-medium truncate">{category}</span>
          )}

          {/* Title */}
          <h3 className="text-sm font-semibold leading-tight group-hover:text-violet-700 transition-colors line-clamp-2 mt-0.5">
            {localizedTitle}
          </h3>

          {/* Progress section */}
          <div className="mt-auto space-y-1">
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                <span>
                  {chaptersLength}{" "}
                  {chaptersLength === 1
                    ? "bob"
                    : "ta bob"}
                </span>
              </div>
              <span
                className={`text-xs font-semibold tabular-nums ${
                  isComplete ? "text-emerald-600" : "text-violet-700"
                }`}
              >
                {isComplete ? (
                  <span className="flex items-center gap-x-1">
                    <CheckCircle2 className="h-3 w-3" />
                    100%
                  </span>
                ) : (
                  `${rounded}%`
                )}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete ? "bg-emerald-500" : "bg-violet-600"
                }`}
                style={{ width: `${Math.min(rounded, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative w-32 shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={localizedTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-violet-100 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-violet-400" />
            </div>
          )}
          {isComplete && (
            <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
              <Trophy className="h-7 w-7 text-yellow-300 drop-shadow" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
