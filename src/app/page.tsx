import { Ambient } from "@/components/motion/ambient";
import { Aplikasi } from "@/components/sections/aplikasi";
import { Buku } from "@/components/sections/buku";
import { Epilog } from "@/components/sections/epilog";
import { Faq } from "@/components/sections/faq";
import { Fitur } from "@/components/sections/fitur";
import { Kenapa } from "@/components/sections/kenapa";
import { Komunitas } from "@/components/sections/komunitas";
import { Lencana } from "@/components/sections/lencana";
import { Pinjam } from "@/components/sections/pinjam";
import { Pita } from "@/components/sections/pita";
import { Prolog } from "@/components/sections/prolog";
import { mobileApplicationJsonLd } from "@/lib/structured-data";

// Section order follows the F-014 story (find, borrow, read, talk, celebrate, start) and src/content/navigation.ts.
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
        <Pinjam />
        <Aplikasi />
        <Fitur />
        <Kenapa />
        <Komunitas />
        <Pita />
        <Lencana />
        <Faq />
      </div>
      <Epilog />
      {/* Mounted last so its triggers are created after the pinned scenes and measure the pin spacers. */}
      <Ambient />
    </>
  );
}
