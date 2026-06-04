import { L } from "@/app/routes/lazyRoute";
import { Navigate, Outlet } from "react-router-dom";

export const organizationsRoutes = [
  { index: true, element: <Navigate to="/dashboard" replace /> },
  { path: "dashboard", element: L(() => import("@/features/dashboard/DashboardPage")) },

  // Organizations
  {
    path: "organizations",
    element: L(() => import("@/features/organizations/ListPage")),
  },
  {
    path: "organizations/new",
    element: L(() => import("@/features/organizations/AddEditPage")),
  },
  {
    path: "organizations/edit/:orgId",
    element: L(() => import("@/features/organizations/AddEditPage")),
  },

  // Organization Units
  {
    path: "organization-units",
    element: L(() => import("@/features/organization-units/ListPage")),
  },
  {
    path: "organization-units/new",
    element: L(() => import("@/features/organization-units/AddEditPage")),
  },
  {
    path: "organization-units/edit/:orguId",
    element: L(() => import("@/features/organization-units/AddEditPage")),
  },

  // Organization Memberships
  {
    path: "org-memberships",
    element: L(() => import("@/features/organization-memberships/ListPage")),
  },
  {
    path: "org-memberships/new",
    element: L(() => import("@/features/organization-memberships/AddEditPage")),
  },
  {
    path: "org-memberships/edit/:orgmemId",
    element: L(() => import("@/features/organization-memberships/AddEditPage")),
  },

  // workspaces
  {
    path: "workspaces",
    element: L(() => import("@/features/workspaces/ListPage")),
  },
  {
    path: "workspaces/new",
    element: L(() => import("@/features/workspaces/AddEditPage")),
  },
  {
    path: "workspaces/edit/:wrkspcId",
    element: L(() => import("@/features/workspaces/AddEditPage")),
  },


  // identity-providers
  {
    path: "identity-providers",
    element: L(() => import("@/features/identity-providers/ListPage")),
  },
  {
    path: "identity-providers/new",
    element: L(() => import("@/features/identity-providers/AddEditPage")),
  },
  {
    path: "identity-providers/edit/:ipId",
    element: L(() => import("@/features/identity-providers/AddEditPage")),
  },






//   {
//     path: "organizations/:orgId",
//     element: <Outlet />,
//     children: [
//       { index: true, element: <Navigate to="overview" replace /> },
//       {
//         path: "overview",
//         element: L(() => import("@/features/organizations/OrganizationOverviewPage")),
//       },
//       {
//         path: "hierarchy",
//         element: L(() => import("@/features/organizations/OrganizationHierarchyPage")),
//       },
//       {
//         path: "departments",
//         element: L(() => import("@/features/organizations/OrganizationDepartmentsPage")),
//       },
//       {
//         path: "teams",
//         element: L(() => import("@/features/organizations/OrganizationTeamsPage")),
//       },
//       {
//         path: "branches",
//         element: L(() => import("@/features/organizations/OrganizationBranchesPage")),
//       },
//       {
//         path: "members",
//         element: L(() => import("@/features/organizations/OrganizationMembersPage")),
//       },
//     ],
//   },
];
