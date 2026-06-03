"use client";

import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

type FileUploadEndpoint = "courseImage" | "courseAttachment" | "chapterVideo";

const ACCEPTED: Record<FileUploadEndpoint, string> = {
  courseImage: "image/*",
  courseAttachment: "text/*,image/*,video/*,audio/*,application/pdf",
  chapterVideo: "video/*",
};

const MAX_SIZE: Record<FileUploadEndpoint, number> = {
  courseImage: 4 * 1024 * 1024,
  courseAttachment: 2 * 1024 * 1024 * 1024,
  chapterVideo: 10 * 1024 * 1024 * 1024,
};

const LABELS: Record<FileUploadEndpoint, string> = {
  courseImage: "Image (4MB)",
  courseAttachment: "Texts, images, videos, audio and pdfs",
  chapterVideo: "Video (MP4, WebM, OGG)",
};

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: FileUploadEndpoint;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > MAX_SIZE[endpoint]) {
      toast.error("Файл слишком большой");
      return;
    }

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `${endpoint}/${Date.now()}-${file.name}`);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snap) => {
        setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
      },
      (error) => {
        toast.error(error.message);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onChange(url);
        setUploading(false);
      }
    );
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
            <div
              className="h-full bg-violet-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-gray-500">{progress}%</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-violet-600 font-medium">Choose files or drag and drop</p>
          <p className="text-xs text-gray-400">{LABELS[endpoint]}</p>
          <Button type="button" size="sm">Upload 1 file</Button>
        </>
      )}
    </div>
  );
};
