import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";

export function ContactCta() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-extrabold tracking-wide text-accent">CONTACT</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Tell us what you want - we will tell you what it takes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              This form is wired for UI validation now. When your backend is ready, swap the submit
              handler in one place.
            </p>

            <div className="mt-8 rounded-[var(--radius-2xl)] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-extrabold text-text">What you should include</div>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>- Move timeline (30/60/90+ days)</li>
                <li>- Must-haves vs nice-to-haves</li>
                <li>- Financing posture (cash, conventional, VA, etc.)</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
