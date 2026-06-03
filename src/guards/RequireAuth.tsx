import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { RouteFallback } from "@/components/feedback/RouteFallback";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  // const { status } = useAppSelector((s) => s.auth);
  // const location = useLocation();
  // if (status === "idle" || status === "loading") return <RouteFallback />;
  // if (status === "unauthenticated") {
  //   return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  // }


  const token = localStorage.getItem("token")
  if(!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
