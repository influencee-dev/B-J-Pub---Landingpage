import { benefits } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function Benefits() {
  return (
    <section id="vantaggi" className="section" aria-labelledby="vantaggi-title">
      <div className="container">
        <SectionHeading id="vantaggi-title" kicker={benefits.kicker} title={benefits.title} className={s.headNarrow} />
        <ol className={s.benefits}>
          {benefits.items.map((b) => (
            <li key={b.title}>
              <span className={s.index} aria-hidden="true" />
              <h3 className={s.label}>{b.title}</h3>
              <p>{b.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
