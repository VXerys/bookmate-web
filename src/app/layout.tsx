import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Plus_Jakarta_Sans } from "next/font/google";

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

// Bricolage Grotesque (OFL, Google Fonts) at its heaviest stands in for the reference's licensed display face: a tight,
// characterful grotesk the owner picked over Rubik (F-014). Variable, with the optical-size axis so big headings sharpen.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
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

// Absolute share URLs need the production origin. Until the domain is decided (A-004) it comes from NEXT_PUBLIC_SITE_URL,
// then from Vercel's own production URL; without either, link previews pointed their image at localhost.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : undefined);

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: site.shareTitle,
  description: site.shareDescription,
  applicationName: site.name,
  authors: [{ name: site.publisher }],
  publisher: site.publisher,
  keywords: ["BookMate", "klub baca", "komunitas baca", "pinjam buku", "aplikasi baca buku", "streak membaca", "bedah buku", "Android"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title: site.shareTitle,
    description: site.shareDescription,
  },
  twitter: { card: "summary_large_image", title: site.shareTitle, description: site.shareDescription },
  appLinks: { android: { package: site.app.packageId, url: site.app.playStoreUrl } },
};

export const viewport: Viewport = {
  themeColor: palette.blue,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script adds html.js and data-sampul before hydration, so React must not flag the attribute difference.
    <html lang="id" className={`${bricolage.variable} ${jakarta.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <SmoothScroll />
        <Sampul />
        <SliceTransition />
        <Cursor />
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
