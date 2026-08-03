"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import Link from "next/link";

const pendingSectionKey = "algrid:pending-section";

type SectionLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  section: string;
};

export function SectionLink({ section, onClick, ...props }: SectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (window.location.pathname !== "/") {
      window.sessionStorage.setItem(pendingSectionKey, section);
      window.location.assign("/");
      return;
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    document.getElementById(section)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return <Link {...props} href="/" onClick={handleClick} />;
}

export { pendingSectionKey };
