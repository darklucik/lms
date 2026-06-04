"use client";

import { useEffect, useState } from "react";
import { CertificateDownload } from "@/components/certificate-download";
import { useLanguage } from "@/hooks/use-language";
import { Trophy } from "lucide-react";

interface CompletionBannerProps {
  courseId: string;
  courseTitle: string;
  studentName: string;
}

function makeCertId(courseId: string, studentName: string): string {
  const raw = `${courseId}-${studentName}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 31 + raw.charCodeAt(i)) & 0xffffffff;
  }
  return `MT-${Math.abs(hash).toString(16).toUpperCase().padStart(8, "0")}`;
}

function formatDate(lang: string): string {
  return new Intl.DateTimeFormat(lang === "uz" ? "uz-Latn-UZ" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function CompletionBanner({ courseId, courseTitle, studentName }: CompletionBannerProps) {
  const { lang, t } = useLanguage();
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/courses/${courseId}/progress`)
      .then((r) => r.json())
      .then((d) => setProgress(d.progress));
  }, [courseId]);

  if (progress === null || progress < 100) return null;

  const certId = makeCertId(courseId, studentName);
  const completionDate = formatDate(lang);

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mx-4 my-4">
      <div className="flex items-center gap-x-3">
        <div className="h-11 w-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
          <Trophy className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <p className="font-semibold text-emerald-800 text-sm">
            {lang === "uz" ? "Tabriklaymiz! Kursni tugatdingiz! 🎉" : "Поздравляем! Курс завершён! 🎉"}
          </p>
          <p className="text-xs text-emerald-600 mt-0.5">
            {lang === "uz"
              ? "Sertifikatingizni yuklab oling"
              : "Скачайте ваш сертификат"}
          </p>
        </div>
      </div>
      <CertificateDownload
        studentName={studentName}
        courseTitle={courseTitle}
        completionDate={completionDate}
        certificateId={certId}
      />
    </div>
  );
}
