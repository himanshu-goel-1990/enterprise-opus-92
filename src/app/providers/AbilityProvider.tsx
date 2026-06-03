import { createContext, useContext, useMemo } from "react";
import { createContextualCan } from "@casl/react";
import { buildAbility, type AppAbility } from "@/lib/casl";
import { useAppSelector } from "@/app/store";

const AbilityContext = createContext<AppAbility>(buildAbility("member"));
export const Can = createContextualCan(AbilityContext.Consumer);
export const useAbility = () => useContext(AbilityContext);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const role = useAppSelector((s) => s.auth.user?.role ?? "member");
  const ability = useMemo(() => buildAbility(role), [role]);
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
}
