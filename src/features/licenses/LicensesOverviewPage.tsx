import { Box, Grid, Card, Stack, Typography, LinearProgress, Chip, Button } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/common/KpiCard";
import { SectionCard } from "@/components/common/SectionCard";
import { KeySquare, Users, AlarmClock, ShieldAlert, Download, Plus } from "lucide-react";
import { licenses, pools } from "@/mocks/licenses";
import { useNavigate } from "react-router-dom";

export default function LicensesOverviewPage() {
  const nav = useNavigate();
  const totalSeats = licenses.reduce((s, l) => s + l.seatsTotal, 0);
  const usedSeats = licenses.reduce((s, l) => s + l.seatsUsed, 0);
  const expiring = licenses.filter((l) => l.status === "expiring").length;
  const expired = licenses.filter((l) => l.status === "expired").length;

  return (
    <Box>
      <PageHeader
        title="License Management"
        subtitle="Track seats, allocations, and renewals across all products"
        actions={
          <>
            <Button startIcon={<Download size={16} />} variant="outlined">Export</Button>
            <Button startIcon={<Plus size={16} />} variant="contained" onClick={() => nav("/licenses/list")}>Issue license</Button>
          </>
        }
      />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Active licenses" value={String(licenses.filter((l) => l.status === "active").length)} icon={KeySquare} delta={3} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Seats in use" value={`${usedSeats} / ${totalSeats}`} icon={Users} delta={Math.round((usedSeats / totalSeats) * 100)} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Expiring < 30d" value={String(expiring)} icon={AlarmClock} delta={-12} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Compliance issues" value={String(expired)} icon={ShieldAlert} delta={-5} /></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <SectionCard title="License pools" subtitle="Allocated capacity by product" action={<Button size="small" onClick={() => nav("/licenses/pools")}>Manage pools</Button>}>
            <Stack spacing={2.5}>
              {pools.map((p) => {
                const pct = Math.round((p.allocated / p.totalSeats) * 100);
                return (
                  <Box key={p.id}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                      <Stack>
                        <Typography fontWeight={700} variant="body2">{p.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{p.product} · {p.organizations} organizations</Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">{p.allocated} / {p.totalSeats} ({pct}%)</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 999 }} />
                  </Box>
                );
              })}
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <SectionCard title="Upcoming renewals" action={<Button size="small" onClick={() => nav("/licenses/expirations")}>View all</Button>}>
            <Stack spacing={1.5}>
              {licenses.filter((l) => l.status === "expiring" || l.status === "expired").map((l) => (
                <Card key={l.id} variant="outlined" sx={{ p: 1.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{l.assignedOrg}</Typography>
                      <Typography variant="caption" color="text.secondary">{l.product} · {l.tier}</Typography>
                    </Box>
                    <Stack alignItems="flex-end">
                      <Chip size="small" label={l.status} color={l.status === "expired" ? "error" : "warning"} />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>{l.expiresAt}</Typography>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
