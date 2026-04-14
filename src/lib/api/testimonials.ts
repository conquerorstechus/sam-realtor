import { mockTestimonials } from "@/lib/mock/testimonials";
import type { Testimonial } from "@/lib/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await sleep(25);
  return mockTestimonials;
}
