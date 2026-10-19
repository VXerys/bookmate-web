import { BabTrack } from "@/components/sections/bab-track";
import { Buka } from "@/components/sections/buka";
import { Diskusi } from "@/components/sections/diskusi";
import { Epilog } from "@/components/sections/epilog";
import { Faq } from "@/components/sections/faq";
import { Kartu } from "@/components/sections/kartu";
import { Manifesto } from "@/components/sections/manifesto";
import { Mulai } from "@/components/sections/mulai";
import { Prolog } from "@/components/sections/prolog";
import { Streak } from "@/components/sections/streak";

// Section order follows docs/product/art-direction.md and src/content/navigation.ts.
export default function Home() {
  return (
    <>
      <Prolog />
      <Manifesto />
      <Buka />
      <BabTrack />
      <Streak />
      <Kartu />
      <Diskusi />
      <Mulai />
      <Faq />
      <Epilog />
    </>
  );
}
