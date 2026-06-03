import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAppDispatch, setUser, clearUser, setAuthLoading } from "@/app/store";
import { queryClient } from "@/lib/queryClient";

export function AuthBootstrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthLoading());

    const hydrate = (session: { user?: { id: string; email?: string; user_metadata?: Record<string, unknown> } } | null) => {
      if (session?.user) {
        const meta = (session.user.user_metadata ?? {}) as Record<string, string>;
        dispatch(
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            fullName: meta.full_name || meta.name || (session.user.email?.split("@")[0] ?? "User"),
            avatarUrl: meta.avatar_url,
            // Demo: first user is treated as platform_admin so RBAC and Super Admin demos work.
            role: "platform_admin",
          }),
        );
      } else {
        dispatch(clearUser());
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      hydrate(session);
      queryClient.invalidateQueries();
    });

    supabase.auth.getSession().then(({ data }) => hydrate(data.session));

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
