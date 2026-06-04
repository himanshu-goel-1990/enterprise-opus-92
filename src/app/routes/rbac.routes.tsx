import { L } from "@/app/routes/lazyRoute";
import { Navigate, Outlet } from "react-router-dom";

export const rbacRoutes = [
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
];
