import { Reveal } from "@/components/motion/reveal";
import { chapterNumber, chapters, type Chapter } from "@/content/navigation";
import { site } from "@/content/site";

// Foundation check page for F-001 and F-002: tokens, fonts, Reveal, and one anchor per chapter so the shell's
// navigation can be exercised. Replaced by the real sections from F-003 onward.
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

export default function Home() {
  const babIndex = chapters.findIndex((chapter) => chapter.id === "bab");
  const before = chapters.slice(1, babIndex);
  const after = chapters.slice(babIndex + 1);

  return (
    <>
      <section
        id="prolog"
        data-chapter="prolog"
        className="flex min-h-svh flex-col justify-between gap-12 px-4 pt-24 pb-12 md:px-10"
      >
        <p className="label text-slate">Prolog — halaman {chapterNumber("prolog")}</p>
        <div className="flex flex-col gap-8">
          <Reveal as="h1" className="display" mode="words">
            Satu halaman lagi, <em>bareng teman.</em>
          </Reveal>
          <Reveal className="statement max-w-4xl" mode="lines" delay={0.2}>
            {site.tagline}
          </Reveal>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            className="rounded-full bg-ember px-6 py-3 font-medium text-ink transition-transform duration-300 ease-expo hover:-translate-y-0.5"
            href={site.app.playStoreUrl}
          >
            Unduh di Google Play
          </a>
          <p className="max-w-md text-slate">{site.description}</p>
        </div>
      </section>

      {before.map((chapter) => (
        <ChapterStub key={chapter.id} chapter={chapter} />
      ))}

      <section id="bab" data-chapter="bab" className="grid gap-6 bg-ink px-4 py-24 text-paper md:grid-cols-3 md:px-10">
        <h2 className="label text-peach">Bab 01 — Catat bacaan</h2>
        <Reveal className="statement md:col-span-2" mode="lines">
          Catat halaman, bab, atau persen. Buku baru dihitung <em className="text-ember">selesai</em> saat kamu yang
          bilang selesai.
        </Reveal>
      </section>

      {after.map((chapter) => (
        <ChapterStub key={chapter.id} chapter={chapter} />
      ))}
    </>
  );
}
