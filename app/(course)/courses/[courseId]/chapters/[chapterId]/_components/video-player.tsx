"use client";

import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
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

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });
        if (!nextChapterId) {
          confetti.onOpen();
        }
        toast.success("Chapter completed! 🎉");
        router.refresh();
        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (isLocked) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 flex flex-col items-center justify-center gap-y-4">
        <Lock className="h-10 w-10 text-white/60" />
        <p className="text-white/80 text-sm font-medium">Приобретите курс для просмотра</p>
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
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
};
