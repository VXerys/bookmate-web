export type LinkClick = {
  href: string | null;
  button: number;
  modified: boolean;
  sliceOff: boolean;
  defaultPrevented: boolean;
};

// Returns the section id a click should travel to with the slice transition, or null to leave the click to the
// browser: other pages, new-tab clicks (modifier keys, middle button), opted-out links such as the skip link, and
// bare "#" links all keep native behaviour.
export function sliceTargetId(click: LinkClick): string | null {
  if (click.defaultPrevented || click.button !== 0 || click.modified || click.sliceOff) return null;
  if (!click.href?.startsWith("#") || click.href.length < 2) return null;
  try {
    return decodeURIComponent(click.href.slice(1));
  } catch {
    return null;
  }
}
