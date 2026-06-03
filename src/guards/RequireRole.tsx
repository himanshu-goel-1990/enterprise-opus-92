import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/store";

export function RequireRole({ role, children }: { role: "platform_admin" | "org_admin" | "member"; children: React.ReactNode }) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role && user.role !== "platform_admin") return <Navigate to="/403" replace />;
  return <>{children}</>;
}
