import Image from "next/image";
import styles from "./Logo.module.css";

/**
 * Logo ufficiale B&J, scontornato da assets-originali/logo-bj-originale.png.
 * - variant "full": logo completo con «Pizza arrotolata dal 2002» (footer)
 * - variant "mark": fiamma, spirale e B&J (intestazione: a misura piccola il payoff non sarebbe leggibile)
 * - tone "color": colori originali, per fondi chiari (mai su fondo giallo: il payoff sparirebbe)
 * - tone "light": bordeaux sostituito da crema, per fondi bordeaux
 */
const FILES = {
  full: { color: "/brand/logo-colori.png", light: "/brand/logo-chiaro.png", w: 515, h: 649 },
  mark: { color: "/brand/marchio-colori.png", light: "/brand/marchio-chiaro.png", w: 515, h: 522 },
} as const;

type Props = { variant?: "full" | "mark"; tone?: "color" | "light"; className?: string };

export function Logo({ variant = "mark", tone = "color", className = "" }: Props) {
  const f = FILES[variant];
  return (
    <Image
      src={f[tone]}
      alt="B&J Pub"
      width={f.w}
      height={f.h}
      unoptimized
      className={`${styles.logo} ${styles[variant]} ${className}`.trim()}
    />
  );
}
