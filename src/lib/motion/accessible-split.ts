// aria-label on <p>, <div>, or <span> is ignored by several screen readers, so text that SplitText breaks into
// fragments gets a visually hidden copy and the fragments are hidden from assistive technology. Created only when JS
// splits, so server HTML carries the text once. Returns a function that undoes both changes.
export function addScreenReaderCopy(target: HTMLElement): () => void {
  const copy = document.createElement("span");
  copy.className = "sr-only";
  copy.textContent = target.textContent;
  target.before(copy);
  target.setAttribute("aria-hidden", "true");
  return () => {
    copy.remove();
    target.removeAttribute("aria-hidden");
  };
}
