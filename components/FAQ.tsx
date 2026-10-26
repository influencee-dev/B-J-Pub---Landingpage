import { faq } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

/** Accordion nativo details/summary: accessibile da tastiera e screen reader senza JavaScript. */
export function FAQ() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${s.faqGrid}`}>
        <SectionHeading id="faq-title" title={faq.title} />
        <div className={s.faq}>
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                <h3>{item.q}</h3>
                <span className={s.faqIcon} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
