import type { StaticImageData } from "next/image";

import beranda from "@/assets/images/screens/beranda.jpg";
import bedahBuku from "@/assets/images/screens/bedah-buku.jpg";
import bukuSaya from "@/assets/images/screens/buku-saya.jpg";
import catatBacaan from "@/assets/images/screens/catat-bacaan.jpg";
import chatPinjam from "@/assets/images/screens/chat-pinjam.jpg";
import komunitas from "@/assets/images/screens/komunitas.jpg";
import onboarding from "@/assets/images/screens/onboarding.jpg";
import onboardingPinjam from "@/assets/images/screens/onboarding-pinjam.jpg";
import type { ScreenId } from "@/content/screens";

// Static imports give next/image the intrinsic size and a blur placeholder; content/ stays free of bundler imports.
export const screenImages: Record<ScreenId, StaticImageData> = {
  onboarding,
  onboardingPinjam,
  bukuSaya,
  beranda,
  catatBacaan,
  bedahBuku,
  komunitas,
  chatPinjam,
};
