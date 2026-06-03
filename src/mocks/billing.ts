import { daysAgo, randId, seedReset } from "./seed";

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  cycle: "month" | "year";
  features: string[];
  highlight?: boolean;
  cta: string;
}

export const plans: Plan[] = [
  { id: "free", name: "Starter", tagline: "For small teams getting started", price: 0, cycle: "month", features: ["Up to 5 users", "1 organization", "Community support", "Basic audit logs"], cta: "Current plan" },
  { id: "team", name: "Team", tagline: "Growing teams who need more", price: 49, cycle: "month", features: ["Up to 25 users", "5 organizations", "Email support", "Full audit logs", "Feature flags"], cta: "Upgrade" },
  { id: "business", name: "Business", tagline: "Scale across departments", price: 199, cycle: "month", features: ["Up to 250 users", "Unlimited orgs", "Priority support", "Custom roles", "SSO (Google, Okta)", "Webhooks"], highlight: true, cta: "Upgrade" },
  { id: "enterprise", name: "Enterprise", tagline: "Custom-tailored for the largest organizations", price: 0, cycle: "month", features: ["Unlimited everything", "Dedicated CSM", "99.99% SLA", "SAML SSO", "SCIM provisioning", "Data residency", "Custom contracts"], cta: "Talk to sales" },
];

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "paid" | "open" | "void" | "uncollectible";
  pdf: string;
}

seedReset();
export const invoices: Invoice[] = Array.from({ length: 18 }).map((_, i) => ({
  id: randId("inv"),
  number: `INV-${(2042 - i).toString().padStart(5, "0")}`,
  date: daysAgo(i * 30 + 2),
  amount: i % 5 === 0 ? 4990 : 2400,
  status: i === 0 ? "open" : "paid",
  pdf: "#",
}));
