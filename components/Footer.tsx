import { privacyPolicyUrl } from "@/lib/config";
import { brand } from "@/lib/content";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

/** Nessun contatto, indirizzo o P. IVA: vanno aggiunti solo quando forniti e verificati. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={`container ${styles.inner}`}>
        <div>
          <Logo variant="full" tone="light" />
          <p className={styles.name}>{brand.fullName}</p>
          <p className={styles.place}>Dal 2002 a Ragusa</p>
        </div>
        <div className={styles.legal}>
          {privacyPolicyUrl && (
            <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
              Informativa privacy
              <span className="visually-hidden"> (si apre in una nuova scheda)</span>
            </a>
          )}
          <p>
            © {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
