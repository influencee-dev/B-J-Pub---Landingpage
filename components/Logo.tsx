import Image from "next/image";
import styles from "./Logo.module.css";

/**
 * Logo ufficiale B&J Pub, su sfondo trasparente (ricavato da public/brand/logo-originale.png).
 * - "dark": "B&J" antracite + "Pub" rosso, per fondi chiari
 * - "light": colori originali (bianco + rosso), per fondi scuri
 * Se arriverà la versione vettoriale (SVG), basta cambiare i percorsi qui.
 */
const SRC = { dark: "/brand/logo-scuro.png", light: "/brand/logo-chiaro.png" } as const;

export function Logo({ tone = "dark", size = "header" }: { tone?: "dark" | "light"; size?: "header" | "footer" }) {
  return (
    <Image
      src={SRC[tone]}
      alt="B&J Pub"
      width={126}
      height={96}
      unoptimized
      className={`${styles.logo} ${size === "footer" ? styles.footer : ""}`}
    />
  );
}
