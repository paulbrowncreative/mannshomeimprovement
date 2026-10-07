import { services } from "@/content/services";

/** Shared by the form (client) and the API route (server) so rules never drift. */

export const projectOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "other", label: "Something else / not sure yet" },
];

export const contactMethods = [
  { value: "call", label: "Phone call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
] as const;

export type EstimateInput = {
  name: string;
  phone: string;
  email: string;
  project: string;
  town: string;
  details: string;
  contactMethod: string;
};

export type FieldErrors = Partial<Record<keyof EstimateInput, string>>;

export const limits = { name: 100, email: 200, town: 80, details: 3000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

export function readInput(get: (k: string) => unknown): EstimateInput {
  const str = (k: string) => {
    const v = get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    name: str("name"),
    phone: str("phone"),
    email: str("email"),
    project: str("project"),
    town: str("town"),
    details: str("details"),
    contactMethod: str("contactMethod") || "call",
  };
}

export function validate(input: EstimateInput): FieldErrors {
  const e: FieldErrors = {};
  if (input.name.length < 2) e.name = "Please enter your name.";
  else if (input.name.length > limits.name) e.name = "Please shorten your name.";

  if (!input.phone) e.phone = "Please enter a phone number so we can reach you.";
  else if (normalizePhone(input.phone).length !== 10) e.phone = "Please enter a 10-digit phone number, like 734-555-0123.";

  if (input.email && (!EMAIL_RE.test(input.email) || input.email.length > limits.email))
    e.email = "That email address doesn't look right — check for typos.";
  if (input.contactMethod === "email" && !input.email) e.email = "Add an email address, or choose call or text.";

  if (!projectOptions.some((o) => o.value === input.project)) e.project = "Please choose the type of project.";
  if (input.town.length > limits.town) e.town = "Please shorten the town name.";
  if (input.details.length > limits.details) e.details = `Please keep the description under ${limits.details} characters.`;
  if (!contactMethods.some((m) => m.value === input.contactMethod)) e.contactMethod = "Please choose how to contact you.";
  return e;
}
