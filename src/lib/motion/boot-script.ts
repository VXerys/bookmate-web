// Inlined in <head> so it runs before first paint. It marks JavaScript as present (entrance styles hide content only
// under html.js), stops the browser restoring a mid-page scroll under the intro, and removes html.js again when the
// intro has not reported "done" within the timeout, so a failed script never leaves content hidden.
export const BOOT_FALLBACK_MS = 6000;

export const bootScript = `(function(){var root=document.documentElement;root.classList.add('js');if('scrollRestoration' in history){history.scrollRestoration='manual'}setTimeout(function(){if(root.dataset.intro!=='done'){root.classList.remove('js')}},${BOOT_FALLBACK_MS})})();`;
