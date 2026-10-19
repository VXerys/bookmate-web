import { Buka } from "@/components/sections/buka";
import { Epilog } from "@/components/sections/epilog";
import { Faq } from "@/components/sections/faq";
import { Hari } from "@/components/sections/hari";
import { Manifesto } from "@/components/sections/manifesto";
import { Mulai } from "@/components/sections/mulai";
import { Papan } from "@/components/sections/papan";
import { Prolog } from "@/components/sections/prolog";
import { Rak } from "@/components/sections/rak";
import { mobileApplicationJsonLd } from "@/lib/structured-data";

// Section order follows docs/product/art-direction.md and src/content/navigation.ts.
export default function Home() {
  return (
    <>
      {/* JSON-LD is data, not executable script, so it is safe to render on the server (F-008 AC-003). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileApplicationJsonLd()) }} />
      <Prolog />
      <Manifesto />
      <Buka />
      <Hari />
      <Rak />
      <Papan />
      <Mulai />
      <Faq />
      <Epilog />
    </>
  );
}
