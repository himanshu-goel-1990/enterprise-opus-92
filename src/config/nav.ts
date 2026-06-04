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
  Key,
  UserCog,
  Lock,
  Layers,
  Receipt,
  Wallet,
  Package,
  BarChart3,
  Webhook,
  FileText,
  Gauge,
  BookOpen,
  Palette,
  Mail,
  Shield,
  Globe,
  Server,
  Activity,
  DollarSign,
  UserCheck,
  UserX,
  Building,
  Boxes,
  CheckCircle2,
  CalendarClock,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  permission: string,
  children?: NavItem[];
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
      {
        label: "Organizations",
        to: "/organizations",
        permission: "organizations:read",
        icon: Building2,
        children: [
          { label: "All Organizations", to: "/organizations", icon: Building },
          { label: "Organization Units", to: "/organization-units", icon: Boxes },
          { label: "Org Memberships", to: "/org-memberships", icon: Boxes },
          { label: "Workspaces ", to: "/workspaces", icon: Boxes },
          { label: "Identity Providers", to: "/identity-providers", icon: Boxes },
        ],
      },
      {
        label: "Users",
        to: "/users",
        icon: Users,
        permission: "users:read",
        children: [
          { label: "All Users", to: "/users", icon: UserCheck, },
          { label: "invitations", to: "/invitations", icon: UserX },
        ],
      },
    ],
  },
  {
    label: "Access",
    items: [
      {
        label: "Roles & Permissions",
        to: "/rbac",
        icon: ShieldCheck,
        children: [
          { label: "Roles", to: "/rbac/roles", icon: UserCog },
          { label: "Permissions", to: "/rbac/permissions", icon: Lock },
          { label: "Permission Groups", to: "/rbac/permissions/groups", icon: Layers },
          { label: "Scopes", to: "/rbac/scopes", icon: Globe },
        ],
      },
      { label: "Policies", to: "/rbac/policies", icon: Shield },
      {
        label: "API & Keys",
        to: "/api",
        icon: KeyRound,
        children: [
          { label: "API Keys", to: "/api/keys", icon: Key },
          { label: "Webhooks", to: "/api/webhooks", icon: Webhook },
          { label: "Logs", to: "/api/logs", icon: FileText },
          { label: "Rate Limits", to: "/api/rate-limits", icon: Gauge },
          { label: "Docs", to: "/api/docs", icon: BookOpen },
        ],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        label: "Billing",
        to: "/billing",
        icon: CreditCard,
        children: [
          { label: "Overview", to: "/billing/overview", icon: BarChart3 },
          { label: "Plan", to: "/billing/plan", icon: Package },
          { label: "Invoices", to: "/billing/invoices", icon: Receipt },
          { label: "Payment Methods", to: "/billing/payment-methods", icon: Wallet },
          { label: "Seats", to: "/billing/seats", icon: Users },
          { label: "Add-ons", to: "/billing/add-ons", icon: Boxes },
          { label: "Usage", to: "/billing/usage", icon: Activity },
        ],
      },
      {
        label: "Licenses",
        to: "/licenses",
        icon: KeySquare,
        children: [
          { label: "Overview", to: "/licenses/overview", icon: BarChart3 },
          { label: "All Licenses", to: "/licenses/list", icon: KeySquare },
          { label: "Add License", to: "/licenses/new", icon: Key },
          { label: "Pools", to: "/licenses/pools", icon: Layers },
          { label: "Assignments", to: "/licenses/assignments", icon: UserCheck },
          { label: "Activations", to: "/licenses/activations", icon: CheckCircle2 },
          { label: "Expirations", to: "/licenses/expirations", icon: CalendarClock },
          { label: "Compliance", to: "/licenses/compliance", icon: ClipboardCheck },
        ],
      },
      { label: "Feature Flags", to: "/feature-flags", icon: Flag, badge: "Beta" },
      { label: "Audit Logs", to: "/audit-logs", icon: FileClock },
      { label: "Notifications", to: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Configuration",
    items: [
      {
        label: "Settings",
        to: "/settings",
        icon: Settings,
        children: [
          { label: "General", to: "/settings/general", icon: Settings },
          { label: "Branding", to: "/settings/branding", icon: Palette },
          { label: "Email", to: "/settings/email", icon: Mail },
          { label: "Security", to: "/settings/security", icon: Shield },
          { label: "API", to: "/settings/api", icon: KeyRound },
          { label: "Webhooks", to: "/settings/webhooks", icon: Webhook },
          { label: "Domains", to: "/settings/domains", icon: Globe },
          { label: "SMTP", to: "/settings/smtp", icon: Server },
          { label: "SSO", to: "/settings/sso", icon: Lock },
          { label: "MFA", to: "/settings/mfa", icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    label: "Platform Admin",
    requiresPlatformAdmin: true,
    items: [
      {
        label: "Super Admin",
        to: "/super-admin",
        icon: Crown,
        children: [
          { label: "Tenants", to: "/super-admin/tenants", icon: Building2 },
          { label: "Analytics", to: "/super-admin/analytics", icon: BarChart3 },
          { label: "Revenue", to: "/super-admin/revenue", icon: DollarSign },
          { label: "Global Users", to: "/super-admin/global-users", icon: Users },
          { label: "Impersonate", to: "/super-admin/impersonate", icon: UserCog },
          { label: "Global Flags", to: "/super-admin/global-flags", icon: Flag },
          { label: "System Health", to: "/super-admin/system-health", icon: Activity },
          { label: "Platform Audit", to: "/super-admin/platform-audit", icon: FileClock },
        ],
      },
    ],
  },
];
