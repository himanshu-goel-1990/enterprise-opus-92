import { lazy, Suspense } from "react";
import { RouteFallback } from "@/components/feedback/RouteFallback";

export const L = (loader: () => Promise<{ default: React.ComponentType }>) => {
  const Comp = lazy(loader);
  return (
    <Suspense fallback={<RouteFallback />}>
      <Comp />
    </Suspense>
  );
};