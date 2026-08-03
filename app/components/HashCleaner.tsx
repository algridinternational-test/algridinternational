"use client";

import { useEffect } from "react";
import { pendingSectionKey } from "./SectionLink";

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
  const hashSection = [...fragments]
    .reverse()
    .find((fragment) => knownSections.has(fragment));
  const pendingSection = window.sessionStorage.getItem(pendingSectionKey);
  const section = hashSection ?? pendingSection;

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
  useEffect(() => {
    cleanLocationHash();
    window.addEventListener("hashchange", cleanLocationHash);
    return () => window.removeEventListener("hashchange", cleanLocationHash);
  }, []);

  return null;
}
