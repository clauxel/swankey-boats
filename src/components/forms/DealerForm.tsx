"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  annualSalesRanges,
  dealerMailto,
  type DealerPayload,
  formEndpoint,
  postForm,
  quantityRanges,
  salesChannelOptions,
  targetMarketOptions,
  validateDealer,
} from "@/lib/forms";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const empty: DealerPayload = {
  companyName: "",
  contactPerson: "",
  country: "",
  email: "",
  phone: "",
  website: "",
  currentBrands: "",
  salesChannels: [],
  annualSales: "",
  targetMarket: [],
  interestedModel: site.productModel,
  expectedQuantity: "",
  oemOdm: false,
  notes: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-300">{message}</p>;
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function DealerForm() {
  const [data, setData] = useState<DealerPayload>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof DealerPayload, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [method, setMethod] = useState<"mailto" | "endpoint" | null>(null);
  const endpointConfigured = useMemo(() => Boolean(formEndpoint()), []);

  function update<K extends keyof DealerPayload>(key: K, value: DealerPayload[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDealer(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("sending");
    try {
      const result = await postForm({ type: "dealer-application", ...data });
      if (result.method === "mailto") {
        window.location.href = dealerMailto(data);
        setMethod("mailto");
      } else {
        setMethod("endpoint");
      }
      setStatus("sent");
    } catch {
      window.location.href = dealerMailto(data);
      setMethod("mailto");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-white/10 bg-bg-elevated p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Company name *</span>
          <input
            className="field"
            value={data.companyName}
            onChange={(event) => update("companyName", event.target.value)}
            autoComplete="organization"
            required
          />
          <FieldError message={errors.companyName} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Contact person *</span>
          <input
            className="field"
            value={data.contactPerson}
            onChange={(event) => update("contactPerson", event.target.value)}
            autoComplete="name"
            required
          />
          <FieldError message={errors.contactPerson} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Country / region *</span>
          <input
            className="field"
            value={data.country}
            onChange={(event) => update("country", event.target.value)}
            list="dealer-countries"
            placeholder="France, Germany, …"
            required
          />
          <datalist id="dealer-countries">
            <option value="France" />
            <option value="Germany" />
            <option value="Netherlands" />
            <option value="Belgium" />
            <option value="Switzerland" />
            <option value="Austria" />
            <option value="United Kingdom" />
            <option value="Other — Europe" />
            <option value="Other" />
          </datalist>
          <FieldError message={errors.country} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Email *</span>
          <input
            type="email"
            className="field"
            value={data.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            required
          />
          <FieldError message={errors.email} />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span>Phone / WhatsApp *</span>
          <input
            className="field"
            value={data.phone}
            onChange={(event) => update("phone", event.target.value)}
            autoComplete="tel"
            required
          />
          <FieldError message={errors.phone} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Company website</span>
          <input
            className="field"
            value={data.website}
            onChange={(event) => update("website", event.target.value)}
            placeholder="https://"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Current brands</span>
          <input
            className="field"
            value={data.currentBrands}
            onChange={(event) => update("currentBrands", event.target.value)}
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm">Sales channels *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {salesChannelOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={data.salesChannels.includes(option)}
                onChange={() => update("salesChannels", toggle(data.salesChannels, option))}
              />
              {option}
            </label>
          ))}
        </div>
        <FieldError message={errors.salesChannels} />
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm">Target market *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {targetMarketOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={data.targetMarket.includes(option)}
                onChange={() => update("targetMarket", toggle(data.targetMarket, option))}
              />
              {option}
            </label>
          ))}
        </div>
        <FieldError message={errors.targetMarket} />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Annual boat sales</span>
          <select
            className="field"
            value={data.annualSales}
            onChange={(event) => update("annualSales", event.target.value)}
          >
            <option value="">Select a range</option>
            {annualSalesRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span>Interested model *</span>
          <input
            className="field"
            value={data.interestedModel}
            onChange={(event) => update("interestedModel", event.target.value)}
          />
          <FieldError message={errors.interestedModel} />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span>Expected order quantity *</span>
          <select
            className="field"
            value={data.expectedQuantity}
            onChange={(event) => update("expectedQuantity", event.target.value)}
            required
          >
            <option value="">Select a range</option>
            {quantityRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <FieldError message={errors.expectedQuantity} />
        </label>
      </div>

      <label className="mt-6 flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={data.oemOdm}
          onChange={(event) => update("oemOdm", event.target.checked)}
        />
        OEM / ODM interest
      </label>

      <label className="mt-6 grid gap-2 text-sm">
        <span>Notes</span>
        <textarea
          className="field"
          value={data.notes}
          onChange={(event) => update("notes", event.target.value)}
        />
      </label>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Preparing…" : "Apply to Become a Dealer"}
        </Button>
        <p className="text-sm text-muted">
          {endpointConfigured
            ? "This form posts to the configured form endpoint."
            : `Opens an email to ${site.email} with your application.`}
        </p>
      </div>
      {status === "sent" ? (
        <p className="mt-4 text-sm text-teal-bright" role="status">
          {method === "endpoint"
            ? "Application sent. HUANQI will follow up by email."
            : "Your email client should open with the encoded application. If it does not, write to zhongya789@gmail.com."}
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
