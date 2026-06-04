import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/store";

export function RequireRole({
  role,
  children,
}: {
  role: "platform_admin" | "org_admin" | "member";
  children: React.ReactNode;
}) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role && user.role !== "platform_admin") return <Navigate to="/403" replace />;
  return <>{children}</>;
}

export const usePermissions = () => {
  const permissions = useAppSelector((state) => state.auth.permissions || []);

  return {
    permissions,

    can: (permission: string) => permissions.includes(permission),

    canAny: (required: string[]) => required.some((p) => permissions.includes(p)),

    canAll: (required: string[]) => required.every((p) => permissions.includes(p)),
  };
};
