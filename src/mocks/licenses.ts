export type LicenseStatus = "active" | "expiring" | "expired" | "suspended";
export type LicenseTier = "Starter" | "Pro" | "Business" | "Enterprise";

export interface License {
  id: string;
  key: string;
  product: string;
  tier: LicenseTier;
  status: LicenseStatus;
  seatsTotal: number;
  seatsUsed: number;
  assignedOrg: string;
  owner: string;
  issuedAt: string;
  expiresAt: string;
  autoRenew: boolean;
}

export interface LicenseAssignment {
  id: string;
  licenseId: string;
  userEmail: string;
  userName: string;
  assignedAt: string;
  lastActive: string;
  device: string;
}

export interface LicensePool {
  id: string;
  name: string;
  product: string;
  totalSeats: number;
  allocated: number;
  available: number;
  organizations: number;
}

export interface LicenseActivation {
  id: string;
  licenseKey: string;
  device: string;
  ip: string;
  location: string;
  activatedAt: string;
  status: "online" | "offline" | "revoked";
}

export const licenses: License[] = [
  { id: "lic_001", key: "LCV-PRO-8H2B-SFXM-09KQ", product: "Lovable Platform", tier: "Pro", status: "active", seatsTotal: 25, seatsUsed: 18, assignedOrg: "Acme Corp", owner: "ana@acme.io", issuedAt: "2024-01-12", expiresAt: "2026-12-31", autoRenew: true },
  { id: "lic_002", key: "LCV-ENT-4F2K-9JX8-PLMQ", product: "Lovable Platform", tier: "Enterprise", status: "active", seatsTotal: 250, seatsUsed: 211, assignedOrg: "Globex Industries", owner: "ops@globex.com", issuedAt: "2023-06-01", expiresAt: "2027-05-31", autoRenew: true },
  { id: "lic_003", key: "LCV-BIZ-2P9D-LL3X-VR8N", product: "Analytics Add-on", tier: "Business", status: "expiring", seatsTotal: 50, seatsUsed: 42, assignedOrg: "Initech", owner: "lumbergh@initech.io", issuedAt: "2024-06-15", expiresAt: "2026-06-15", autoRenew: false },
  { id: "lic_004", key: "LCV-STR-XK22-7HQM-1AAQ", product: "Lovable Platform", tier: "Starter", status: "active", seatsTotal: 5, seatsUsed: 5, assignedOrg: "Hooli", owner: "gavin@hooli.xyz", issuedAt: "2025-02-01", expiresAt: "2026-02-01", autoRenew: true },
  { id: "lic_005", key: "LCV-PRO-G19A-BBNQ-RR2D", product: "AI Gateway", tier: "Pro", status: "expired", seatsTotal: 10, seatsUsed: 0, assignedOrg: "Stark Industries", owner: "pepper@stark.io", issuedAt: "2023-04-10", expiresAt: "2025-04-10", autoRenew: false },
  { id: "lic_006", key: "LCV-ENT-MM8H-2QJZ-7XPR", product: "Lovable Platform", tier: "Enterprise", status: "suspended", seatsTotal: 100, seatsUsed: 0, assignedOrg: "Umbrella", owner: "wesker@umbrella.com", issuedAt: "2024-09-22", expiresAt: "2026-09-22", autoRenew: true },
  { id: "lic_007", key: "LCV-BIZ-77HG-DKL2-NN0X", product: "SSO Add-on", tier: "Business", status: "active", seatsTotal: 75, seatsUsed: 60, assignedOrg: "Wayne Enterprises", owner: "lucius@wayne.com", issuedAt: "2025-01-04", expiresAt: "2026-12-31", autoRenew: true },
  { id: "lic_008", key: "LCV-PRO-RXC8-BBVN-2KS9", product: "Lovable Platform", tier: "Pro", status: "expiring", seatsTotal: 30, seatsUsed: 27, assignedOrg: "Pied Piper", owner: "richard@piedpiper.com", issuedAt: "2024-05-18", expiresAt: "2026-05-30", autoRenew: false },
];

export const assignments: LicenseAssignment[] = [
  { id: "as_1", licenseId: "lic_001", userEmail: "ana@acme.io", userName: "Ana Hsu", assignedAt: "2024-01-12", lastActive: "2m ago", device: "MacBook Pro" },
  { id: "as_2", licenseId: "lic_001", userEmail: "ben@acme.io", userName: "Ben Carter", assignedAt: "2024-02-04", lastActive: "1h ago", device: "Windows Laptop" },
  { id: "as_3", licenseId: "lic_002", userEmail: "ops@globex.com", userName: "Olivia Park", assignedAt: "2023-06-01", lastActive: "5m ago", device: "iMac" },
  { id: "as_4", licenseId: "lic_002", userEmail: "rd@globex.com", userName: "Ravi Desai", assignedAt: "2023-07-12", lastActive: "Yesterday", device: "Linux Workstation" },
  { id: "as_5", licenseId: "lic_003", userEmail: "lumbergh@initech.io", userName: "Bill L.", assignedAt: "2024-06-15", lastActive: "3d ago", device: "MacBook Air" },
  { id: "as_6", licenseId: "lic_007", userEmail: "lucius@wayne.com", userName: "Lucius Fox", assignedAt: "2025-01-04", lastActive: "12m ago", device: "Mac Studio" },
];

export const pools: LicensePool[] = [
  { id: "p_1", name: "Platform — Global Pool", product: "Lovable Platform", totalSeats: 500, allocated: 411, available: 89, organizations: 12 },
  { id: "p_2", name: "Analytics Add-on Pool", product: "Analytics Add-on", totalSeats: 200, allocated: 142, available: 58, organizations: 6 },
  { id: "p_3", name: "AI Gateway Pool", product: "AI Gateway", totalSeats: 100, allocated: 60, available: 40, organizations: 4 },
  { id: "p_4", name: "SSO Add-on Pool", product: "SSO Add-on", totalSeats: 150, allocated: 120, available: 30, organizations: 8 },
];

export const activations: LicenseActivation[] = [
  { id: "act_1", licenseKey: "LCV-PRO-8H2B-SFXM-09KQ", device: "MacBook Pro · macOS 14.5", ip: "203.0.113.24", location: "San Francisco, US", activatedAt: "2025-03-12 09:14", status: "online" },
  { id: "act_2", licenseKey: "LCV-PRO-8H2B-SFXM-09KQ", device: "iPhone 15 Pro · iOS 18", ip: "198.51.100.7", location: "San Francisco, US", activatedAt: "2025-03-14 18:02", status: "online" },
  { id: "act_3", licenseKey: "LCV-ENT-4F2K-9JX8-PLMQ", device: "Windows 11 · Edge", ip: "192.0.2.55", location: "Berlin, DE", activatedAt: "2025-02-28 11:42", status: "offline" },
  { id: "act_4", licenseKey: "LCV-BIZ-2P9D-LL3X-VR8N", device: "Ubuntu 24.04 · Chrome", ip: "203.0.113.91", location: "London, UK", activatedAt: "2025-01-21 07:30", status: "online" },
  { id: "act_5", licenseKey: "LCV-PRO-G19A-BBNQ-RR2D", device: "MacBook Air", ip: "198.51.100.122", location: "Toronto, CA", activatedAt: "2024-11-09 22:11", status: "revoked" },
];
