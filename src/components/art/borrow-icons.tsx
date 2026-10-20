export type BorrowIconKind = "cari" | "pinjam" | "chat" | "ulas";

const INK = "var(--color-navy)";
const r2 = (value: number) => Math.round(value * 100) / 100;

function star(cx: number, cy: number, outer: number) {
  const inner = outer * 0.45;
  return Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 ? inner : outer;
    const angle = (Math.PI * i) / 5 - Math.PI / 2;
    return `${r2(cx + radius * Math.cos(angle))},${r2(cy + radius * Math.sin(angle))}`;
  }).join(" ");
}

// Interface icons for the four borrow steps (F-014, owner request): one line weight and one palette (navy outline,
// blue and sky fills, a single yellow accent), drawn as simple UI pictograms rather than illustrations. Each part that
// moves carries a data-icon-* hook; the borrow section loops them only while on screen and leaves this resting state
// for reduced motion and no-JS visitors.
export function BorrowIcon({ kind, className }: { kind: BorrowIconKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true" data-icon={kind}>
      {kind === "cari" && (
        <>
          <rect x="18" y="122" width="164" height="9" rx="4.5" fill={INK} />
          <rect x="30" y="54" width="24" height="68" rx="4" fill="var(--color-blue)" stroke={INK} strokeWidth="4" />
          <rect x="58" y="68" width="20" height="54" rx="4" fill="var(--color-white)" stroke={INK} strokeWidth="4" />
          <g data-icon-lift>
            <rect x="82" y="46" width="26" height="76" rx="4" fill="var(--color-highlight)" stroke={INK} strokeWidth="4" />
            <path d="M88 62h14M88 70h10" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <rect x="112" y="60" width="22" height="62" rx="4" fill="var(--color-sky)" stroke={INK} strokeWidth="4" />
          <rect x="138" y="50" width="28" height="72" rx="4" fill="var(--color-blue)" stroke={INK} strokeWidth="4" />
          <g data-icon-lens transform="translate(64 56)">
            <circle r="24" fill="var(--color-white)" fillOpacity="0.55" stroke={INK} strokeWidth="6" />
            <path d="M17 17 34 34" stroke={INK} strokeWidth="9" strokeLinecap="round" />
            <path d="M-11 -8a13 13 0 0 1 10 -8" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        </>
      )}

      {kind === "pinjam" && (
        <>
          <rect x="60" y="10" width="80" height="140" rx="16" fill="var(--color-white)" stroke={INK} strokeWidth="5" />
          <rect x="88" y="17" width="24" height="6" rx="3" fill={INK} />
          <rect x="76" y="32" width="48" height="58" rx="5" fill="var(--color-blue)" stroke={INK} strokeWidth="4" />
          <path d="M84 46h22M84 54h16" stroke="var(--color-white)" strokeWidth="4" strokeLinecap="round" />
          <g data-icon-button>
            <rect x="72" y="104" width="56" height="22" rx="11" fill="var(--color-highlight)" stroke={INK} strokeWidth="4" />
            <path d="M88 115h24" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          </g>
          <circle data-icon-ripple cx="100" cy="115" r="12" fill="none" stroke="var(--color-blue)" strokeWidth="4" opacity="0" />
          <g data-icon-check transform="translate(146 34)">
            <circle r="17" fill={INK} />
            <path d="M-7 0l5 5 9-10" stroke="var(--color-highlight)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </>
      )}

      {kind === "chat" && (
        <>
          <g data-icon-bubble="a">
            <path d="M40 22h82a16 16 0 0 1 16 16v26a16 16 0 0 1-16 16H64l-18 14v-14h-6a16 16 0 0 1-16-16V38a16 16 0 0 1 16-16Z" fill="var(--color-white)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <circle data-icon-dot cx="60" cy="51" r="6" fill={INK} />
            <circle data-icon-dot cx="81" cy="51" r="6" fill={INK} />
            <circle data-icon-dot cx="102" cy="51" r="6" fill={INK} />
          </g>
          <g data-icon-bubble="b">
            <path d="M92 84h68a16 16 0 0 1 16 16v14a16 16 0 0 1-16 16h-4v14l-18-14H92a16 16 0 0 1-16-16v-14a16 16 0 0 1 16-16Z" fill="var(--color-blue)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <path d="M94 101h48M94 113h30" stroke="var(--color-white)" strokeWidth="5" strokeLinecap="round" />
          </g>
        </>
      )}

      {kind === "ulas" && (
        <>
          <g data-icon-loop style={{ transformOrigin: "100px 64px", transformBox: "view-box" }}>
            <path d="M58 64a42 42 0 0 1 72-30" fill="none" stroke="var(--color-blue)" strokeWidth="7" strokeLinecap="round" />
            <path d="M142 64a42 42 0 0 1-72 30" fill="none" stroke="var(--color-blue)" strokeWidth="7" strokeLinecap="round" />
            <path d="M120 24l12 10-14 6" fill="none" stroke="var(--color-blue)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M80 104l-12-10 14-6" fill="none" stroke="var(--color-blue)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <rect x="82" y="40" width="36" height="48" rx="4" fill="var(--color-highlight)" stroke={INK} strokeWidth="4" />
          <path d="M90 40v48" stroke={INK} strokeWidth="4" />
          {[40, 70, 100, 130, 160].map((cx) => (
            <polygon key={cx} data-icon-star points={star(cx, 134, 13)} fill="var(--color-highlight)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          ))}
        </>
      )}
    </svg>
  );
}
