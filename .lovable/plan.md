
# Enterprise SaaS Frontend — Full Build Plan

A complete rebuild of the scaffold into a premium multi-tenant SaaS console inspired by Linear, Stripe, Vercel, Atlassian Admin, Clerk, and Notion Enterprise. Lovable Cloud handles real auth and persistence; the rest of the data layer ships with realistic mocks that swap to live APIs via a single service boundary.

---

## 1. Stack & Foundations

- **Build**: Vite 7, React 19, TypeScript strict
- **Routing**: React Router v7 (data routers, lazy routes, loaders, route-level error boundaries)
- **UI**: MUI v6 + Emotion, custom theme (light/dark), Inter + JetBrains Mono, MUI Icons + Lucide
- **State**: Redux Toolkit (auth, org, ui, notifications, featureFlags), RTK listener middleware
- **Server state**: TanStack Query v5 with Axios client + interceptors
- **Forms**: React Hook Form + Zod resolvers
- **Permissions**: CASL (`@casl/react`, `@casl/ability`) with `Can` component and `useAbility` hook
- **Motion**: Framer Motion for page transitions, drawers, list reorder
- **Auth**: Lovable Cloud (email/password + Google), session persisted via Supabase; JWT/refresh handled by Supabase client; Axios interceptor attaches token for mock API layer
- **Charts**: Recharts (already common in shadcn projects; pairs cleanly with MUI)
- **Tables**: MUI DataGrid (community) for advanced tables
- **Command palette**: `cmdk` styled to MUI

> Note: This replaces the current TanStack Start scaffold entirely. TanStack Start, Tailwind, and shadcn will be removed. Lovable Cloud (Supabase) only powers auth + a `profiles` table for now — all SaaS domain data is mocked behind a service layer ready for a real API.

---

## 2. Folder Architecture (feature-first)

```text
src/
  app/                       # store, router, providers
    store.ts                 # configureStore + slices
    router.tsx               # createBrowserRouter, lazy routes
    providers/               # Theme, Query, Redux, Ability, Snackbar, Motion
  config/                    # env, constants, nav schema, permissions catalog
  theme/                     # MUI theme tokens (light/dark), typography, shadows
  lib/                       # axios, queryClient, casl, formatters, mockServer
  services/                  # api/* — one file per resource (users, orgs, billing…)
  hooks/                     # useAuth, useAbility, useOrg, useDebounce, useBreakpoint
  features/                  # feature slices (state + api hooks + components)
    auth/  organizations/  users/  rbac/  billing/  featureFlags/
    audit/  notifications/  settings/  api-management/  superAdmin/  dashboard/
  components/                # reusable UI
    layout/ (Sidebar, Topbar, Breadcrumbs, OrgSwitcher, CommandPalette, NotificationsMenu, UserMenu, MobileDrawer)
    data/   (DataTable, AdvancedFilters, BulkActionsBar, ColumnPicker, ExportMenu)
    rbac/   (PermissionMatrix, RoleSelector, PermissionTree)
    org/    (HierarchyTree, MemberPicker)
    billing/(PlanCard, UsageMeter, SeatMeter, InvoiceTable)
    feedback/(EmptyState, ErrorState, SkeletonBlock, ConfirmDialog, StatusBadge)
    charts/ (KpiCard, LineCard, BarCard, AreaCard, DonutCard, ActivityFeed)
    forms/  (FormBuilder, FieldText, FieldSelect, FieldSwitch, FieldDate)
  routes/                    # route modules pairing loader + element
  guards/                    # RequireAuth, RequirePermission, RequireRole, RequireOrg
  mocks/                     # seed data: users, orgs, roles, invoices, audit, flags
  types/                     # shared TS types
  styles/                    # global.css, fonts
```

---

## 3. Routing Map

