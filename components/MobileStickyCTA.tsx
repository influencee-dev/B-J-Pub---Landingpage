"use client";

import { useEffect, useState } from "react";
import { FORM_ANCHOR, primaryCtaLabel } from "@/lib/content";
import styles from "./MobileStickyCTA.module.css";

/**
 * Barra CTA in basso, solo su schermi stretti (CSS).
 * Compare dopo la hero e sparisce quando sono visibili il modulo o il footer, così non li copre mai.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("candidatura");
    const footer = document.querySelector("footer");
    if (!hero || !form || !("IntersectionObserver" in window)) return;

    const inView = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView.set(e.target, e.isIntersecting);
        const blocked = [hero, form, footer].some((el) => el && inView.get(el));
        setVisible(!blocked);
      },
      { threshold: 0 },
    );
    [hero, form, footer].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.bar}>
      <a
        href={FORM_ANCHOR}
        className="btn btn-primary"
        data-cta-section="sticky-mobile"
        data-cta-label={primaryCtaLabel}
      >
        {primaryCtaLabel}
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
