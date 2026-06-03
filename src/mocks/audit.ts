import { fullName, hoursAgo, pick, randId, seedReset } from "./seed";

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  resource: string;
  ip: string;
  ua: string;
  risk: "low" | "medium" | "high";
  at: string;
}

const ACTIONS = [
  "user.invite", "user.update", "user.delete", "role.create", "role.update",
  "permission.grant", "permission.revoke", "billing.update_plan", "billing.add_card",
  "apikey.create", "apikey.revoke", "webhook.create", "settings.update",
  "sso.configure", "login.success", "login.failed", "mfa.enrolled", "session.revoke",
  "feature_flag.toggle", "audit.export", "tenant.suspend",
];
const RESOURCES = ["users/usr_42", "roles/admin", "billing/sub_a1", "settings/sso", "api/keys/key_8", "webhooks/wh_3", "tenants/org_2"];
const RISKS: AuditEvent["risk"][] = ["low", "low", "low", "low", "medium", "medium", "high"];

seedReset();
export const mockAudit: AuditEvent[] = Array.from({ length: 220 }).map((_, i) => ({
  id: randId("evt"),
  actor: fullName(),
  action: pick(ACTIONS),
  resource: pick(RESOURCES),
  ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  ua: pick(["Chrome 131 / macOS", "Safari 18 / iOS", "Firefox 132 / Windows", "Edge 131 / Windows", "CLI / curl 8"]),
  risk: pick(RISKS),
  at: hoursAgo(i * 0.7 + Math.random() * 2),
}));
