import type { StaticImageData } from "next/image";

import { coverImages } from "@/components/site/app-images";
import { demoBooks, type DemoBook } from "@/content/app-data";

export type ShelfBook = DemoBook & { cover: StaticImageData };

// The app's demo books joined with their imported covers; throws on an unknown key so a renamed book fails the build.
export const shelfBooks: readonly ShelfBook[] = demoBooks.map((book) => ({ ...book, cover: coverImages[book.key] }));

export function shelfBook(key: string): ShelfBook {
  const book = shelfBooks.find((item) => item.key === key);
  if (!book) throw new Error(`Unknown demo book "${key}"`);
  return book;
}
