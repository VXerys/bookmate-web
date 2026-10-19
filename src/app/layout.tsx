import type { Metadata, Viewport } from "next";
import { Caveat, Plus_Jakarta_Sans, Rubik } from "next/font/google";

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

// Rubik's heavy, softly rounded grotesk stands in for the reference's licensed display face (F-013 Q2).
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

// Body text from an Indonesian foundry (Tokotype).
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Margin notes only, never body text, so it skips the preload request.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
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
    <html lang="id" className={`${rubik.variable} ${jakarta.variable} ${caveat.variable}`} suppressHydrationWarning>
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
        <div className="relative z-10">
          <main id="konten" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