```text
PUBLIC
  /login                MFA-aware, social + SSO buttons
  /register             multi-step (account → org → invite team)
  /forgot-password
  /reset-password
  /mfa                  TOTP / SMS challenge
  /sso                  enterprise SSO entry (email → IdP discovery)
  /invite/:token        invitation acceptance
  /session-expired
  /select-organization  post-login org chooser

APP  (wrapped in <AppLayout/> + RequireAuth + RequireOrg)
  /                                  → /dashboard
  /dashboard                         KPIs, charts, activity, usage
  /organizations
    /                                list + filters
    /:orgId/overview
    /:orgId/hierarchy                tree + drag-drop
    /:orgId/departments
    /:orgId/teams
    /:orgId/branches
    /:orgId/members                  assign + invite + bulk import
  /users
    /                                DataGrid w/ filters, bulk, export
    /:userId/overview
    /:userId/activity
    /:userId/permissions
    /:userId/organizations
    /:userId/teams
    /:userId/devices
    /:userId/sessions
    /:userId/api-keys
    /:userId/onboarding
  /rbac
    /roles
    /roles/:id                       editor + dependency graph
    /permissions                     matrix
    /permissions/groups
    /scopes
  /billing
    /overview
    /plan                            upgrade/downgrade
    /invoices
    /payment-methods
    /seats
    /add-ons
    /usage
  /feature-flags
    /                                list + rollout
    /:flagId                         targeting rules, % rollout, env
  /audit-logs                        timeline, filter, export, risk
  /notifications                     center + preferences
  /settings
    /general /branding /email /security /api /webhooks /domains /smtp /sso /mfa
  /api
    /keys /webhooks /logs /rate-limits /docs
  /super-admin       (RequireRole=platform_admin)
    /tenants /analytics /revenue /global-users /impersonate
    /global-flags /system-health /platform-audit

ERROR
  /403 /404 /500   (also rendered via route errorElement)
```

All app routes are lazy-loaded via `React.lazy` and registered with `createBrowserRouter` data routes (loaders for breadcrumbs + permission checks, errorElement per route).

---

## 4. Authentication & Session

- Lovable Cloud is enabled. Auth providers: email/password + Google (via Lovable broker).
- A `profiles` table (id FK → `auth.users`, full_name, avatar_url, default_org_id, locale, created_at) with RLS (`auth.uid() = id`) and a signup trigger to auto-create the row.
- A separate `user_roles` table + `app_role` enum (`platform_admin`, `org_admin`, `member`) + `has_role()` SECURITY DEFINER function (per the security guidance — roles are NEVER stored on profiles).
- Redux `authSlice` mirrors the Supabase session; `onAuthStateChange` listener syncs it and invalidates TanStack Query caches.
- `/reset-password` page handles the `type=recovery` flow.
- MFA, SSO, device/session pages are real UI wired to mock endpoints (Supabase MFA can be plugged in later without changing components).
- Axios interceptor injects bearer for the mock API layer; 401 → redirect to `/session-expired` and clear store.

---

## 5. Mock API Layer (production-shape)

Each `services/api/<resource>.ts` exports typed functions (`listUsers`, `createRole`, …) using Axios. A `lib/mockServer.ts` uses MSW (Mock Service Worker) to intercept requests in dev/preview and respond from `mocks/` seed data with realistic latency, pagination, filtering, and errors. Swapping to a real backend = disable MSW; no component changes.

Resources mocked: organizations, departments, teams, members, users, sessions, devices, api-keys, roles, permissions, scopes, plans, subscriptions, invoices, payment-methods, seats, add-ons, usage-metrics, feature-flags, audit-events, notifications, webhooks, tenants (super-admin), platform-metrics, system-health.

---

## 6. Permissions (CASL)

- `config/permissions.ts` defines the canonical action/subject catalog (`manage`, `read`, `update`, `delete`, `invite`, `impersonate` × `Organization`, `User`, `Role`, `Billing`, `FeatureFlag`, `AuditLog`, `Tenant`, …).
- `lib/casl.ts` builds an `AppAbility` from the current user's role assignments and active org scope.
- `<Can I="update" a="Role">`, `useAbility()`, and `<RequirePermission/>` route guard.
- Sidebar nav schema declares required ability per item → menu auto-filters.
- Permission Matrix page edits abilities and previews the resulting CASL rules.

