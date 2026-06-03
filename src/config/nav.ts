import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  CreditCard,
  Flag,
  FileClock,
  Bell,
  Settings,
  KeyRound,
  Crown,
  KeySquare,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
}
export interface NavGroup {
  label: string;
  items: NavItem[];
  requiresPlatformAdmin?: boolean;
}

export const navGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "Organizations", to: "/organizations", icon: Building2 },
      { label: "Users", to: "/users", icon: Users },
    ],
  },
  {
    label: "Access",
    items: [
      { label: "Roles & Permissions", to: "/rbac/roles", icon: ShieldCheck },
      { label: "Policy", to: "/rbac/policies", icon: ShieldCheck },
      { label: "API & Keys", to: "/api/keys", icon: KeyRound },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Billing", to: "/billing/overview", icon: CreditCard },
      { label: "Licenses", to: "/licenses/overview", icon: KeySquare },
      { label: "Feature Flags", to: "/feature-flags", icon: Flag, badge: "Beta" },
      { label: "Audit Logs", to: "/audit-logs", icon: FileClock },
      { label: "Notifications", to: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Configuration",
    items: [{ label: "Settings", to: "/settings/general", icon: Settings }],
  },
  {
    label: "Platform Admin",
    requiresPlatformAdmin: true,
    items: [{ label: "Super Admin", to: "/super-admin/tenants", icon: Crown }],
  },
];
