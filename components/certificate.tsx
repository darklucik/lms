"use client";

import { forwardRef } from "react";

interface CertificateProps {
  studentName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
  lang?: "uz" | "ru";
}

const TEXT = {
  uz: {
    brandSub: "Professional ta'lim",
    certOf: "Tugatganlik",
    completion: "SERTIFIKATI",
    certifies: "Ushbu sertifikat tasdiqlaydiki",
    completed: "quyidagi kursni muvaffaqiyatli tamomladi",
    dateLabel: "Tugatilgan sana",
    idLabel: "Sertifikat ID",
  },
  ru: {
    brandSub: "Профессиональное образование",
    certOf: "Сертификат",
    completion: "О ЗАВЕРШЕНИИ",
    certifies: "Настоящим подтверждается, что",
    completed: "успешно завершил(а) курс",
    dateLabel: "Дата завершения",
    idLabel: "ID сертификата",
  },
} as const;

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ studentName, courseTitle, completionDate, certificateId, lang = "uz" }, ref) => {
    const tr = TEXT[lang];
    return (
      <div
        ref={ref}
        style={{
          width: "900px",
          height: "636px",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          position: "relative",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── VIOLET HEADER BLOCK ─────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#7c3aed",
            height: "110px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 52px",
          }}
        >
          {/* Logo / Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "46px",
                height: "46px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "22px", fontWeight: "900", color: "#7c3aed" }}>
                M
              </span>
            </div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: "800", fontSize: "22px", letterSpacing: "0.5px" }}>
                MTLearning
              </div>
              <div style={{ color: "#ddd6fe", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                {tr.brandSub}
              </div>
            </div>
          </div>

          {/* Header right label */}
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#ede9fe", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {tr.certOf}
            </div>
            <div style={{ color: "#ffffff", fontWeight: "700", fontSize: "18px", letterSpacing: "1px" }}>
              {tr.completion}
            </div>
          </div>
        </div>

        {/* ── BEIGE / CREAM STRIPE ────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#f5ead6",
            height: "6px",
          }}
        />

        {/* ── WHITE BODY ──────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#fdf9f4",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            gap: "0px",
          }}
        >
          {/* Subtitle */}
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: "18px",
            }}
          >
            {tr.certifies}
          </div>

          {/* Student name */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#1e1b4b",
              letterSpacing: "-0.5px",
              textAlign: "center",
              lineHeight: "1.1",
              marginBottom: "20px",
            }}
          >
            {studentName}
          </div>

          {/* Separator line with diamond */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              width: "100%",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#7c3aed",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
          </div>

          {/* Has completed text */}
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              letterSpacing: "1px",
              marginBottom: "12px",
            }}
          >
            {tr.completed}
          </div>

          {/* Course title */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#7c3aed",
              textAlign: "center",
              lineHeight: "1.3",
              maxWidth: "680px",
              marginBottom: "10px",
            }}
          >
            {courseTitle}
          </div>
        </div>

        {/* ── BEIGE FOOTER STRIPE ─────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#f5ead6",
            height: "6px",
          }}
        />

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#1e1b4b",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 52px",
          }}
        >
          {/* Date */}
          <div>
            <div style={{ color: "#9ca3af", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>
              {tr.dateLabel}
            </div>
            <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: "600" }}>
              {completionDate}
            </div>
          </div>

          {/* Center seal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#7c3aed",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #f5ead6",
              }}
            >
              <span style={{ fontSize: "28px" }}>🏆</span>
            </div>
          </div>

          {/* Certificate ID */}
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#9ca3af", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>
              {tr.idLabel}
            </div>
            <div style={{ color: "#a78bfa", fontSize: "12px", fontWeight: "600", letterSpacing: "1px" }}>
              {certificateId}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";
