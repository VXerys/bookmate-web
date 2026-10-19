import { BabTrack } from "@/components/sections/bab-track";
import { Buka } from "@/components/sections/buka";
import { Manifesto } from "@/components/sections/manifesto";
import { Prolog } from "@/components/sections/prolog";
import { chapterNumber, chapters, type Chapter } from "@/content/navigation";

// Chapters not built yet keep an anchored stub so the shell's navigation still has every target (F-002).
// Each stub is replaced by its section in F-006 and F-007.
function ChapterStub({ chapter }: { chapter: Chapter }) {
  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="flex min-h-[80svh] flex-col justify-end gap-4 border-t border-ink/10 px-4 py-16 md:px-10"
    >
      <p className="label text-slate">Halaman {chapterNumber(chapter.id)}</p>
      <h2 className="statement">{chapter.label}</h2>
    </section>
  );
}

const BUILT = new Set(["prolog", "manifesto", "buka", "bab"]);

export default function Home() {
  return (
    <>
      <Prolog />
      <Manifesto />
      <Buka />
      <BabTrack />
      {chapters
        .filter((chapter) => !BUILT.has(chapter.id))
        .map((chapter) => (
          <ChapterStub key={chapter.id} chapter={chapter} />
        ))}
    </>
  );
}
