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
import { usePathname } from "next/navigation";

export type SiteLanguage = "en" | "ms";

const storageKey = "algrid:language";
const languageEvent = "algrid:language-change";

const malayDescriptions: Record<string, string> = {
  "/": "Pembina usaha niaga AI dan rakan transformasi digital Kuala Lumpur yang menyatukan strategi, jenama, perisian, automasi dan pertumbuhan.",
  "/products": "Terokai produk perniagaan sedia dilancarkan yang dibina oleh Algrid untuk mengesahkan permintaan, memperkemas operasi dan berkembang.",
  "/mvps": "Terokai produk perniagaan sedia dilancarkan yang dibina oleh Algrid untuk mengesahkan permintaan, memperkemas operasi dan berkembang.",
  "/services": "Terokai sistem bersepadu Algrid untuk automasi AI, perisian, jenama, pertumbuhan, kecerdasan perniagaan dan pelancaran produk.",
  "/ventures": "Terokai kisah usaha niaga Algrid merentas produk pengguna, kecantikan, makanan, minuman, kesihatan dan sistem pertumbuhan digital.",
  "/systems": "Lihat cara Algrid menghubungkan penciptaan usaha niaga, transformasi digital dan pertumbuhan pintar melalui satu sistem operasi.",
  "/ai-lab": "Terokai pengalaman AI gunaan Algrid untuk perjalanan pelanggan, operasi, kecerdasan keputusan dan pertumbuhan perniagaan.",
  "/contact": "Kongsikan ringkasan projek anda dengan pasukan kanan Algrid International untuk AI, perisian, jenama, pertumbuhan atau transformasi perniagaan.",
  "/insights": "Wawasan praktikal Algrid tentang strategi usaha niaga, sistem jenama, AI dan pertumbuhan berganda.",
  "/privacy": "Ketahui cara Algrid International mengumpul, menggunakan dan melindungi maklumat anda.",
  "/terms": "Terma penggunaan laman web Algrid International dalam bahasa yang mudah difahami.",
};

const malayTitles: Record<string, string> = {
  "/": "Algrid International — Pembina Usaha Niaga AI",
  "/products": "Produk Perniagaan Sedia Dilancarkan — Algrid International",
  "/mvps": "Produk Perniagaan Sedia Dilancarkan — Algrid International",
  "/services": "Perkhidmatan AI, Perisian, Jenama dan Pertumbuhan Bersepadu — Algrid International",
  "/ventures": "Usaha Niaga dan Hasil Kerja Pilihan — Algrid International",
  "/systems": "Sistem Pertumbuhan Terhubung — Algrid International",
  "/ai-lab": "Makmal AI Gunaan — Algrid International",
  "/contact": "Mulakan Projek — Algrid International",
  "/insights": "Wawasan — Algrid International",
  "/privacy": "Privasi — Algrid International",
  "/terms": "Terma — Algrid International",
  "/work/leroselle": "Leroselle — Kisah Usaha Niaga — Algrid International",
  "/work/mesfleur": "Mesfleur — Kisah Usaha Niaga — Algrid International",
  "/work/solid-coffee": "Solid Coffee — Kisah Usaha Niaga — Algrid International",
  "/work/glups": "Glups — Kisah Usaha Niaga — Algrid International",
  "/work/matts": "Matt’s — Kisah Usaha Niaga — Algrid International",
  "/work/tomms": "Tomm’s — Kisah Usaha Niaga — Algrid International",
};

function updateMetadata(language: SiteLanguage) {
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    const root = document.documentElement;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale"]');
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const titles = Array.from(document.querySelectorAll("title"));

    const pathname = window.location.pathname;
    if (root.dataset.metadataPath !== pathname) {
      root.dataset.metadataPath = pathname;
      [description, ogTitle, ogDescription, twitterTitle, twitterDescription].forEach((meta) => {
        if (meta) meta.dataset.englishContent = meta.content;
      });
      titles.forEach((title) => { title.dataset.englishContent = title.textContent ?? ""; });
    }

    if (language === "en") {
      [description, ogTitle, ogDescription, twitterTitle, twitterDescription].forEach((meta) => {
        if (meta?.dataset.englishContent) meta.content = meta.dataset.englishContent;
      });
      titles.forEach((title) => {
        if (title.dataset.englishContent) title.textContent = title.dataset.englishContent;
      });
      if (ogLocale) ogLocale.content = "en_MY";
      return;
    }

    const routeDescription = malayDescriptions[pathname]
      ?? (pathname.startsWith("/work/")
        ? "Kisah usaha niaga Algrid yang merangkumi strategi, identiti, produk dan sistem pertumbuhan terhubung."
        : pathname.startsWith("/insights/")
          ? "Wawasan Algrid tentang cara membina syarikat melalui strategi, teknologi, kecerdasan dan pertumbuhan."
          : malayDescriptions["/"]);
    const heading = document.querySelector("main h1")?.textContent?.replace(/\s+/g, " ").trim();
    const title = malayTitles[pathname]
      ?? (heading ? `${heading} — Algrid International` : "Algrid International — Pembina Usaha Niaga AI");
    titles.forEach((titleNode) => { titleNode.textContent = title; });
    window.setTimeout(() => {
      document.querySelectorAll("title").forEach((titleNode) => { titleNode.textContent = title; });
    }, 100);
    if (description) description.content = routeDescription;
    if (ogTitle) ogTitle.content = title;
    if (ogDescription) ogDescription.content = routeDescription;
    if (ogLocale) ogLocale.content = "ms_MY";
    if (twitterTitle) twitterTitle.content = title;
    if (twitterDescription) twitterDescription.content = routeDescription;
  }));
}

type SiteLanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>("en");
  const pathname = usePathname();

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === "en" || savedLanguage === "ms") {
      document.documentElement.lang = savedLanguage;
      queueMicrotask(() => setLanguageState(savedLanguage));
      updateMetadata(savedLanguage);
    }

    function syncLanguage(event: Event) {
      const nextLanguage = (event as CustomEvent<SiteLanguage>).detail;
      setLanguageState(nextLanguage);
      document.documentElement.lang = nextLanguage;
      updateMetadata(nextLanguage);
    }

    window.addEventListener(languageEvent, syncLanguage);
    return () => window.removeEventListener(languageEvent, syncLanguage);
  }, []);

  useEffect(() => {
    updateMetadata(language);
  }, [language, pathname]);

  const setLanguage = useCallback((nextLanguage: SiteLanguage) => {
    window.localStorage.setItem(storageKey, nextLanguage);
    document.documentElement.lang = nextLanguage;
    updateMetadata(nextLanguage);
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
