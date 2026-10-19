import { site } from "../content/site.ts";

// schema.org MobileApplication for search engines. Price 0 is backed by the app's own marketing copy ("100% gratis",
// marketing_assets/threads/post_01_update_v1.1.0/content.md in the app repo); no rating or download count is claimed.
export function mobileApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.name,
    description: site.description,
    operatingSystem: "ANDROID",
    applicationCategory: "BookApplication",
    softwareVersion: site.app.version,
    installUrl: site.app.playStoreUrl,
    inLanguage: "id",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
    publisher: { "@type": "Organization", name: site.publisher },
  };
}
