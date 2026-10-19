export type IntroState = {
  finishIntro: () => void;
  whenIntroDone: (callback: () => void) => () => void;
  isIntroDone: () => boolean;
};

// Sections that mount after the intro finished must run at once instead of waiting for a signal that already fired.
export function createIntroState(): IntroState {
  let done = false;
  const listeners = new Set<() => void>();

  return {
    finishIntro() {
      if (done) return;
      done = true;
      const pending = [...listeners];
      listeners.clear();
      pending.forEach((listener) => listener());
    },
    whenIntroDone(callback) {
      if (done) {
        callback();
        return () => {};
      }
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
    isIntroDone: () => done,
  };
}

export const { finishIntro, whenIntroDone, isIntroDone } = createIntroState();
