/**
 * Spirale decorativa ripresa dal logo (richiama l'arrotolata). Solo grafica: nascosta agli screen reader.
 */
function spiralPath(turns = 3.25, steps = 260) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const r = 4 + (t / (turns * Math.PI * 2)) * 42;
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)},${(50 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
}

const D = spiralPath();

export function Spiral({ className, stroke = "var(--c-accent)" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={D} fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
