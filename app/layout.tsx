import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ChunkErrorHandler } from "@/components/providers/chunk-error-handler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MTLearning",
  description: "Платформа онлайн-обучения MTLearning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ChunkErrorHandler />
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
