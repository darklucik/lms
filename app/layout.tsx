import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ChunkErrorHandler } from "@/components/providers/chunk-error-handler";
import { LanguageProvider } from "@/components/providers/language-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MTLearning",
  description: "MTLearning onlayn ta'lim platformasi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <LanguageProvider>
          <ChunkErrorHandler />
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
