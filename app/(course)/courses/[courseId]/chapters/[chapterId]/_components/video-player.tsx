"use client";

import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useLanguage } from "@/hooks/use-language";

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const confetti = useConfettiStore();
  const { t } = useLanguage();

  const youtubeId = getYouTubeId(videoUrl);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });
        if (!nextChapterId) confetti.onOpen();
        toast.success(t.chapter.completedMsg);
        router.refresh();
        if (nextChapterId) router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch {
      toast.error(t.messages.error);
    }
  };

  if (isLocked) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 flex flex-col items-center justify-center gap-y-4">
        <Lock className="h-10 w-10 text-white/60" />
        <p className="text-white/80 text-sm font-medium">{t.chapter.locked}</p>
      </div>
    );
  }

  if (youtubeId) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title={title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className={cn("w-full h-full", isLoading && "opacity-0")}
        onCanPlay={() => setIsLoading(false)}
        onEnded={onEnd}
        preload="metadata"
        title={title}
      >
        {t.chapter.videoNone}
      </video>
    </div>
  );
};
