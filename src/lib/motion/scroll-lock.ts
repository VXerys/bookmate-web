export type ScrollLock = {
  lock: (owner: string) => void;
  unlock: (owner: string) => void;
  isLocked: () => boolean;
  owners: () => string[];
  subscribe: (listener: (locked: boolean) => void) => () => void;
};

// Sampul, menu, and slice transition can overlap (F-002 EC-001). A single boolean let whichever finished first release
// a lock another overlay still needed, so the page stays locked until the last owner lets go.
export function createScrollLock(): ScrollLock {
  const holders = new Set<string>();
  const listeners = new Set<(locked: boolean) => void>();

  // Listeners hear only real transitions, so Lenis is not stopped or started again for every extra owner.
  const change = (wasLocked: boolean) => {
    const locked = holders.size > 0;
    if (locked !== wasLocked) listeners.forEach((listener) => listener(locked));
  };

  return {
    lock(owner) {
      const wasLocked = holders.size > 0;
      holders.add(owner);
      change(wasLocked);
    },
    unlock(owner) {
      const wasLocked = holders.size > 0;
      holders.delete(owner);
      change(wasLocked);
    },
    isLocked: () => holders.size > 0,
    owners: () => [...holders],
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
