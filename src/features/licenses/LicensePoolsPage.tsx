import { Box, Button, Card, Grid, Stack, Typography, LinearProgress, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, Settings2 } from "lucide-react";
import { pools } from "@/mocks/licenses";

export default function LicensePoolsPage() {
  return (
    <Box>
      <PageHeader
        title="License pools"
        subtitle="Group seats by product and allocate to organizations"
        actions={<Button startIcon={<Plus size={16} />} variant="contained">Create pool</Button>}
      />
      <Grid container spacing={2}>
        {pools.map((p) => {
          const pct = Math.round((p.allocated / p.totalSeats) * 100);
          return (
            <Grid item xs={12} md={6} key={p.id}>
              <Card sx={{ p: 2.5, height: "100%" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>{p.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{p.product}</Typography>
                  </Box>
                  <Chip size="small" label={`${p.organizations} orgs`} variant="outlined" />
                </Stack>
                <Box sx={{ mt: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption">Allocated</Typography>
                    <Typography variant="caption">{p.allocated} / {p.totalSeats} ({pct}%)</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 999 }} />
                </Box>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}><Typography variant="caption" color="text.secondary">Total</Typography><Typography fontWeight={700}>{p.totalSeats}</Typography></Grid>
                  <Grid item xs={4}><Typography variant="caption" color="text.secondary">Used</Typography><Typography fontWeight={700}>{p.allocated}</Typography></Grid>
                  <Grid item xs={4}><Typography variant="caption" color="text.secondary">Free</Typography><Typography fontWeight={700} color="success.main">{p.available}</Typography></Grid>
                </Grid>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button fullWidth variant="outlined" startIcon={<Settings2 size={14} />}>Manage</Button>
                  <Button fullWidth variant="contained">Allocate</Button>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
