import { hoursAgo } from "./seed";

export interface MockNotification {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
  icon: string;
  color: string;
  type: "billing" | "security" | "org" | "system" | "mention";
}

export const mockNotifications: MockNotification[] = [
  { id: "n1", title: "Invoice #INV-2042 paid", body: "$2,400.00 charged to Visa ending 4242", at: hoursAgo(0.5), read: false, icon: "💳", color: "#10b981", type: "billing" },
  { id: "n2", title: "New device sign-in", body: "MacBook Pro · San Francisco, US", at: hoursAgo(2), read: false, icon: "🔐", color: "#f59e0b", type: "security" },
  { id: "n3", title: "Jordan Patel joined Engineering", body: "Auto-assigned Developer role", at: hoursAgo(6), read: false, icon: "👥", color: "#6366f1", type: "org" },
  { id: "n4", title: "API rate limit increased", body: "Now 50,000 req/min on Enterprise plan", at: hoursAgo(20), read: true, icon: "⚡", color: "#a855f7", type: "system" },
  { id: "n5", title: "Feature flag rolled out to 50%", body: "checkout-v2 → +50% of Pro tenants", at: hoursAgo(28), read: true, icon: "🚩", color: "#3b82f6", type: "system" },
  { id: "n6", title: "Avery Kim mentioned you", body: "in 'Q3 OKR review' comment", at: hoursAgo(46), read: true, icon: "💬", color: "#ec4899", type: "mention" },
  { id: "n7", title: "Suspicious login blocked", body: "Tor exit node from RU — blocked by policy", at: hoursAgo(60), read: true, icon: "🛡️", color: "#ef4444", type: "security" },
  { id: "n8", title: "Seat usage at 92%", body: "23 of 25 enterprise seats consumed", at: hoursAgo(80), read: true, icon: "📈", color: "#f59e0b", type: "billing" },
];
