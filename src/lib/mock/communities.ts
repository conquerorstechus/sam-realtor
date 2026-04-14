import type { Community } from "@/lib/types";

export const mockCommunities: Community[] = [
  {
    slug: "south-tampa",
    name: "South Tampa",
    region: "Tampa Bay",
    headline: "Waterfront proximity + boutique dining",
    description:
      "South Tampa blends walkable neighborhoods with coastal access - ideal for buyers who want lifestyle-first living without sacrificing commute convenience.",
    avgPriceRangeLabel: "$750k–$2.5M+",
    walkScore: 78,
    vibeTags: ["Waterfront", "Dining", "A-rated schools nearby"],
    imageUrl:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80",
    listingCountLabel: "12 spotlight homes",
  },
  {
    slug: "downtown-tampa",
    name: "Downtown Tampa",
    region: "Urban Core",
    headline: "Skyline energy, walkable everything",
    description:
      "High-rise living, events, and a fast-moving market - perfect for professionals and investors who want density, amenities, and momentum.",
    avgPriceRangeLabel: "$450k–$1.2M+",
    walkScore: 92,
    vibeTags: ["Nightlife", "Transit", "Waterfront Riverwalk"],
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
    listingCountLabel: "8 spotlight homes",
  },
  {
    slug: "westchase",
    name: "Westchase",
    region: "Northwest Tampa",
    headline: "Planned community polish",
    description:
      "Family-forward streets, strong schools, and resort-style community amenities - an easy \"yes\" for relocation buyers.",
    avgPriceRangeLabel: "$550k–$950k",
    walkScore: 44,
    vibeTags: ["Family", "Parks", "HOA amenities"],
    imageUrl:
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1600&q=80",
    listingCountLabel: "9 spotlight homes",
  },
  {
    slug: "seminole-heights",
    name: "Seminole Heights",
    region: "Historic Tampa",
    headline: "Creative culture + bungalow charm",
    description:
      "Trend-forward buyers love the bungalow stock, local food scene, and tight-knit neighborhood feel - without the cookie-cutter vibe.",
    avgPriceRangeLabel: "$400k–$850k",
    walkScore: 71,
    vibeTags: ["Food scene", "Bungalows", "Local makers"],
    imageUrl:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80",
    listingCountLabel: "7 spotlight homes",
  },
];
