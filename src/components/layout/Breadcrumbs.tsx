import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  organizations: "Organizations",
  users: "Users",
  rbac: "Access Control",
  roles: "Roles",
  permissions: "Permissions",
  scopes: "Scopes",
  billing: "Billing",
  overview: "Overview",
  plan: "Plan",
  invoices: "Invoices",
  "payment-methods": "Payment Methods",
  seats: "Seats",
  "add-ons": "Add-ons",
  usage: "Usage",
  "feature-flags": "Feature Flags",
  "audit-logs": "Audit Logs",
  notifications: "Notifications",
  settings: "Settings",
  api: "API",
  keys: "Keys",
  webhooks: "Webhooks",
  logs: "Logs",
  "rate-limits": "Rate Limits",
  docs: "Docs",
  "super-admin": "Super Admin",
  tenants: "Tenants",
  analytics: "Analytics",
  revenue: "Revenue",
  "global-users": "Global Users",
  impersonate: "Impersonate",
  "global-flags": "Global Flags",
  "system-health": "System Health",
  "platform-audit": "Platform Audit",
  profile: "Profile",
  general: "General",
  branding: "Branding",
  email: "Email",
  security: "Security",
  domains: "Domains",
  smtp: "SMTP",
  sso: "SSO",
  mfa: "MFA",
  hierarchy: "Hierarchy",
  departments: "Departments",
  teams: "Teams",
  branches: "Branches",
  members: "Members",
  activity: "Activity",
  devices: "Devices",
  sessions: "Sessions",
  "api-keys": "API Keys",
  onboarding: "Onboarding",
  groups: "Groups",
};

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <MuiBreadcrumbs separator={<ChevronRight size={14} style={{ opacity: 0.5 }} />} aria-label="breadcrumb">
      {parts.map((p, i) => {
        const to = "/" + parts.slice(0, i + 1).join("/");
        const isLast = i === parts.length - 1;
        const label = LABELS[p] ?? p.replace(/-/g, " ");
        if (isLast) {
          return (
            <Typography key={to} variant="body2" fontWeight={600} sx={{ textTransform: "capitalize" }}>
              {label}
            </Typography>
          );
        }
        return (
          <Typography
            key={to}
            component={Link}
            to={to}
            variant="body2"
            sx={{ color: "text.secondary", textTransform: "capitalize", "&:hover": { color: "text.primary" } }}
          >
            {label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}
