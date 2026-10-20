// Inlined in <head> so it runs before first paint. It marks JavaScript as present (entrance styles hide content only
// under html.js), picks which sampul plays before paint: the full one on the first load in a tab, a short replay on
// every reload after that (owner, F-014: every load and reload opens with the animation; this replaces F-002 AC-003's
// skip), stops the browser restoring a mid-page scroll under the intro, and removes html.js again when
// the intro has not reported "done" within the timeout, so a failed script never leaves content hidden.
export const BOOT_FALLBACK_MS = 8000;

// Written by the sampul once it has played; sessionStorage keeps it per tab, so a new tab sees the full sampul again.
export const SAMPUL_SESSION_KEY = "bm:sampul";

// sessionStorage access can throw (blocked storage, strict private modes), which must never stop the boot (EC-004).
export const bootScript = `(function(){var root=document.documentElement;root.classList.add('js');var seen=false;try{seen=sessionStorage.getItem('${SAMPUL_SESSION_KEY}')==='1'}catch(e){}root.dataset.sampul=seen?'replay':'play';if('scrollRestoration' in history){history.scrollRestoration='manual'}setTimeout(function(){if(root.dataset.intro!=='done'){root.classList.remove('js')}},${BOOT_FALLBACK_MS})})();`;
