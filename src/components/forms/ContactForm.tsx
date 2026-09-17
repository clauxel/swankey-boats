"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import {
  contactMailto,
  type ContactPayload,
  formEndpoint,
  inquiryTopics,
  postForm,
  validateContact,
} from "@/lib/forms";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-sky-200">{message}</p>;
}

function readTopicParam(fallback: string) {
  const topic = new URLSearchParams(window.location.search).get("topic");
  return inquiryTopics.find((item) => item.value === topic)?.value ?? fallback;
}

export function ContactForm({ defaultTopic = "product" }: { defaultTopic?: string }) {
  const urlTopic = useSyncExternalStore(
    () => () => {},
    () => readTopicParam(defaultTopic),
    () => defaultTopic,
  );
  const [data, setData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    topic: undefined as string | undefined,
  });
  const payload: ContactPayload = { ...data, topic: data.topic ?? urlTopic };
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [method, setMethod] = useState<"mailto" | "endpoint" | null>(null);
  const endpointConfigured = useMemo(() => Boolean(formEndpoint()), []);

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus("sending");
    try {
      const result = await postForm({ type: "contact", ...payload });
      if (result.method === "mailto") {
        window.location.href = contactMailto(payload);
        setMethod("mailto");
      } else {
        setMethod("endpoint");
      }
      setStatus("sent");
    } catch {
      window.location.href = contactMailto(payload);
      setMethod("mailto");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Name *</span>
          <input
            className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-3 text-ice"
            value={data.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            required
          />
          <FieldError message={errors.name} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Company</span>
          <input
            className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-3 text-ice"
            value={data.company}
            onChange={(event) => update("company", event.target.value)}
            autoComplete="organization"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Email *</span>
          <input
            type="email"
            className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-3 text-ice"
            value={data.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            required
          />
          <FieldError message={errors.email} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Phone / WhatsApp</span>
          <input
            className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-3 text-ice"
            value={data.phone}
            onChange={(event) => update("phone", event.target.value)}
            autoComplete="tel"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Country / region</span>
          <input
            className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-3 text-ice"
            value={data.country}
            onChange={(event) => update("country", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Topic</span>
          <select
            className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-3 text-ice"
            value={payload.topic}
            onChange={(event) => update("topic", event.target.value)}
          >
            {inquiryTopics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm">
        <span>Message *</span>
        <textarea
          className="min-h-32 rounded-xl border border-white/12 bg-black/25 px-3 py-3 text-ice"
          value={data.message}
          onChange={(event) => update("message", event.target.value)}
          required
        />
        <FieldError message={errors.message} />
      </label>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Preparing…" : "Contact Swankey"}
        </Button>
        <p className="text-sm text-muted">
          {endpointConfigured
            ? "This form posts to the configured form endpoint."
            : `Opens an email to ${site.email}.`}
        </p>
      </div>
      {status === "sent" ? (
        <p className="mt-4 text-sm text-teal-bright" role="status">
          {method === "endpoint"
            ? "Message sent. Swankey will follow up by email."
            : "Your email client should open with the encoded message."}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-amber-200" role="status">
          The form endpoint was unavailable, so a mailto draft was opened instead.
        </p>
      ) : null}
    </form>
  );
}
