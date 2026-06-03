"use client";

import { useEffect } from "react";

export const ChunkErrorHandler = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.name === "ChunkLoadError" ||
        event.message?.includes("Loading chunk") ||
        event.message?.includes("ChunkLoadError")
      ) {
        event.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return null;
};
