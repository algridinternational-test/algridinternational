"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pendingSectionKey } from "./SectionLink";

const routeSections: Record<string, string> = {
  "/ai-lab": "ai",
  "/services": "services",
  "/systems": "systems",
  "/ventures": "work",
};

const knownSections = new Set([
  "ai",
  "company",
  "contact",
  "main-content",
  "services",
  "systems",
  "top",
  "work",
]);

function cleanLocationHash(pathname: string) {
  const fragments = window.location.hash.split("#").filter(Boolean);
  const hashSection = [...fragments]
    .reverse()
    .find((fragment) => knownSections.has(fragment));
  const pendingSection = window.sessionStorage.getItem(pendingSectionKey);
  const section = routeSections[pathname] ?? hashSection ?? pendingSection;

  if (!section) return;

  window.sessionStorage.removeItem(pendingSectionKey);

  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}`,
  );

  window.requestAnimationFrame(() => {
    if (section !== "top") {
      document.getElementById(section)?.scrollIntoView({ block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  });
}

export function HashCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    const handleHashChange = () => cleanLocationHash(pathname);
    cleanLocationHash(pathname);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return null;
}
