"use client";

import { useEffect, useRef, useState } from "react";
import { FORM_ANCHOR, nav, primaryCtaLabel } from "@/lib/content";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label="B&J Pub, torna all’inizio">
          <Logo />
        </a>

        <nav className={styles.desktopNav} aria-label="Sezioni della pagina">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href={FORM_ANCHOR}
            className={`btn btn-primary ${styles.headerCta}`}
            data-cta-section="header"
            data-cta-label={primaryCtaLabel}
          >
            {primaryCtaLabel}
          </a>
          <button
            ref={buttonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.menuIcon} aria-hidden="true" data-open={open} />
            <span>{open ? "Chiudi" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div id="menu-mobile" ref={panelRef} className={styles.panel} hidden={!open}>
        <nav aria-label="Sezioni della pagina (menu)">
          <ul className="container">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className={styles.panelCta}>
              <a
                href={FORM_ANCHOR}
                className="btn btn-primary"
                data-cta-section="menu"
                data-cta-label={primaryCtaLabel}
                onClick={() => setOpen(false)}
              >
                {primaryCtaLabel}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
