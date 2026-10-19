import { Pattern, type BookPattern, type BookTone } from "@/components/art/books";

type TypoCoverProps = {
  title: string;
  author: string;
  tone: BookTone;
  pattern: BookPattern;
  id: string;
};

// A typographic cover drawn for the site: the title and author set in Rubik over one of the abstract patterns. It
// stands in for publisher artwork, which the site never uses (rules.md), while still showing which book it is.
export function TypoCover({ title, author, tone, pattern, id }: TypoCoverProps) {
  const clip = `typo-${id}`;
  return (
    <div className="relative aspect-[240/370] overflow-hidden rounded-xl text-ink" style={{ background: `var(--color-${tone})` }} aria-hidden="true">
      <svg viewBox="0 0 120 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-30">
        <defs>
          <clipPath id={clip}>
            <rect width="120" height="170" />
          </clipPath>
        </defs>
        <Pattern pattern={pattern} color="var(--color-white)" id={clip} />
      </svg>
      {/* The hinge of a hardcover, so the flat card still reads as a book. */}
      <span className="absolute inset-y-0 left-0 w-[7%] bg-ink/15" />
      <div className="relative flex h-full flex-col justify-between gap-3 py-5 pr-4 pl-[13%]">
        <span className="font-display text-[clamp(1.25rem,1.6vw,1.6rem)] leading-[0.95] font-extrabold tracking-tight [overflow-wrap:anywhere]">{title}</span>
        <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase">{author}</span>
      </div>
    </div>
  );
}
