import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { RouteFallback } from "@/components/feedback/RouteFallback";
import { RouteErrorBoundary } from "@/components/feedback/RouteErrorBoundary";
import { RequireAuth } from "@/guards/RequireAuth";
import { RequireRole } from "@/guards/RequireRole";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";

const L = (loader: () => Promise<{ default: React.ComponentType }>) => {
  const Comp = lazy(loader);
  return (
    <Suspense fallback={<RouteFallback />}>
      <Comp />
    </Suspense>
  );
};

export const router = createBrowserRouter([
  // PUBLIC AUTH
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/login", element: L(() => import("@/features/auth/pages/LoginPage")) },
      { path: "/register", element: L(() => import("@/features/auth/pages/RegisterPage")) },
      {
        path: "/forgot-password",
        element: L(() => import("@/features/auth/pages/ForgotPasswordPage")),
      },
      {
        path: "/reset-password",
        element: L(() => import("@/features/auth/pages/ResetPasswordPage")),
      },
      { path: "/mfa", element: L(() => import("@/features/auth/pages/MfaPage")) },
      { path: "/sso", element: L(() => import("@/features/auth/pages/SsoPage")) },
      { path: "/invite/:token", element: L(() => import("@/features/auth/pages/InvitePage")) },
      {
        path: "/session-expired",
        element: L(() => import("@/features/auth/pages/SessionExpiredPage")),
      },
      {
        path: "/select-organization",
        element: L(() => import("@/features/auth/pages/SelectOrganizationPage")),
      },
    ],
  },

  // APP
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: L(() => import("@/features/dashboard/DashboardPage")) },

      // Organizations
      {
        path: "organizations",
        element: L(() => import("@/features/organizations/OrganizationsListPage")),
      },
      {
        path: "organizations/new",
        element: L(() => import("@/features/organizations/AddOrganizationPage")),
      },
      {
        path: "organizations/edit/:orgId",
        element: L(() => import("@/features/organizations/AddOrganizationPage")),
      },
      {
        path: "organizations/:orgId",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          {
            path: "overview",
            element: L(() => import("@/features/organizations/OrganizationOverviewPage")),
          },
          {
            path: "hierarchy",
            element: L(() => import("@/features/organizations/OrganizationHierarchyPage")),
          },
          {
            path: "departments",
            element: L(() => import("@/features/organizations/OrganizationDepartmentsPage")),
          },
          {
            path: "teams",
            element: L(() => import("@/features/organizations/OrganizationTeamsPage")),
          },
          {
            path: "branches",
            element: L(() => import("@/features/organizations/OrganizationBranchesPage")),
          },
          {
            path: "members",
            element: L(() => import("@/features/organizations/OrganizationMembersPage")),
          },
        ],
      },

      // Users
      { path: "users", element: L(() => import("@/features/users/UsersListPage")) },
      { path: "users/new", element: L(() => import("@/features/users/AddUserPage")) },
      { path: "users/edit/:userId", element: L(() => import("@/features/users/AddUserPage")) },
      {
        path: "users/:userId",
        element: L(() => import("@/features/users/UserDetailPage")),
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: L(() => import("@/features/users/tabs/UserOverviewTab")) },
          { path: "activity", element: L(() => import("@/features/users/tabs/UserActivityTab")) },
          {
            path: "permissions",
            element: L(() => import("@/features/users/tabs/UserPermissionsTab")),
          },
          {
            path: "organizations",
            element: L(() => import("@/features/users/tabs/UserOrganizationsTab")),
          },
          { path: "teams", element: L(() => import("@/features/users/tabs/UserTeamsTab")) },
          { path: "devices", element: L(() => import("@/features/users/tabs/UserDevicesTab")) },
          { path: "sessions", element: L(() => import("@/features/users/tabs/UserSessionsTab")) },
          { path: "api-keys", element: L(() => import("@/features/users/tabs/UserApiKeysTab")) },
          {
            path: "onboarding",
            element: L(() => import("@/features/users/tabs/UserOnboardingTab")),
          },
        ],
      },

      // RBAC
      {
        path: "rbac",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="roles" replace /> },
          { path: "roles", element: L(() => import("@/features/rbac/RolesListPage")) },
          { path: "roles/new", element: L(() => import("@/features/rbac/AddRolePage")) },
          { path: "roles/edit/:roleId", element: L(() => import("@/features/rbac/AddRolePage")) },
          { path: "permissions", element: L(() => import("@/features/rbac/PermissionMatrixPage")) },
          {
            path: "permissions/new",
            element: L(() => import("@/features/rbac/AddPermissionPage")),
          },
          {
            path: "permissions/groups",
            element: L(() => import("@/features/rbac/PermissionGroupsPage")),
          },
          { path: "scopes", element: L(() => import("@/features/rbac/ScopesPage")) },
          { path: "policies", element: L(() => import("@/features/rbac/PoliciesListPage")) },
        ],
      },

      // Billing
      {
        path: "billing",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: L(() => import("@/features/billing/BillingOverviewPage")) },
          { path: "plan", element: L(() => import("@/features/billing/PlanPage")) },
          { path: "invoices", element: L(() => import("@/features/billing/InvoicesPage")) },
          {
            path: "payment-methods",
            element: L(() => import("@/features/billing/PaymentMethodsPage")),
          },
          { path: "seats", element: L(() => import("@/features/billing/SeatsPage")) },
          { path: "add-ons", element: L(() => import("@/features/billing/AddOnsPage")) },
          { path: "usage", element: L(() => import("@/features/billing/UsagePage")) },
        ],
      },

      // Feature flags
      {
        path: "feature-flags",
        element: L(() => import("@/features/featureFlags/FeatureFlagsListPage")),
      },
      {
        path: "feature-flags/:flagId",
        element: L(() => import("@/features/featureFlags/FeatureFlagDetailPage")),
      },

      // Audit & Notifications
      { path: "audit-logs", element: L(() => import("@/features/audit/AuditLogsPage")) },
      {
        path: "notifications",
        element: L(() => import("@/features/notifications/NotificationCenterPage")),
      },

      // Licenses
      {
        path: "licenses",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          {
            path: "overview",
            element: L(() => import("@/features/licenses/LicensesOverviewPage")),
          },
          { path: "list", element: L(() => import("@/features/licenses/LicensesListPage")) },
          { path: "new", element: L(() => import("@/features/licenses/AddLicensePage")) },
          { path: "list/:id", element: L(() => import("@/features/licenses/LicenseDetailPage")) },
          { path: "pools", element: L(() => import("@/features/licenses/LicensePoolsPage")) },
          {
            path: "assignments",
            element: L(() => import("@/features/licenses/LicenseAssignmentsPage")),
          },
          {
            path: "activations",
            element: L(() => import("@/features/licenses/LicenseActivationsPage")),
          },
          {
            path: "expirations",
            element: L(() => import("@/features/licenses/LicenseExpirationsPage")),
          },
          {
            path: "compliance",
            element: L(() => import("@/features/licenses/LicenseCompliancePage")),
          },
        ],
      },

      // Settings
      {
        path: "settings",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="general" replace /> },
          { path: "general", element: L(() => import("@/features/settings/GeneralSettingsPage")) },
          {
            path: "branding",
            element: L(() => import("@/features/settings/BrandingSettingsPage")),
          },
          { path: "email", element: L(() => import("@/features/settings/EmailSettingsPage")) },
          {
            path: "security",
            element: L(() => import("@/features/settings/SecuritySettingsPage")),
          },
          { path: "api", element: L(() => import("@/features/settings/ApiSettingsPage")) },
          {
            path: "webhooks",
            element: L(() => import("@/features/settings/WebhooksSettingsPage")),
          },
          { path: "domains", element: L(() => import("@/features/settings/DomainsSettingsPage")) },
          { path: "smtp", element: L(() => import("@/features/settings/SmtpSettingsPage")) },
          { path: "sso", element: L(() => import("@/features/settings/SsoSettingsPage")) },
          { path: "mfa", element: L(() => import("@/features/settings/MfaSettingsPage")) },
        ],
      },

      // API
      {
        path: "api",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="keys" replace /> },
          { path: "keys", element: L(() => import("@/features/api/ApiKeysPage")) },
          { path: "webhooks", element: L(() => import("@/features/api/WebhooksPage")) },
          { path: "logs", element: L(() => import("@/features/api/ApiLogsPage")) },
          { path: "rate-limits", element: L(() => import("@/features/api/RateLimitsPage")) },
          { path: "docs", element: L(() => import("@/features/api/ApiDocsPage")) },
        ],
      },

      // Super admin
      {
        path: "super-admin",
        element: (
          <RequireRole role="platform_admin">
            <Outlet />
          </RequireRole>
        ),
        children: [
          { index: true, element: <Navigate to="tenants" replace /> },
          { path: "tenants", element: L(() => import("@/features/superAdmin/TenantsPage")) },
          {
            path: "analytics",
            element: L(() => import("@/features/superAdmin/PlatformAnalyticsPage")),
          },
          { path: "revenue", element: L(() => import("@/features/superAdmin/RevenuePage")) },
          {
            path: "global-users",
            element: L(() => import("@/features/superAdmin/GlobalUsersPage")),
          },
          {
            path: "impersonate",
            element: L(() => import("@/features/superAdmin/ImpersonatePage")),
          },
          {
            path: "global-flags",
            element: L(() => import("@/features/superAdmin/GlobalFlagsPage")),
          },
          {
            path: "system-health",
            element: L(() => import("@/features/superAdmin/SystemHealthPage")),
          },
          {
            path: "platform-audit",
            element: L(() => import("@/features/superAdmin/PlatformAuditPage")),
          },
        ],
      },

      // Profile
      { path: "profile", element: L(() => import("@/features/profile/ProfilePage")) },

      { path: "403", element: L(() => import("@/features/errors/ForbiddenPage")) },
      { path: "*", element: L(() => import("@/features/errors/NotFoundPage")) },
    ],
  },
]);
