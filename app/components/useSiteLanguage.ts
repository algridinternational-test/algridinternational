"use client";

import { useEffect, useState } from "react";

export type SiteLanguage = "en" | "ms";

const storageKey = "algrid:language";
const languageEvent = "algrid:language-change";

export function useSiteLanguage() {
  const [language, setLanguageState] = useState<SiteLanguage>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(storageKey);
    let animationFrame: number | undefined;
    if (savedLanguage === "en" || savedLanguage === "ms") {
      document.documentElement.lang = savedLanguage;
      animationFrame = window.requestAnimationFrame(() => {
        setLanguageState(savedLanguage);
      });
    }

    function syncLanguage(event: Event) {
      const nextLanguage = (event as CustomEvent<SiteLanguage>).detail;
      setLanguageState(nextLanguage);
      document.documentElement.lang = nextLanguage;
    }

    window.addEventListener(languageEvent, syncLanguage);
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener(languageEvent, syncLanguage);
    };
  }, []);

  function setLanguage(nextLanguage: SiteLanguage) {
    window.localStorage.setItem(storageKey, nextLanguage);
    document.documentElement.lang = nextLanguage;
    setLanguageState(nextLanguage);
    window.dispatchEvent(
      new CustomEvent<SiteLanguage>(languageEvent, { detail: nextLanguage }),
    );
  }

  return { language, setLanguage };
}
