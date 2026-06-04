import { L } from "@/app/routes/lazyRoute";
import { Navigate, Outlet } from "react-router-dom";

export const usersRoutes = [
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
];
