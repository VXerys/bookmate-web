import { shell } from "@/content/shell";

// First focusable element on the page (AC-005). data-slice="off" keeps the slice transition from intercepting it:
// keyboard users skipping the header want focus moved, not a full-screen animation.
export function SkipLink() {
  return (
    <a
      href="#konten"
      data-slice="off"
      // Parked above the viewport rather than sr-only: Tailwind's not-sr-only resets padding, shrinking the target.
      className="fixed top-3 left-3 z-[100] inline-flex min-h-11 -translate-y-24 items-center rounded-full bg-ink px-5 text-paper transition-transform focus:translate-y-0"
    >
      {shell.skipLink}
    </a>
  );
}
