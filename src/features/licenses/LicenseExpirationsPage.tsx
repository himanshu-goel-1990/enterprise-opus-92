import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { licenses } from "@/mocks/licenses";
import { AlarmClock, RefreshCw } from "lucide-react";

function daysUntil(date: string) {
  const ms = new Date(date).getTime() - Date.now();
  return Math.round(ms / 86_400_000);
}

export default function LicenseExpirationsPage() {
  const sorted = [...licenses].sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
  const expired = sorted.filter((l) => daysUntil(l.expiresAt) < 0);
  const soon = sorted.filter((l) => daysUntil(l.expiresAt) >= 0 && daysUntil(l.expiresAt) <= 90);
  const later = sorted.filter((l) => daysUntil(l.expiresAt) > 90);

  const renderList = (items: typeof licenses) => (
    <Stack spacing={1.25}>
      {items.map((l) => {
        const d = daysUntil(l.expiresAt);
        return (
          <Card key={l.id} variant="outlined" sx={{ p: 1.75 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AlarmClock size={18} />
              <Box flex={1}>
                <Typography variant="body2" fontWeight={700}>{l.assignedOrg} — {l.product}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>{l.key} · {l.tier}</Typography>
              </Box>
              <Stack alignItems="flex-end">
                <Typography variant="body2">{l.expiresAt}</Typography>
                <Chip size="small" label={d < 0 ? `${Math.abs(d)}d ago` : `in ${d}d`} color={d < 0 ? "error" : d <= 30 ? "warning" : "default"} />
              </Stack>
              <Button size="small" startIcon={<RefreshCw size={14} />} variant="contained">Renew</Button>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );

  return (
    <Box>
      <PageHeader title="Renewals & expirations" subtitle="Stay ahead of expiring licenses" />
      <Stack spacing={2.5}>
        {expired.length > 0 && <SectionCard title="Expired" subtitle="Immediate action required">{renderList(expired)}</SectionCard>}
        {soon.length > 0 && <SectionCard title="Expiring within 90 days">{renderList(soon)}</SectionCard>}
        {later.length > 0 && <SectionCard title="Active & not due">{renderList(later)}</SectionCard>}
      </Stack>
    </Box>
  );
}
