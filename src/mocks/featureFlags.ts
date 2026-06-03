import { daysAgo } from "./seed";

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rollout: number;
  environments: { name: string; enabled: boolean }[];
  tags: string[];
  owner: string;
  updated: string;
  type: "release" | "experiment" | "kill-switch" | "permission";
}

export const featureFlags: FeatureFlag[] = [
  { id: "ff_1", key: "checkout-v2", name: "Checkout v2", description: "New three-step checkout funnel with Apple Pay", enabled: true, rollout: 50, environments: [{ name: "production", enabled: true }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["payments", "growth"], owner: "Sarah Chen", updated: daysAgo(2), type: "release" },
  { id: "ff_2", key: "ai-suggestions", name: "AI Suggestions Sidebar", description: "Show contextual AI suggestions in editor", enabled: true, rollout: 100, environments: [{ name: "production", enabled: true }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["ai", "editor"], owner: "Lin Park", updated: daysAgo(5), type: "release" },
  { id: "ff_3", key: "new-onboarding", name: "Personalized Onboarding", description: "Personalized first-run experience based on role", enabled: false, rollout: 0, environments: [{ name: "production", enabled: false }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["onboarding"], owner: "Maya Wright", updated: daysAgo(8), type: "experiment" },
  { id: "ff_4", key: "kill-realtime", name: "Disable Realtime", description: "Emergency kill switch for the realtime websocket subsystem", enabled: false, rollout: 0, environments: [{ name: "production", enabled: false }, { name: "staging", enabled: false }, { name: "dev", enabled: false }], tags: ["safety", "realtime"], owner: "Platform", updated: daysAgo(60), type: "kill-switch" },
  { id: "ff_5", key: "beta-billing-portal", name: "Beta Billing Portal", description: "Self-serve subscription portal", enabled: true, rollout: 25, environments: [{ name: "production", enabled: true }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["billing", "beta"], owner: "Hannah Reed", updated: daysAgo(1), type: "release" },
  { id: "ff_6", key: "scim-provisioning", name: "SCIM Provisioning", description: "Enterprise SCIM 2.0 user provisioning", enabled: true, rollout: 100, environments: [{ name: "production", enabled: true }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["enterprise", "permission"], owner: "Platform", updated: daysAgo(14), type: "permission" },
  { id: "ff_7", key: "dark-mode-v3", name: "Dark Mode v3", description: "Refined dark mode palette with OLED-optimized blacks", enabled: true, rollout: 100, environments: [{ name: "production", enabled: true }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["ui"], owner: "Design", updated: daysAgo(20), type: "release" },
  { id: "ff_8", key: "vector-search", name: "Vector Search", description: "Semantic search across knowledge base", enabled: false, rollout: 5, environments: [{ name: "production", enabled: false }, { name: "staging", enabled: true }, { name: "dev", enabled: true }], tags: ["ai", "search"], owner: "Lin Park", updated: daysAgo(3), type: "experiment" },
];
