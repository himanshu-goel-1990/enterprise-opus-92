import { Box, Grid, Stack, Card, Typography, LinearProgress } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";

const tiers = [
  { name: "REST API · standard", used: 38_000, total: 60_000 },
  { name: "REST API · search", used: 4_200, total: 6_000 },
  { name: "Webhooks delivery", used: 920, total: 5_000 },
  { name: "GraphQL queries", used: 12_400, total: 30_000 },
];

export default function RateLimitsPage() {
  return (
    <Box>
      <PageHeader title="Rate limits" subtitle="Per-minute quotas across API surfaces" />
      <Grid container spacing={2}>
        {tiers.map((t) => {
          const pct = (t.used / t.total) * 100;
          return (
            <Grid item xs={12} md={6} key={t.name}>
              <Card sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography fontWeight={600}>{t.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{t.used.toLocaleString()} / {t.total.toLocaleString()}</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 999, "& .MuiLinearProgress-bar": { background: pct > 80 ? "linear-gradient(90deg,#f59e0b,#ef4444)" : "linear-gradient(90deg,#6366f1,#a855f7)" } }} />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
