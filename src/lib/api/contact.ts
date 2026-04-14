import type { ContactPayload, ContactResult } from "@/lib/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidEmail(email: string) {
  // UI-only validation; backend will enforce real rules later.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  await sleep(450);

  const firstName = payload.firstName.trim();
  const lastName = payload.lastName.trim();
  const email = payload.email.trim();
  const phone = payload.phone.trim();
  const message = payload.message.trim();

  if (!firstName || !lastName) {
    return { ok: false, error: "Please enter your first and last name." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: "Please enter a phone number we can reach you on." };
  }
  if (message.length < 12) {
    return { ok: false, error: "Tell us a bit more - what are you trying to accomplish?" };
  }

  const ticketId = `REQ-${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
  return { ok: true, ticketId };
}
