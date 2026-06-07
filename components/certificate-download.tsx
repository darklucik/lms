"use client";

import { useRef, useState } from "react";
import { Award, Download, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/components/certificate";
import { useLanguage } from "@/hooks/use-language";

interface CertificateDownloadProps {
  studentName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
}

export function CertificateDownload({
  studentName,
  courseTitle,
  completionDate,
  certificateId,
}: CertificateDownloadProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `certificate-${certificateId}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (e) {
      console.error("Certificate download failed", e);
    } finally {
      setDownloading(false);
    }
  };

  const label = lang === "uz"
    ? "Sertifikatni yuklab olish"
    : "Скачать сертификат";

  const preview = lang === "uz" ? "Sertifikatni ko'rish" : "Просмотр сертификата";
  const close = lang === "uz" ? "Yopish" : "Закрыть";
  const download = lang === "uz" ? "PNG yuklab olish" : "Скачать PNG";

  return (
    <>
      {/* Trigger button */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-amber-500 hover:bg-amber-600 text-white gap-x-2 font-semibold shadow-md"
      >
        <Award className="h-4 w-4" />
        {label}
      </Button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 p-4 overflow-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-[960px] w-full">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <span className="font-semibold text-sm">{preview}</span>
              <div className="flex items-center gap-x-2">
                <Button
                  size="sm"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-violet-600 hover:bg-violet-700 text-white gap-x-1.5"
                >
                  {downloading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Download className="h-3.5 w-3.5" />
                  )}
                  {download}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="ml-1">{close}</span>
                </Button>
              </div>
            </div>

            {/* Certificate preview — scaled to fit screen */}
            <div className="p-4 bg-slate-100 flex justify-center overflow-auto">
              <div style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
                <Certificate
                  ref={certRef}
                  studentName={studentName}
                  courseTitle={courseTitle}
                  completionDate={completionDate}
                  certificateId={certificateId}
                  lang={lang}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
