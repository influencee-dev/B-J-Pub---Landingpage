import { idealCandidate } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function IdealCandidate() {
  return (
    <section id="profilo" className="section section-yellow" aria-labelledby="profilo-title">
      <div className={`container ${s.candidate}`}>
        <SectionHeading id="profilo-title" kicker={idealCandidate.kicker} title={idealCandidate.title} />
        <div>
          <p className="lead">{idealCandidate.profile}</p>
          <div className={s.locationBox}>
            <p>{idealCandidate.locations}</p>
            <p className={s.catchment}>{idealCandidate.catchment}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
