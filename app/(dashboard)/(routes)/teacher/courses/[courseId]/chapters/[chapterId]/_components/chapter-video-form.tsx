"use client";

import { useState } from "react";
import { Pencil, PlusCircle, Video, PlayCircle } from "lucide-react";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Video uploaded successfully!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Что-то пошло не так");
    }
  };

  return (
    <div className="mt-6 border bg-slate-50 rounded-xl p-5">
      <div className="font-semibold flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-2">
          <PlayCircle className="h-5 w-5 text-violet-600" />
          <span>Chapter Video</span>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleEdit} className="text-violet-700 hover:text-violet-800 hover:bg-violet-50">
          {isEditing ? (
            <>Отмена</>
          ) : !initialData.videoUrl ? (
            <><PlusCircle className="h-4 w-4 mr-1.5" />Add video</>
          ) : (
            <><Pencil className="h-4 w-4 mr-1.5" />Change video</>
          )}
        </Button>
      </div>

      {!isEditing && !initialData.videoUrl && (
        <div className="flex flex-col items-center justify-center h-52 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 gap-y-3">
          <Video className="h-10 w-10 text-slate-400" />
          <p className="text-sm text-muted-foreground">No video uploaded yet</p>
        </div>
      )}

      {!isEditing && initialData.videoUrl && (
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            src={initialData.videoUrl}
            controls
            className="w-full aspect-video"
            preload="metadata"
          >
            Your browser does not support video playback.
          </video>
        </div>
      )}

      {isEditing && (
        <div className="space-y-3">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) onSubmit({ videoUrl: url });
            }}
          />
          <p className="text-xs text-muted-foreground">
            Upload MP4, WebM or OGG. Max 512GB via UploadThing.
          </p>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <p className="text-xs text-muted-foreground mt-2">
          Video uploaded. Students can watch it after you publish the chapter.
        </p>
      )}
    </div>
  );
};
