type Props = {
  id: string;
  /** Occhiello: solo se presente nel testo approvato. */
  kicker?: string;
  title: string;
  className?: string;
};

/** Occhiello facoltativo + titolo h2. L'id del titolo è usato da aria-labelledby della sezione. */
export function SectionHeading({ id, kicker, title, className }: Props) {
  return (
    <div className={className}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 id={id}>{title}</h2>
    </div>
  );
}
