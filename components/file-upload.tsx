"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

type FileUploadEndpoint = "courseImage" | "courseAttachment" | "chapterVideo";

const ACCEPTED: Record<FileUploadEndpoint, string> = {
  courseImage: "image/*",
  courseAttachment: "text/*,image/*,video/*,audio/*,application/pdf",
  chapterVideo: "video/*",
};

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: FileUploadEndpoint;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const labelMap: Record<FileUploadEndpoint, string> = {
    courseImage: t.fileupload.image,
    courseAttachment: t.fileupload.attachment,
    chapterVideo: t.fileupload.video,
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };

      const url = await new Promise<string>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) resolve(JSON.parse(xhr.responseText).url);
          else reject(new Error(t.messages.error));
        };
        xhr.onerror = () => reject(new Error(t.messages.error));
        xhr.open("POST", "/api/upload");
        xhr.send(formData);
      });

      onChange(url);
    } catch (error: any) {
      toast.error(error?.message || t.messages.error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-gray-400 transition"
      onClick={() => !uploading && inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && !uploading) handleFile(file);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ACCEPTED[endpoint]}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <UploadCloud className="h-10 w-10 text-gray-400" />
      {uploading ? (
        <div className="w-full max-w-xs space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-center text-gray-500">{progress}%</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-violet-600 font-medium">{t.fileupload.chooseOrDrag}</p>
          <p className="text-xs text-gray-400">{labelMap[endpoint]}</p>
          <Button type="button" size="sm">{t.fileupload.upload}</Button>
        </>
      )}
    </div>
  );
};
