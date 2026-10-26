import Image from "next/image";
import { PHOTO_HEIGHT, PHOTO_WIDTH, pilot, venuePhotos } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function PilotLocation() {
  const a = venuePhotos.banconeFrontale;
  const b = venuePhotos.banconeArco;
  return (
    <section id="punto-pilota" className="section section-bordeaux on-dark" aria-labelledby="pilota-title">
      <div className={`container ${s.pilot}`}>
        <div className={s.pilotCopy}>
          <SectionHeading id="pilota-title" kicker={pilot.kicker} title={pilot.title} />
          <p className="lead">{pilot.text}</p>
          <div className="cta-row">
            <CtaLink section="punto-pilota">{pilot.cta}</CtaLink>
          </div>
        </div>
        <div className={s.pilotPhotos}>
          <figure>
            <Image
              src={a.src}
              alt={a.alt}
              width={PHOTO_WIDTH}
              height={PHOTO_HEIGHT}
              sizes="(min-width: 1240px) 580px, (min-width: 900px) 48vw, 100vw"
            />
          </figure>
          <figure>
            <Image
              src={b.src}
              alt={b.alt}
              width={PHOTO_WIDTH}
              height={PHOTO_HEIGHT}
              sizes="(min-width: 1240px) 580px, (min-width: 900px) 48vw, 100vw"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
