import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";

import { Sampul } from "@/components/motion/sampul";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { InlineScript } from "@/components/site/inline-script";
import { palette } from "@/content/palette";
import { site } from "@/content/site";
import { bootScript } from "@/lib/motion/boot-script";
import "./globals.css";

// The app's own serif; opsz lets large display sizes switch to the tighter optical cut.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Labels only, never above the fold's main text, so it is not worth a preload request.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: `${site.name} | Klub baca komunitas`,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: palette.paper,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script adds html.js and data-sampul before hydration, so React must not flag the attribute difference.
    <html lang="id" className={`${newsreader.variable} ${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <SmoothScroll />
        <Sampul />
        <div className="grain" aria-hidden="true" />
        <main id="konten">{children}</main>
      </body>
    </html>
  );
}
