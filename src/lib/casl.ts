import { AbilityBuilder, createMongoAbility, type MongoAbility } from "@casl/ability";

export type Actions = "manage" | "read" | "create" | "update" | "delete" | "invite" | "impersonate" | "export";
export type Subjects =
  | "Organization"
  | "User"
  | "Role"
  | "Permission"
  | "Billing"
  | "Invoice"
  | "FeatureFlag"
  | "AuditLog"
  | "ApiKey"
  | "Webhook"
  | "Tenant"
  | "Settings"
  | "Notification"
  | "all";

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function buildAbility(role: "platform_admin" | "org_admin" | "member"): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
  if (role === "platform_admin") {
    can("manage", "all");
  } else if (role === "org_admin") {
    can("manage", ["Organization", "User", "Role", "Permission", "Billing", "Invoice", "FeatureFlag", "AuditLog", "ApiKey", "Webhook", "Settings", "Notification"]);
  } else {
    can("read", ["Organization", "User", "AuditLog", "Notification", "Billing", "Invoice"]);
    can("update", "User");
  }
  return build();
}
