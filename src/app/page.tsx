import { CommunitiesPreview } from "@/components/sections/CommunitiesPreview";
import { ContactCta } from "@/components/sections/ContactCta";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { Hero } from "@/components/sections/Hero";
import { InlineCta } from "@/components/sections/InlineCta";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { getCommunities } from "@/lib/api/communities";
import { getFeaturedProperties } from "@/lib/api/properties";
import { getTestimonials } from "@/lib/api/testimonials";

export default async function Home() {
  const [featured, communities, testimonials] = await Promise.all([
    getFeaturedProperties(6),
    getCommunities(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <CredibilityStrip />
      <FeaturedProperties properties={featured} />
      <InlineCta />
      <ExpertiseGrid />
      <CommunitiesPreview communities={communities} />
      <Testimonials testimonials={testimonials} />
      <InlineCta />
      <SocialProofStrip />
      <ContactCta />
    </>
  );
}
