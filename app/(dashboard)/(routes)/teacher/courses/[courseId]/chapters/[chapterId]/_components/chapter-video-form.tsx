"use client";

import { useState } from "react";
import { Pencil, PlusCircle, Video, PlayCircle, Link2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useLanguage } from "@/hooks/use-language";

interface ChapterVideoProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

type VideoMode = "file" | "youtube";

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isYouTubeUrl(url: string): boolean {
  return getYouTubeId(url) !== null;
}

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoProps) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [mode, setMode] = useState<VideoMode>("file");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeError, setYoutubeError] = useState("");

  const hasVideo = !!initialData.videoUrl;
  const isYouTube = hasVideo && isYouTubeUrl(initialData.videoUrl!);
  const youtubeId = isYouTube ? getYouTubeId(initialData.videoUrl!) : null;

  const onSubmit = async (values: { videoUrl: string }) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success(t.chapter.videoSuccess);
      setIsEditing(false);
      setYoutubeUrl("");
      router.refresh();
    } catch {
      toast.error(t.messages.error);
    }
  };

  const handleYoutubeSubmit = () => {
    setYoutubeError("");
    const id = getYouTubeId(youtubeUrl);
    if (!id) {
      setYoutubeError(t.chapter.videoYouTubeInvalid);
      return;
    }
    onSubmit({ videoUrl: youtubeUrl });
  };

  return (
    <div className="mt-6 border bg-slate-50 rounded-xl p-5">
      <div className="font-semibold flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-2">
          <PlayCircle className="h-5 w-5 text-violet-600" />
          <span>{t.chapter.videoTitle}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing((v) => !v)} className="text-violet-700 hover:text-violet-800 hover:bg-violet-50">
          {isEditing ? t.common.cancel : !hasVideo ? (
            <><PlusCircle className="h-4 w-4 mr-1.5" />{t.chapter.videoAdd}</>
          ) : (
            <><Pencil className="h-4 w-4 mr-1.5" />{t.chapter.videoChange}</>
          )}
        </Button>
      </div>

      {/* Preview when not editing */}
      {!isEditing && !hasVideo && (
        <div className="flex flex-col items-center justify-center h-52 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 gap-y-3">
          <Video className="h-10 w-10 text-slate-400" />
          <p className="text-sm text-muted-foreground">{t.chapter.videoNone}</p>
        </div>
      )}

      {!isEditing && hasVideo && isYouTube && youtubeId && (
        <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            title={t.chapter.videoTitle}
          />
        </div>
      )}

      {!isEditing && hasVideo && !isYouTube && (
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            src={initialData.videoUrl!}
            controls
            className="w-full aspect-video"
            preload="metadata"
          >
            {t.chapter.videoNone}
          </video>
        </div>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div className="space-y-4">
          {/* Mode tabs */}
          <div className="flex rounded-lg border overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("file")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                mode === "file"
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <UploadCloud className="h-4 w-4" />
              {t.chapter.videoUploadFile}
            </button>
            <button
              type="button"
              onClick={() => setMode("youtube")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                mode === "youtube"
                  ? "bg-red-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Link2 className="h-4 w-4" />
              {t.chapter.videoYouTube}
            </button>
          </div>

          {mode === "file" && (
            <FileUpload
              endpoint="chapterVideo"
              onChange={(url) => {
                if (url) onSubmit({ videoUrl: url });
              }}
            />
          )}

          {mode === "youtube" && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value);
                    setYoutubeError("");
                  }}
                  placeholder={t.chapter.videoYouTubePlaceholder}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleYoutubeSubmit}
                  disabled={!youtubeUrl.trim()}
                  className="bg-red-500 hover:bg-red-600 text-white shrink-0"
                >
                  {t.common.save}
                </Button>
              </div>
              {youtubeError && <p className="text-xs text-red-500">{youtubeError}</p>}
              {/* Preview thumbnail if valid YouTube URL */}
              {!youtubeError && youtubeUrl && getYouTubeId(youtubeUrl) && (
                <div className="rounded-lg overflow-hidden border aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(youtubeUrl)}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="YouTube preview"
                  />
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground">{t.chapter.videoNote}</p>
        </div>
      )}

      {hasVideo && !isEditing && (
        <p className="text-xs text-muted-foreground mt-2">{t.chapter.videoUploaded}</p>
      )}
    </div>
  );
};
