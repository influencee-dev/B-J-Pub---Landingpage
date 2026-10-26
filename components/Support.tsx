import { support } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function Support() {
  return (
    <section id="supporto" className="section section-white" aria-labelledby="supporto-title">
      <div className="container">
        <SectionHeading id="supporto-title" kicker={support.kicker} title={support.title} className={s.headNarrow} />
        <dl className={s.support}>
          {support.items.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
        <p className={s.note}>{support.note}</p>
      </div>
    </section>
  );
}
