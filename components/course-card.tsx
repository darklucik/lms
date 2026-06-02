import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, Star } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";
import { Badge } from "./ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white h-full flex flex-col">
        <div className="relative w-full aspect-video overflow-hidden bg-secondary">
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
          />
          {category && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="secondary"
                className="text-xs bg-white/90 backdrop-blur-sm text-foreground border-0 shadow-sm"
              >
                {category}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-4 gap-y-3">
          <h3 className="text-sm font-semibold leading-tight group-hover:text-violet-700 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-x-3 text-xs text-muted-foreground mt-auto">
            <div className="flex items-center gap-x-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{chaptersLength} {chaptersLength === 1 ? "lesson" : "lessons"}</span>
            </div>
          </div>
          {progress !== null ? (
            <div className="pt-1">
              <CourseProgress
                size="sm"
                value={progress}
                variant={progress === 100 ? "success" : "default"}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between pt-1">
              <p className="text-sm font-bold text-violet-700">
                {price === 0 ? "Free" : formatPrice(price)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
