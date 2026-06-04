import { L } from "@/app/routes/lazyRoute";

export const publicRoutes = [
  {
    path: "/login",
    element: L(() => import("@/features/auth/pages/LoginPage")),
  },
  {
    path: "/register",
    element: L(() => import("@/features/auth/pages/RegisterPage")),
  },
  {
    path: "/forgot-password",
    element: L(() => import("@/features/auth/pages/ForgotPasswordPage")),
  },
  {
    path: "/reset-password",
    element: L(() => import("@/features/auth/pages/ResetPasswordPage")),
  },
  {
    path: "/mfa",
    element: L(() => import("@/features/auth/pages/MfaPage")),
  },
  {
    path: "/sso",
    element: L(() => import("@/features/auth/pages/SsoPage")),
  },
  {
    path: "/invite/:token",
    element: L(() => import("@/features/auth/pages/InvitePage")),
  },
  {
    path: "/session-expired",
    element: L(() => import("@/features/auth/pages/SessionExpiredPage")),
  },
  {
    path: "/select-organization",
    element: L(() => import("@/features/auth/pages/SelectOrganizationPage")),
  },
];