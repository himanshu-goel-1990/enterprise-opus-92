export interface Role {
  id: string;
  name: string;
  description: string;
  members: number;
  permissions: number;
  scope: "organization" | "team" | "global";
  isSystem: boolean;
  color: string;
}

export const roles: Role[] = [
  { id: "r_owner", name: "Owner", description: "Full access to everything including billing and ownership transfer", members: 2, permissions: 142, scope: "organization", isSystem: true, color: "#a855f7" },
  { id: "r_admin", name: "Admin", description: "Administrative access without billing", members: 8, permissions: 118, scope: "organization", isSystem: true, color: "#6366f1" },
  { id: "r_manager", name: "Manager", description: "Manage team members and assigned projects", members: 24, permissions: 64, scope: "team", isSystem: false, color: "#10b981" },
  { id: "r_dev", name: "Developer", description: "Read/write access to code, API keys, deployments", members: 56, permissions: 48, scope: "team", isSystem: false, color: "#3b82f6" },
  { id: "r_billing", name: "Billing Manager", description: "View invoices, manage payment methods and seats", members: 4, permissions: 12, scope: "organization", isSystem: false, color: "#f59e0b" },
  { id: "r_audit", name: "Auditor", description: "Read-only access to audit logs and compliance reports", members: 3, permissions: 8, scope: "global", isSystem: false, color: "#64748b" },
  { id: "r_member", name: "Member", description: "Standard collaborator access", members: 87, permissions: 22, scope: "team", isSystem: true, color: "#94a3b8" },
  { id: "r_viewer", name: "Read-only", description: "View-only access to most resources", members: 12, permissions: 14, scope: "team", isSystem: false, color: "#cbd5e1" },
];

export const permissionGroups = [
  { name: "Organizations", permissions: ["view", "create", "update", "delete", "invite_members", "transfer_ownership"] },
  { name: "Users", permissions: ["view", "create", "update", "delete", "impersonate", "manage_sessions"] },
  { name: "Roles & Permissions", permissions: ["view", "create", "update", "delete", "assign"] },
  { name: "Billing", permissions: ["view", "update_plan", "manage_payment_methods", "manage_seats", "download_invoices"] },
  { name: "API & Webhooks", permissions: ["view_keys", "create_key", "revoke_key", "manage_webhooks"] },
  { name: "Feature Flags", permissions: ["view", "create", "update", "delete", "rollout"] },
  { name: "Audit Logs", permissions: ["view", "export", "configure_alerts"] },
  { name: "Settings", permissions: ["general", "branding", "security", "sso", "mfa", "domains", "smtp"] },
];
