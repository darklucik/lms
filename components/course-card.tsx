"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CourseProgress } from "./course-progress";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { pickContent } from "@/lib/content-i18n";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({ id, title, imageUrl, chaptersLength, progress, category }: CourseCardProps) => {
  const { lang } = useLanguage();
  const localizedTitle = pickContent(title, lang);

  const chaptersLabel = lang === "uz"
    ? `${chaptersLength} ta bob`
    : `${chaptersLength} ${chaptersLength === 1 ? "урок" : chaptersLength < 5 ? "урока" : "уроков"}`;

  return (
    <Link href={`/courses/${id}`}>
      <div className="group border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white h-full flex flex-col">
        <div className="relative w-full aspect-video overflow-hidden bg-secondary">
          <Image src={imageUrl} alt={localizedTitle} className="object-cover group-hover:scale-105 transition-transform duration-300" fill />
          {category && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs bg-white/90 backdrop-blur-sm text-foreground border-0 shadow-sm">
                {category}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-4 gap-y-3">
          <h3 className="text-sm font-semibold leading-tight group-hover:text-violet-700 transition-colors line-clamp-2">
            {localizedTitle}
          </h3>
          <div className="flex items-center gap-x-1 text-xs text-muted-foreground mt-auto">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{chaptersLabel}</span>
          </div>
          {progress !== null && (
            <div className="pt-1">
              <CourseProgress size="sm" value={progress} variant={progress === 100 ? "success" : "default"} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
