import type { Metadata, Viewport } from "next";

import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | Klub baca komunitas`,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#fcf9f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
