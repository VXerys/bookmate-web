// Order follows docs/product/art-direction.md ("Urutan halaman /"). Ids double as section anchors (#id), so they stay
// stable once sections ship; labels feed the header indicator and the slice transition.
export type Chapter = {
  id: string;
  label: string;
  // Present only for chapters that get a link in the header and menu.
  navLabel?: string;
};

export const chapters: readonly Chapter[] = [
  { id: "prolog", label: "Prolog" },
  { id: "manifesto", label: "Manifesto" },
  { id: "buka", label: "Buka aplikasinya" },
  { id: "bab", label: "Bab 01 sampai 05", navLabel: "Fitur" },
  { id: "streak", label: "Api streak", navLabel: "Streak" },
  { id: "kartu", label: "Kartu pembaca", navLabel: "Lencana" },
  { id: "diskusi", label: "Ruang diskusi", navLabel: "Komunitas" },
  { id: "mulai", label: "Cara mulai" },
  { id: "faq", label: "Pertanyaan", navLabel: "FAQ" },
  { id: "epilog", label: "Epilog" },
];

export const navChapters = chapters.filter((chapter): chapter is Chapter & { navLabel: string } => Boolean(chapter.navLabel));

// "01".."10", the number printed beside a label in the indicator and slice transition.
export function chapterNumber(id: string): string {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  if (index === -1) throw new Error(`Unknown chapter "${id}"`);
  return String(index + 1).padStart(2, "0");
}
