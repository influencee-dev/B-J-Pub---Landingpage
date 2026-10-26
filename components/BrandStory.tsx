import Image from "next/image";
import { PHOTO_HEIGHT, PHOTO_WIDTH, brandStory, venuePhotos } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function BrandStory() {
  const photo = venuePhotos.salaFotografie;
  return (
    <section id="brand" className="section" aria-labelledby="brand-title">
      <div className={`container ${s.split}`}>
        <figure className={`photo-frame ${s.splitMedia}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={PHOTO_WIDTH}
            height={PHOTO_HEIGHT}
            sizes="(min-width: 1240px) 540px, (min-width: 900px) 44vw, 100vw"
          />
        </figure>
        <div className={s.splitCopy}>
          <SectionHeading id="brand-title" kicker={brandStory.kicker} title={brandStory.title} />
          <div className={`stack ${s.body}`}>
            {brandStory.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
