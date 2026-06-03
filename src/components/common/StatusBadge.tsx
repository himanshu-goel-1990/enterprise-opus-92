import { Box, Stack } from "@mui/material";

const COLORS: Record<string, { bg: string; fg: string }> = {
  active: { bg: "rgba(16,185,129,.15)", fg: "#10b981" },
  paid: { bg: "rgba(16,185,129,.15)", fg: "#10b981" },
  trialing: { bg: "rgba(59,130,246,.15)", fg: "#3b82f6" },
  invited: { bg: "rgba(59,130,246,.15)", fg: "#3b82f6" },
  open: { bg: "rgba(245,158,11,.15)", fg: "#f59e0b" },
  past_due: { bg: "rgba(245,158,11,.15)", fg: "#f59e0b" },
  suspended: { bg: "rgba(239,68,68,.15)", fg: "#ef4444" },
  deactivated: { bg: "rgba(148,163,184,.18)", fg: "#94a3b8" },
  void: { bg: "rgba(148,163,184,.18)", fg: "#94a3b8" },
  uncollectible: { bg: "rgba(239,68,68,.15)", fg: "#ef4444" },
  low: { bg: "rgba(16,185,129,.15)", fg: "#10b981" },
  medium: { bg: "rgba(245,158,11,.15)", fg: "#f59e0b" },
  high: { bg: "rgba(239,68,68,.15)", fg: "#ef4444" },
};

export function StatusBadge({ status }: { status: string }) {
  const c = COLORS[status] ?? { bg: "rgba(148,163,184,.18)", fg: "#94a3b8" };
  return (
    <Stack direction="row" alignItems="center" spacing={0.75} sx={{ display: "inline-flex", px: 1, py: 0.25, borderRadius: 999, bgcolor: c.bg, color: c.fg, fontSize: 11, fontWeight: 600, textTransform: "capitalize" }}>
      <Box sx={{ width: 6, height: 6, borderRadius: 999, bgcolor: c.fg }} className={status === "active" || status === "trialing" ? "pulse-dot" : undefined} />
      {status.replace(/_/g, " ")}
    </Stack>
  );
}
