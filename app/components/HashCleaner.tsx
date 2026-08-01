"use client";

import { useEffect } from "react";

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

function cleanLocationHash() {
  const fragments = window.location.hash.split("#").filter(Boolean);
  if (fragments.length === 0) return;

  const section = [...fragments]
    .reverse()
    .find((fragment) => knownSections.has(fragment));
  const shouldClean = fragments.length > 1 || section === "top";

  if (!shouldClean) return;

  const cleanSection = section === "top" ? undefined : section;
  const cleanHash = cleanSection ? `#${cleanSection}` : "";

  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}${cleanHash}`,
  );

  window.requestAnimationFrame(() => {
    if (cleanSection) {
      document.getElementById(cleanSection)?.scrollIntoView({ block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  });
}

export function HashCleaner() {
  useEffect(() => {
    cleanLocationHash();
    window.addEventListener("hashchange", cleanLocationHash);
    return () => window.removeEventListener("hashchange", cleanLocationHash);
  }, []);

  return null;
}
