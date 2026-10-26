import Image from "next/image";
import { PHOTO_HEIGHT, PHOTO_WIDTH, formats, venuePhotos } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function Formats() {
  const photo = venuePhotos.salaAmpia;
  return (
    <section id="format" className="section section-white" aria-labelledby="format-title">
      <div className="container">
        <SectionHeading id="format-title" kicker={formats.kicker} title={formats.title} className={s.headNarrow} />

        <div className={s.formats}>
          {formats.items.map((f) => (
            <article key={f.key} className={s.formatCard} aria-labelledby={`format-${f.key}`}>
              <h3 id={`format-${f.key}`} className={s.formatName}>
                {f.name}
                <span className="visually-hidden">, </span>
                <span className={s.formatSize}>{f.size}</span>
              </h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>

        <p className={s.note}>{formats.note}</p>

        <figure className={`photo-frame ${s.wide}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={PHOTO_WIDTH}
            height={PHOTO_HEIGHT}
            sizes="(min-width: 1240px) 1160px, 100vw"
          />
        </figure>

        <div className="cta-row">
          <CtaLink section="format">{formats.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
