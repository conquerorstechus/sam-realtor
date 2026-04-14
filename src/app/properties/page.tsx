import type { Metadata } from "next";
import { PropertiesExplorer } from "@/components/properties/PropertiesExplorer";
import { getProperties } from "@/lib/api/properties";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Properties",
  description: `Browse featured Tampa Bay listings and inventory highlights from ${site.name}.`,
  openGraph: {
    title: `Properties | ${site.name}`,
    description: "Browse listings with fast filtering - details are built for decision-making.",
    url: `${site.url}/properties`,
  },
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  return <PropertiesExplorer properties={properties} />;
}
