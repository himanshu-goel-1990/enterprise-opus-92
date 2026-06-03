import { fullName, email, daysAgo, pick, randInt, randId, seedReset } from "./seed";

export type UserStatus = "active" | "invited" | "suspended" | "deactivated";
export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Admin" | "Manager" | "Developer" | "Member" | "Billing" | "Read-only";
  status: UserStatus;
  org: string;
  team: string;
  lastSeen: string;
  joined: string;
  mfa: boolean;
  country: string;
}

const ROLES: MockUser["role"][] = ["Owner", "Admin", "Manager", "Developer", "Member", "Billing", "Read-only"];
const STATUSES: UserStatus[] = ["active", "active", "active", "active", "invited", "suspended", "deactivated"];
const ORGS = ["Acme Corp", "Globex", "Initech", "Umbrella"];
const TEAMS = ["Engineering", "Design", "Marketing", "Sales", "Finance", "Operations", "Security", "Data"];
const COUNTRIES = ["🇺🇸 US", "🇬🇧 UK", "🇩🇪 DE", "🇫🇷 FR", "🇯🇵 JP", "🇮🇳 IN", "🇧🇷 BR", "🇨🇦 CA", "🇸🇪 SE"];

seedReset();
export const mockUsers: MockUser[] = Array.from({ length: 124 }).map(() => {
  const name = fullName();
  return {
    id: randId("usr"),
    name,
    email: email(name),
    avatar: `https://i.pravatar.cc/64?u=${encodeURIComponent(name)}`,
    role: pick(ROLES),
    status: pick(STATUSES),
    org: pick(ORGS),
    team: pick(TEAMS),
    lastSeen: daysAgo(randInt(0, 90)),
    joined: daysAgo(randInt(30, 1200)),
    mfa: Math.random() > 0.3,
    country: pick(COUNTRIES),
  };
});
