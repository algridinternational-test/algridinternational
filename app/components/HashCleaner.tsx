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
  if (fragments.length < 2) return;

  const section = [...fragments]
    .reverse()
    .find((fragment) => knownSections.has(fragment));
  const cleanHash = section ? `#${section}` : "";

  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}${cleanHash}`,
  );

  if (section) {
    window.requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ block: "start" });
    });
  }
}

export function HashCleaner() {
  useEffect(() => {
    cleanLocationHash();
    window.addEventListener("hashchange", cleanLocationHash);
    return () => window.removeEventListener("hashchange", cleanLocationHash);
  }, []);

  return null;
}
