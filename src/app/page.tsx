import { site } from "@/content/site";

export default function Home() {
  return (
    <main className="grid min-h-svh place-content-center gap-6 px-4 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">{site.name}</h1>
      <p className="mx-auto max-w-xl text-lg">{site.tagline}</p>
      <a className="mx-auto underline underline-offset-4" href={site.app.playStoreUrl}>
        Unduh di Google Play
      </a>
    </main>
  );
}
