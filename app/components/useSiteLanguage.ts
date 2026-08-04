"use client";

import {
  createContext,
  createElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SiteLanguage = "en" | "ms";

const storageKey = "algrid:language";
const languageEvent = "algrid:language-change";

type SiteLanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === "en" || savedLanguage === "ms") {
      document.documentElement.lang = savedLanguage;
      queueMicrotask(() => setLanguageState(savedLanguage));
    }

    function syncLanguage(event: Event) {
      const nextLanguage = (event as CustomEvent<SiteLanguage>).detail;
      setLanguageState(nextLanguage);
      document.documentElement.lang = nextLanguage;
    }

    window.addEventListener(languageEvent, syncLanguage);
    return () => window.removeEventListener(languageEvent, syncLanguage);
  }, []);

  const setLanguage = useCallback((nextLanguage: SiteLanguage) => {
    window.localStorage.setItem(storageKey, nextLanguage);
    document.documentElement.lang = nextLanguage;
    setLanguageState(nextLanguage);
    window.dispatchEvent(
      new CustomEvent<SiteLanguage>(languageEvent, { detail: nextLanguage }),
    );
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
  );

  return createElement(SiteLanguageContext.Provider, { value }, children);
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);
  if (!context) {
    throw new Error("useSiteLanguage must be used within SiteLanguageProvider");
  }
  return context;
}
