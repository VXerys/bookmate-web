// Order follows the F-014 story (docs/specs/F-014-cerita-aardvark/requirements.md FR-002). Ids double as section
// anchors (#id), so they stay stable once sections ship; labels feed the header indicator and the slice transition.
export type Chapter = {
  id: string;
  label: string;
  // Present only for chapters that get a link in the header and menu.
  navLabel?: string;
};

export const chapters: readonly Chapter[] = [
  { id: "prolog", label: "Prolog" },
  { id: "buku", label: "Rak teman", navLabel: "Buku" },
  { id: "pinjam", label: "Cara pinjam", navLabel: "Cara pinjam" },
  { id: "aplikasi", label: "Di sakumu" },
  { id: "fitur", label: "Pilih fitur" },
  { id: "kenapa", label: "Kenapa BookMate" },
  { id: "komunitas", label: "Komunitas", navLabel: "Komunitas" },
  { id: "lencana", label: "Rak lencana", navLabel: "Lencana" },
  { id: "indeks", label: "Pertanyaan", navLabel: "FAQ" },
  { id: "epilog", label: "Epilog" },
];

export const navChapters = chapters.filter((chapter): chapter is Chapter & { navLabel: string } => Boolean(chapter.navLabel));

// "01".."10", the number printed beside a label in the indicator and slice transition.
export function chapterNumber(id: string): string {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  if (index === -1) throw new Error(`Unknown chapter "${id}"`);
  return String(index + 1).padStart(2, "0");
}
