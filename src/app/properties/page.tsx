import type { Metadata } from "next";
import { getProperties } from "@/lib/api/properties";
import { site } from "@/lib/seo/site";

import { PropertiesHero }  from "@/components/properties/PropertiesHero";
import { PropertyTypes }   from "@/components/properties/PropertyTypes";
import { AboutSection }    from "@/components/properties/AboutSection";
import { ListingsGrid }    from "@/components/properties/ListingsGrid";

export const metadata: Metadata = {
  title: "Properties | Tampa Bay Luxury Listings",
  description: `Browse premium Tampa Bay real estate listings curated by ${site.name}. Filter by type, price, and location.`,
  openGraph: {
    title: `Properties | ${site.name}`,
    description: "Discover luxury homes, condos, and villas across Tampa Bay.",
    url: `${site.url}/properties`,
  },
};

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="bg-bg">
      {/* 1 ─ About / company split */}
      <AboutSection />

      {/* 2 ─ Hero + embedded search panel */}
      <PropertiesHero />

      {/* 3 ─ Property types grid */}
      <PropertyTypes />

      {/* 4 ─ Listings grid */}
      <ListingsGrid properties={properties} />
    </main>
  );
}
