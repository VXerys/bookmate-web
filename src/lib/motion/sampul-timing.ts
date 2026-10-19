// AC-002: the cover starts opening between 2.0 and 4.5 s after navigation start. Before it opens, the counter finishes
// and the title leaves, which takes SAMPUL_LEAD_MS, so the wait for "page settled" ends that much earlier.
export const SAMPUL_OPEN_MIN_MS = 2000;
export const SAMPUL_OPEN_MAX_MS = 4500;
export const SAMPUL_LEAD_MS = 800;
// completeIntro() runs this long after the cover starts opening, so the hero reveal plays as the halves part.
export const SAMPUL_INTRO_AFTER_OPEN_MS = 300;
// Only reached when the GSAP ticker stalls (hidden tab, EC-002); a normal run has finished well before it.
export const SAMPUL_SAFETY_MS = SAMPUL_OPEN_MAX_MS + 2500;

// A reload in the same tab plays a short replay: the cover opens about a second in, so it is felt, not waited for.
export const SAMPUL_REPLAY_OPEN_MIN_MS = 1000;
export const SAMPUL_REPLAY_OPEN_MAX_MS = 2500;

// Waits measured from now, given how long the page has been alive (performance.now()).
export function settleWaits(elapsedMs: number, replay = false) {
  const [open, close] = replay ? [SAMPUL_REPLAY_OPEN_MIN_MS, SAMPUL_REPLAY_OPEN_MAX_MS] : [SAMPUL_OPEN_MIN_MS, SAMPUL_OPEN_MAX_MS];
  return {
    min: Math.max(0, open - SAMPUL_LEAD_MS - elapsedMs),
    max: Math.max(0, close - SAMPUL_LEAD_MS - elapsedMs),
  };
}
