import { Fragment } from "react";
import { scenario } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

/** Evidenzia nel testo approvato le ipotesi del modello, senza aggiungere parole. */
function highlight(text: string, parts: ReadonlyArray<string>) {
  const pattern = new RegExp(`(${parts.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((chunk, i) =>
    parts.includes(chunk) ? (
      <strong key={i} className={s.hypothesis}>
        {chunk}
      </strong>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  );
}

/** Ipotesi del modello economico: niente grafici né calcolatori di ROI. */
export function Scenario() {
  return (
    <section id="modello-economico" className="section section-dark on-dark" aria-labelledby="modello-title">
      <div className="container">
        <SectionHeading id="modello-title" kicker={scenario.kicker} title={scenario.title} className={s.headNarrow} />

        <div className={s.scenarioText}>
          {scenario.paragraphs.map((p, i) => (
            <p key={i} className={s.scenarioLead}>
              {highlight(p, scenario.highlights)}
            </p>
          ))}
          <p className={s.disclaimer} role="note">
            {scenario.disclaimer}
          </p>
        </div>

        <div className="cta-row">
          <CtaLink section="modello-economico">{scenario.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
