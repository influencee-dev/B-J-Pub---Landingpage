import { FORM_ANCHOR } from "@/lib/content";

type Props = {
  children: React.ReactNode;
  /** Sezione da cui parte il clic (per l'evento analytics cta_click). */
  section: string;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

/** CTA standard: di default porta al modulo #candidatura. Il clic è tracciato da CtaTracker. */
export function CtaLink({ children, section, href = FORM_ANCHOR, variant = "primary", className = "" }: Props) {
  const label = typeof children === "string" ? children : undefined;
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${className}`.trim()}
      data-cta-section={section}
      data-cta-label={label}
    >
      {children}
      {variant === "primary" && (
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
