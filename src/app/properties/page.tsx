import type { Metadata } from "next";
import { site } from "@/lib/seo/site";

import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { PropertyTypes } from "@/components/properties/PropertyTypes";
import { PropertyMapSection } from "@/components/properties/property-map/PropertyMapSection";

export const metadata: Metadata = {
  title: "Properties | Tampa Bay Luxury Listings",
  description: `Urban condos, townhomes, and luxury homes across Tampa Bay — curated by ${site.name}. Search by type, price, and neighborhood.`,
  openGraph: {
    title: `Properties | ${site.name}`,
    description: "Find your center in Tampa — downtown high-rises, townhomes, and bay-area living.",
    url: `${site.url}/properties`,
  },
};

export default function PropertiesPage() {
  return (
    <main className="bg-bg">
      {/* Hero + urban art + embedded search */}
      <PropertiesHero />

      {/* Property types grid */}
      <PropertyTypes />

      {/* Map + curated search browse */}
      <PropertyMapSection />
    </main>
  );
}
