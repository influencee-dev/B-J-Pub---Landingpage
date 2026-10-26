import { process as steps } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function Process() {
  return (
    <section id="percorso" className="section section-white" aria-labelledby="percorso-title">
      <div className="container">
        <SectionHeading id="percorso-title" kicker={steps.kicker} title={steps.title} className={s.headNarrow} />
        <ol className={s.steps}>
          {steps.steps.map((step, i) => (
            <li key={step}>
              <span className={s.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <div className="cta-row">
          <CtaLink section="percorso">{steps.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
