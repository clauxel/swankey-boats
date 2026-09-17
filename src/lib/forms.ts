import { site } from "./site";

export const salesChannelOptions = [
  "Retail showroom",
  "E-commerce",
  "Fishing clubs",
  "Rental / hire",
  "Guides / tournaments",
  "Other",
] as const;

export const targetMarketOptions = [
  "Lakes",
  "Reservoirs",
  "Clubs",
  "Rental operations",
  "Guides / tournaments",
  "OEM / brand partner",
] as const;

export const annualSalesRanges = [
  "Prefer not to say",
  "1–10 boats",
  "11–30 boats",
  "31–80 boats",
  "80+ boats",
] as const;

export const quantityRanges = [
  "1 sample boat",
  "2–5 pilot boats",
  "6–10 boats",
  "10+ boats",
  "To be discussed",
] as const;

export const inquiryTopics = [
  { value: "product", label: "Request product information" },
  { value: "dealer", label: "Dealer / pilot order" },
  { value: "engineering", label: "Talk to engineering" },
  { value: "media", label: "Media kit" },
  { value: "oem", label: "OEM / ODM" },
  { value: "other", label: "Other" },
] as const;

export type DealerPayload = {
  companyName: string;
  contactPerson: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  currentBrands: string;
  salesChannels: string[];
  annualSales: string;
  targetMarket: string[];
  interestedModel: string;
  expectedQuantity: string;
  oemOdm: boolean;
  notes: string;
};

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  topic: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string) {
  return emailPattern.test(value.trim());
}

export function validateDealer(data: DealerPayload) {
  const errors: Partial<Record<keyof DealerPayload, string>> = {};
  if (!data.companyName.trim()) errors.companyName = "Company name is required.";
  if (!data.contactPerson.trim()) errors.contactPerson = "Contact person is required.";
  if (!data.country.trim()) errors.country = "Country / region is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!isEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!data.phone.trim()) errors.phone = "Phone or WhatsApp is required.";
  if (data.salesChannels.length === 0) errors.salesChannels = "Select at least one sales channel.";
  if (data.targetMarket.length === 0) errors.targetMarket = "Select at least one target market.";
  if (!data.interestedModel.trim()) errors.interestedModel = "Interested model is required.";
  if (!data.expectedQuantity.trim()) {
    errors.expectedQuantity = "Choose an expected quantity range, or “To be discussed”.";
  }
  return errors;
}

export function validateContact(data: ContactPayload) {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!isEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!data.message.trim()) errors.message = "Please include a short message.";
  return errors;
}

export function dealerMailto(data: DealerPayload) {
  const subject = `Dealer application — ${data.companyName} (${data.country})`;
  const body = [
    "HUANQI INNOVATION dealer application",
    "Domain: swankey.boats",
    "",
    `Company name: ${data.companyName}`,
    `Contact person: ${data.contactPerson}`,
    `Country / region: ${data.country}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Company website: ${data.website || "—"}`,
    `Current brands: ${data.currentBrands || "—"}`,
    `Sales channels: ${data.salesChannels.join(", ")}`,
    `Annual boat sales: ${data.annualSales || "—"}`,
    `Target market: ${data.targetMarket.join(", ")}`,
    `Interested model: ${data.interestedModel}`,
    `Expected order quantity: ${data.expectedQuantity}`,
    `OEM / ODM interest: ${data.oemOdm ? "Yes" : "No"}`,
    "",
    "Notes:",
    data.notes || "—",
  ].join("\n");
  return buildMailto(subject, body);
}

export function contactMailto(data: ContactPayload) {
  const topic =
    inquiryTopics.find((item) => item.value === data.topic)?.label ?? data.topic;
  const subject = `${topic} — ${data.name}`;
  const body = [
    "HUANQI INNOVATION website inquiry",
    "Domain: swankey.boats",
    "",
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || "—"}`,
    `Country / region: ${data.country || "—"}`,
    `Topic: ${topic}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
  return buildMailto(subject, body);
}

export function buildMailto(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function formEndpoint() {
  return process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() || "";
}

export async function postForm(payload: Record<string, unknown>) {
  const endpoint = formEndpoint();
  if (!endpoint) return { method: "mailto" as const };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Form endpoint returned ${response.status}`);
  }
  return { method: "endpoint" as const };
}
