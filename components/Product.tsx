import Image from "next/image";
import { productPhotos } from "@/lib/config";
import { product } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function Product() {
  const available = productPhotos.filter((p): p is typeof p & { src: string } => p.src !== null);

  return (
    <section id="prodotto" className="section section-white" aria-labelledby="prodotto-title">
      <div className={`container ${s.productGrid}`}>
        <div>
          <SectionHeading id="prodotto-title" kicker={product.kicker} title={product.title} />
          <p className={`lead ${s.body}`}>{product.intro}</p>

          <div className={s.menu}>
            <h3 className={s.menuLabel}>{product.menuLabel}</h3>
            <ul>
              {product.menu.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="muted">{product.note}</p>

          <div className="cta-row">
            <CtaLink section="prodotto">{product.cta}</CtaLink>
          </div>
        </div>

        {available.length > 0 ? (
          <div className={s.productGallery}>
            {available.map((p) => (
              <figure key={p.key} className="photo-frame">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1240px) 500px, (min-width: 900px) 40vw, 100vw"
                />
              </figure>
            ))}
          </div>
        ) : (
          // Segnaposto dichiarato: non è una fotografia. Il sito non va pubblicato con questo blocco.
          <div className={s.placeholder} data-placeholder="foto-prodotto">
            <p>{product.placeholder}</p>
          </div>
        )}
      </div>
    </section>
  );
}
