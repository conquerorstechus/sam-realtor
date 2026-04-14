import { site } from "@/lib/seo/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    url: site.url,
    areaServed: "Tampa Bay, FL",
  };
}
