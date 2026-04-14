"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { submitContact } from "@/lib/api/contact";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const initial: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  const [values, setValues] = useState<FormState>({ ...initial, message: initialMessage });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    if (!initialMessage) return;
    setValues((v) => ({ ...v, message: initialMessage }));
  }, [initialMessage]);

  const canSubmit = useMemo(() => {
    return (
      values.firstName.trim().length > 0 &&
      values.lastName.trim().length > 0 &&
      values.email.trim().length > 0 &&
      values.phone.trim().length > 0 &&
      values.message.trim().length > 0 &&
      !busy
    );
  }, [busy, values]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setTicketId(null);

    const res = await submitContact({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      message: values.message,
    });

    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }

    setTicketId(res.ticketId);
    setValues({ ...initial, message: initialMessage });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-2xl)] border border-white/10 bg-surface/35 p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <div className="text-xs font-extrabold text-muted">First name</div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none ring-0 placeholder:text-muted/70 focus:border-accent/60"
            value={values.firstName}
            onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
            autoComplete="given-name"
            placeholder="Jordan"
            required
          />
        </label>
        <label className="block">
          <div className="text-xs font-extrabold text-muted">Last name</div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none placeholder:text-muted/70 focus:border-accent/60"
            value={values.lastName}
            onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))}
            autoComplete="family-name"
            placeholder="Rivera"
            required
          />
        </label>
        <label className="block sm:col-span-2">
          <div className="text-xs font-extrabold text-muted">Email</div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none placeholder:text-muted/70 focus:border-accent/60"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="block sm:col-span-2">
          <div className="text-xs font-extrabold text-muted">Phone</div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none placeholder:text-muted/70 focus:border-accent/60"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            autoComplete="tel"
            inputMode="tel"
            placeholder="(813) 555-0199"
            required
          />
        </label>
        <label className="block sm:col-span-2">
          <div className="text-xs font-extrabold text-muted">Message</div>
          <textarea
            className="mt-2 min-h-[140px] w-full resize-y rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none placeholder:text-muted/70 focus:border-accent/60"
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            placeholder="I'm buying in 45 days. Target: South Tampa, 4 beds, pool, $1.2M max."
            required
          />
        </label>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm font-semibold text-text">
          {error}
        </div>
      ) : null}

      {ticketId ? (
        <div className="mt-4 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-text">
          Received. Your reference ticket is <span className="font-extrabold">{ticketId}</span>.
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink shadow-[0_18px_45px_rgba(245,158,11,0.22)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Sending..." : "Submit"}
        </button>
        <div className="text-xs text-muted">
          By submitting, you agree to be contacted about your request. No spam - no endless drip.
        </div>
      </div>
    </form>
  );
}
