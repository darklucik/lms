"use client";

import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useLanguage } from "@/hooks/use-language";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({ imageUrl: z.string().min(1) });

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success(t.course.imageUpdated);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error(t.messages.error);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {t.course.image}
        <Button variant="ghost" onClick={() => setIsEditing((v) => !v)}>
          {isEditing ? t.common.cancel : !initialData.imageUrl ? (
            <><PlusCircle className="h-4 w-4 mr-2" />{t.common.add}</>
          ) : (
            <><Pencil className="h-4 w-4 mr-2" />{t.common.change}</>
          )}
        </Button>
      </div>
      {!isEditing && (!initialData.imageUrl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        <div className="relative aspect-video mt-2">
          <Image alt="Course image" fill className="object-cover rounded-md" src={initialData.imageUrl} />
        </div>
      ))}
      {isEditing && (
        <div>
          <FileUpload endpoint="courseImage" onChange={(url) => { if (url) onSubmit({ imageUrl: url }); }} />
          <div className="text-xs text-muted-foreground mt-4">{t.course.imageRecommend}</div>
        </div>
      )}
    </div>
  );
};
