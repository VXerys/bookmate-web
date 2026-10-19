import { screenPending } from "@/content/story";

type PhoneFrameProps = {
  // Which app screen belongs here; shown as a label until the real screenshot exists (A-002).
  screen: string;
  className?: string;
};

// A CSS device frame, not an illustration: the screen slot is where a real screenshot from the production build goes.
export function PhoneFrame({ screen, className }: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[9/19.5] w-full rounded-[2.4rem] border-[6px] border-ink bg-ink shadow-[0_30px_80px_-30px_rgb(3_4_10/0.45)] ${className ?? ""}`}
    >
      <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
      <div className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[1.9rem] bg-peach-pale px-4 text-center text-ink">
        <span className="font-serif text-xl italic">{screen}</span>
        <span className="label text-slate">{screenPending}</span>
      </div>
    </div>
  );
}
