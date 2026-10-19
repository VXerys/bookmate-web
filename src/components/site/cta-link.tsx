import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  cursorLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const PAD = { sm: "px-4 text-sm", md: "px-6 text-base", lg: "px-8 text-lg" } as const;

// The download pill: an ember label with an ink arrow box, outlined and offset-shadowed like a sticker. Pressing it
// sinks the shadow, so the button feels physical without any script.
export function CtaLink({ href, children, cursorLabel, size = "md", className }: CtaLinkProps) {
  return (
    <a
      href={href}
      data-cursor-label={cursorLabel}
      className={`group inline-flex min-h-11 items-stretch overflow-hidden rounded-full border-[2.5px] border-ink bg-ember font-semibold text-ink shadow-[4px_4px_0_var(--color-ink)] transition-[translate,box-shadow] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--color-ink)] ${className ?? ""}`}
    >
      <span className={`flex items-center py-2.5 ${PAD[size]}`}>{children}</span>
      <span className="flex items-center border-l-[2.5px] border-ink bg-ink px-3.5 text-highlight" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-12">
          <path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
