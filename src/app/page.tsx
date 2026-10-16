import { site } from "@/content/site";

// Foundation check page for F-001: exercises tokens, the three font families, and allowed contrast pairs.
// Replaced by the real sections from F-003 onward.
export default function Home() {
  return (
    <main>
      <section className="flex min-h-svh flex-col justify-between gap-12 px-4 pt-8 pb-12 md:px-10">
        <p className="label text-slate">Prolog — halaman 001</p>
        <div className="flex flex-col gap-8">
          <h1 className="display">
            Satu halaman lagi, <em>bareng teman.</em>
          </h1>
          <p className="statement max-w-4xl">{site.tagline}</p>
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
      <section className="grid gap-6 bg-ink px-4 py-24 text-paper md:grid-cols-3 md:px-10">
        <p className="label text-peach">Bab 01 — Catat bacaan</p>
        <p className="statement md:col-span-2">
          Catat halaman, bab, atau persen. Buku baru dihitung <em className="text-ember">selesai</em> saat kamu yang
          bilang selesai.
        </p>
      </section>
    </main>
  );
}
