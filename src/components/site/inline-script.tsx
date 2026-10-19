"use client";

// Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md: the server emits an
// executable script that runs during HTML parsing, while the client renders it as inert text/plain, which stops React
// from warning about script tags it would never execute. suppressHydrationWarning accepts the type difference.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
