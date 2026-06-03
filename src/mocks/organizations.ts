import { daysAgo, pick, randInt, seedReset } from "./seed";

export interface MockOrg {
  id: string;
  name: string;
  slug: string;
  plan: "free" | "team" | "business" | "enterprise";
  members: number;
  status: "active" | "trialing" | "past_due" | "suspended";
  industry: string;
  region: string;
  created: string;
  mrr: number;
  color: string;
}

const INDUSTRIES = ["FinTech", "Healthcare", "SaaS", "E-commerce", "Media", "Education", "Manufacturing", "Logistics", "Gaming"];
const REGIONS = ["NA · East", "NA · West", "EU · Central", "EU · West", "APAC · Tokyo", "APAC · Singapore", "LATAM"];
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#3b82f6", "#ec4899", "#14b8a6"];

seedReset();
export const mockOrgs: MockOrg[] = Array.from({ length: 36 }).map((_, i) => {
  const names = ["Acme Corp", "Globex", "Initech", "Umbrella", "Stark Industries", "Wayne Enterprises", "Hooli", "Pied Piper", "Cyberdyne", "Soylent", "Massive Dynamic", "Tyrell Corp", "Wonka Industries", "Oscorp", "Aperture Science", "Black Mesa", "Weyland-Yutani", "InGen", "MomCorp", "Vandelay Industries"];
  const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : "");
  return {
    id: `org_${i + 1}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    plan: pick(["free", "team", "business", "enterprise"]),
    members: randInt(3, 480),
    status: pick(["active", "active", "active", "trialing", "past_due"]),
    industry: pick(INDUSTRIES),
    region: pick(REGIONS),
    created: daysAgo(randInt(30, 1400)),
    mrr: randInt(0, 25000),
    color: COLORS[i % COLORS.length],
  };
});
