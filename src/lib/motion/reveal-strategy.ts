// How a Reveal keeps one readable copy for assistive technology.
// "label": SplitText puts aria-label on the element; screen readers honour it on headings.
// "duplicate": aria-label on <p>, <div>, or <span> is ignored by several screen readers, so a visually hidden copy
// carries the text and the split copy is aria-hidden. The copy is created at split time, never in server HTML.
export type AccessibleCopy = "label" | "duplicate";

const HEADING = /^h[1-6]$/i;

export function accessibleCopyFor(tag: string): AccessibleCopy {
  return HEADING.test(tag) ? "label" : "duplicate";
}

// Splitting links or controls breaks their names and focus outlines, so such content only fades in.
export const INTERACTIVE_SELECTOR = "a, button, input, select, textarea, [tabindex]";
