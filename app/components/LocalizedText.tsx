"use client";

import type { ReactNode } from "react";
import { useSiteLanguage } from "./useSiteLanguage";

export function LocalizedText({ en, ms }: { en: ReactNode; ms: ReactNode }) {
  const { language } = useSiteLanguage();
  return <>{language === "ms" ? ms : en}</>;
}
