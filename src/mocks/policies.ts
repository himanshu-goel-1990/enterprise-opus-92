export type PolicyEffect = "allow" | "deny";
export type PolicyStatus = "active" | "suspended";

export interface Policy {
  id: string;
  name: string;
  description: string;
  effect: PolicyEffect;
  status: PolicyStatus;
  scope: "organization" | "team" | "global";
  resources: string[]; // e.g. ["organizations", "users:*"]
  actions: string[]; // e.g. ["read", "create"]
  subjects: string[]; // roles or user ids the policy binds to
  conditions: string; // raw JSON string
  priority: number; // 1..100
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export const RESOURCE_OPTIONS = [
  "organizations",
  "users",
  "roles",
  "permissions",
  "billing",
  "licenses",
  "feature_flags",
  "audit_logs",
  "api_keys",
  "settings",
];

export const ACTION_OPTIONS = [
  "read",
  "create",
  "update",
  "delete",
  "assign",
  "export",
  "impersonate",
];

export const SUBJECT_OPTIONS = [
  "role:owner",
  "role:admin",
  "role:manager",
  "role:developer",
  "role:billing_manager",
  "role:auditor",
  "role:member",
  "role:viewer",
];

export const seedPolicies: Policy[] = [
  {
    id: "pol_001",
    name: "Admins full access",
    description: "Grants administrators full read/write on all resources",
    effect: "allow",
    status: "active",
    scope: "organization",
    resources: ["*"],
    actions: ["read", "create", "update", "delete"],
    subjects: ["role:admin", "role:owner"],
    conditions: `{}`,
    priority: 10,
    createdAt: "2025-04-12T09:22:00Z",
    updatedAt: "2025-09-01T14:11:00Z",
    createdBy: "system",
  },
  {
    id: "pol_002",
    name: "Deny billing access for members",
    description: "Members cannot view or modify billing",
    effect: "deny",
    status: "active",
    scope: "organization",
    resources: ["billing"],
    actions: ["read", "update"],
    subjects: ["role:member", "role:viewer"],
    conditions: `{}`,
    priority: 5,
    createdAt: "2025-05-03T11:00:00Z",
    updatedAt: "2025-08-19T10:00:00Z",
    createdBy: "alice@acme.com",
  },
  {
    id: "pol_003",
    name: "Developers manage API keys",
    description: "Developers can CRUD API keys within their team scope",
    effect: "allow",
    status: "active",
    scope: "team",
    resources: ["api_keys"],
    actions: ["read", "create", "update", "delete"],
    subjects: ["role:developer"],
    conditions: `{"team": "${"${user.team}"}"}`,
    priority: 20,
    createdAt: "2025-06-15T08:30:00Z",
    updatedAt: "2025-09-21T16:45:00Z",
    createdBy: "bob@acme.com",
  },
  {
    id: "pol_004",
    name: "Auditor read-only logs",
    description: "Auditors can read but not modify audit logs",
    effect: "allow",
    status: "active",
    scope: "global",
    resources: ["audit_logs"],
    actions: ["read", "export"],
    subjects: ["role:auditor"],
    conditions: `{}`,
    priority: 30,
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-01T12:00:00Z",
    createdBy: "system",
  },
  {
    id: "pol_005",
    name: "Suspend impersonation",
    description: "Temporarily disabled impersonation policy",
    effect: "allow",
    status: "suspended",
    scope: "global",
    resources: ["users"],
    actions: ["impersonate"],
    subjects: ["role:owner"],
    conditions: `{"mfa": true}`,
    priority: 1,
    createdAt: "2025-02-10T09:00:00Z",
    updatedAt: "2025-10-04T17:20:00Z",
    createdBy: "carol@acme.com",
  },
];