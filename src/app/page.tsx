import { Buka } from "@/components/sections/buka";
import { Buku } from "@/components/sections/buku";
import { Daftar } from "@/components/sections/daftar";
import { Epilog } from "@/components/sections/epilog";
import { Faq } from "@/components/sections/faq";
import { Fitur } from "@/components/sections/fitur";
import { Hari } from "@/components/sections/hari";
import { Manfaat } from "@/components/sections/manfaat";
import { Prolog } from "@/components/sections/prolog";
import { Rak } from "@/components/sections/rak";
import { mobileApplicationJsonLd } from "@/lib/structured-data";

// Section order follows docs/product/art-direction.md and src/content/navigation.ts.
export default function Home() {
  return (
    <>
      {/* JSON-LD is data, not executable script, so it is safe to render on the server (F-008 AC-003). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileApplicationJsonLd()) }} />
      {/* White backs every shaped section so their rounded corners never show the sticky footer; only the epilog's
          corners do, which is the footer reveal (F-013). */}
      <div className="bg-white">
        <Prolog />
        <Buku />
        <Fitur />
        <Hari />
        <Buka />
        <Daftar />
        <Manfaat />
        <Rak />
        <Faq />
      </div>
      <Epilog />
    </>
  );
}
