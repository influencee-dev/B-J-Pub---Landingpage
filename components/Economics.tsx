import { economics, economicsTable } from "@/lib/content";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";
import s from "./Sections.module.css";

export function Economics() {
  return (
    <section id="investimento" className="section" aria-labelledby="investimento-title">
      <div className={`container ${s.econGrid}`}>
        <div>
          <SectionHeading id="investimento-title" kicker={economics.kicker} title={economics.title} />
          <p className={`lead ${s.body}`}>{economics.intro}</p>
        </div>

        <div>
          <div className={s.tableWrap}>
            <table className={s.table} aria-describedby="nota-investimento">
              <caption>{economics.tableCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">Voce</th>
                  <th scope="col">Valore / condizione</th>
                </tr>
              </thead>
              <tbody>
                {economicsTable.map((row) => (
                  <tr key={row.item}>
                    <th scope="row">{row.item}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p id="nota-investimento" className={s.tableNote}>
            <strong>{economics.noteLabel}:</strong> {economics.note}
          </p>

          <div className="cta-row">
            <CtaLink section="investimento">{economics.cta}</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
