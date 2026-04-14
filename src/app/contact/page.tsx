import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for tours, pricing strategy, and relocation support across Tampa Bay.`,
  openGraph: {
    title: `Contact | ${site.name}`,
    description: "Send your timeline and goals - we respond fast with a clear plan.",
    url: `${site.url}/contact`,
  },
};

type Props = { searchParams: Promise<{ property?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initialMessage = sp.property
    ? `I'm interested in the property slug: ${sp.property}. Please send next steps for a tour and offer strategy.`
    : "";

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">CONTACT</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            Let's move with intent.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Fast responses, direct guidance, and zero vague "we'll circle back" energy.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <ContactForm initialMessage={initialMessage} />
        </div>
      </Container>
    </section>
  );
}
