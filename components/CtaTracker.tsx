"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Un solo listener per tutti i link con data-cta-section: evento cta_click (inattivo finché analytics è spento). */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cta-section]");
      if (!el) return;
      track("cta_click", {
        section: el.dataset.ctaSection,
        label: el.dataset.ctaLabel ?? el.textContent?.trim(),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
