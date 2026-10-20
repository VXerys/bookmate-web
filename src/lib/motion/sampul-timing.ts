// The logo holds the centre while the page loads underneath (owner, F-014: two to three seconds), so the exit runs
// once the main thread is quiet instead of stuttering through hydration and image decoding. The exit starts between
// SAMPUL_OPEN_MIN_MS and SAMPUL_OPEN_MAX_MS after navigation start. The exit begins the moment the page has settled.
export const SAMPUL_OPEN_MIN_MS = 2800;
export const SAMPUL_OPEN_MAX_MS = 5000;
// completeIntro() runs this long after the cover starts opening, so the hero reveal plays as the halves part.
export const SAMPUL_INTRO_AFTER_OPEN_MS = 300;
// Only reached when the GSAP ticker stalls (hidden tab, EC-002); a normal run has finished well before it.
export const SAMPUL_SAFETY_MS = SAMPUL_OPEN_MAX_MS + 2500;

// A reload in the same tab holds the logo a little shorter.
export const SAMPUL_REPLAY_OPEN_MIN_MS = 2200;
export const SAMPUL_REPLAY_OPEN_MAX_MS = 4000;

// Waits measured from now, given how long the page has been alive (performance.now()).
export function settleWaits(elapsedMs: number, replay = false) {
  const [open, close] = replay ? [SAMPUL_REPLAY_OPEN_MIN_MS, SAMPUL_REPLAY_OPEN_MAX_MS] : [SAMPUL_OPEN_MIN_MS, SAMPUL_OPEN_MAX_MS];
  return {
    min: Math.max(0, open - elapsedMs),
    max: Math.max(0, close - elapsedMs),
  };
}