---

## 7. Layout & Navigation

- **Sidebar**: collapsible (icon-only mini), grouped sections, org switcher pinned at top, search shortcut, sticky user menu at bottom. Framer Motion width transition.
- **Topbar**: breadcrumb (built from route handles), command palette trigger (⌘K), global search, notifications, help, theme toggle, user avatar.
- **Command palette**: navigate, switch org, run actions (invite user, create role, toggle flag), recent items, fuzzy search across mocked entities.
- **Mobile**: temporary `Drawer`, bottom-sheet command palette, responsive DataTable → card list.
- **Breadcrumbs**: derived from `route.handle.crumb`.

---

## 8. Theming

- Two MUI themes (light/dark) sharing a token layer in `theme/tokens.ts`: neutrals (slate), brand (indigo→violet gradient), success/warn/danger/info, elevation shadows, 4/8/12 radius scale, 4px spacing grid.
- Typography: Inter (UI), JetBrains Mono (code/IDs), tight tracking on headings, 14px base.
- Global components overridden: Button (compact, no uppercase), Card (1px border + soft shadow), DataGrid (zebra off, dense option), Drawer/AppBar (blurred glass on scroll), Chip (status semantics).
- Stored preference in `localStorage` + Redux `uiSlice`.

---

## 9. Cross-Cutting

- **Error boundaries** at route level + global `<ErrorState/>`.
- **Skeletons** for every data view (`SkeletonTable`, `SkeletonChart`, `SkeletonCard`).
- **Empty states** with illustrations + primary CTA.
- **Snackbar** via `notistack` wired to a Redux `notify()` thunk.
- **Confirm dialogs** via a `useConfirm()` hook.
- **Export**: CSV/JSON utilities for DataTable.
- **Activity feed / Audit timeline**: shared component with filter chips and infinite scroll.

---

## 10. Build Order (single large turn)

1. Wipe TanStack Start scaffold; install MUI, RR v7, RTK, Query, RHF, Zod, CASL, Framer Motion, Axios, MSW, Recharts, notistack, cmdk, MUI DataGrid.
2. Configure Vite, theme, providers, store, query client, router shell, guards, MSW seed.
3. Enable Lovable Cloud → create `profiles`, `user_roles`, enum, trigger, RLS, `has_role()`. Implement auth pages + `/reset-password`.
4. Build layout (sidebar, topbar, breadcrumbs, command palette, org switcher, notifications, user menu, mobile drawer).
5. Build shared components (DataTable, filters, charts, KPI cards, PermissionMatrix, HierarchyTree, PlanCard, UsageMeter, AuditTimeline, FormBuilder, feedback states).
6. Build all feature modules in the routing map with mock data, filters, detail pages, and CRUD dialogs.
7. Wire CASL to nav + route guards + buttons; finalize role/permission demos.
8. Polish: motion, responsive passes, dark mode QA, empty/error states, keyboard shortcuts.

---

## 11. Out of Scope (called out explicitly)

- Real billing integration (Stripe). UI is Stripe-shaped but driven by mocks; can plug in later.
- Real SSO/MFA backend wiring beyond Lovable Cloud's email/password + Google. UI surfaces exist and are demo-ready.
- Server-side rendering. Pure SPA, as required by the new stack choice.
- Backend business logic. Only auth + minimal profile/role tables are real.

---

## 12. Technical Notes (for engineers)

- React Router v7 in framework-less mode (`createBrowserRouter` + `RouterProvider`).
- RTK Query is intentionally NOT used; TanStack Query handles server cache to match the spec.
- CASL ability is rebuilt on `auth/orgChanged` actions via a listener middleware.
- DataGrid uses server-side pagination contract; MSW honors `?page&pageSize&sort&filter`.
- MSW only runs in dev/preview (`if (import.meta.env.DEV) await worker.start()`).
- Strict TS, ESLint, Prettier already present — kept.
- Bundle split per route via `React.lazy`; charts dynamically imported.

After approval I'll execute the full build in one pass and surface anything that needs your decision (e.g., brand color) inline.
