import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Inter, JetBrains_Mono, Newsreader } from "next/font/google";

import { Cursor } from "@/components/motion/cursor";
import { Sampul } from "@/components/motion/sampul";
import { SliceTransition } from "@/components/motion/slice-transition";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { InlineScript } from "@/components/site/inline-script";
import { SkipLink } from "@/components/site/skip-link";
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

// Display face for every big heading; opsz and wdth let one file serve both the chunky hero and calmer statements.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

// Margin notes only, never body text, so it skips the preload request.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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

// Absolute share URLs need the production origin; until the domain is decided (A-004) it comes from the environment.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: `${site.name} | Klub baca komunitas`,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: `${site.name} | Klub baca komunitas`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} | Klub baca komunitas`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: palette.paper,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script adds html.js and data-sampul before hydration, so React must not flag the attribute difference.
    <html lang="id" className={`${bricolage.variable} ${newsreader.variable} ${caveat.variable} ${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <SmoothScroll />
        <Sampul />
        <SliceTransition />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        <SkipLink />
        <Header />
        {/* tabIndex -1 lets the skip link and in-page jumps move focus here, not only the scroll position. */}
        {/* The page layer sits above the sticky footer, so scrolling past the last chapter reveals it (F-002 FR-006). */}
        <div className="relative z-10 bg-paper">
          <main id="konten" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
