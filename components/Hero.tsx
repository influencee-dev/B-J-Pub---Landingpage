import Image from "next/image";
import { FORMAT_ANCHOR, PHOTO_HEIGHT, PHOTO_WIDTH, hero, venuePhotos } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import styles from "./Hero.module.css";

export function Hero() {
  const photo = venuePhotos.salaVoltaPietra;
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={`lead ${styles.subtitle}`}>{hero.subtitle}</p>

          <ul className={styles.highlights} aria-label="Punti in evidenza">
            {hero.highlights.map((h) => (
              <li key={h.label}>
                <span className={styles.hlLabel}>{h.label}</span> <span className={styles.hlValue}>{h.value}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <CtaLink section="hero">{hero.primaryCta}</CtaLink>
            <CtaLink section="hero" href={FORMAT_ANCHOR} variant="secondary">
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </div>

        <figure className={styles.media}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={PHOTO_WIDTH}
            height={PHOTO_HEIGHT}
            priority
            sizes="(min-width: 1240px) 560px, (min-width: 900px) 45vw, 100vw"
          />
        </figure>
      </div>
    </section>
  );
}
