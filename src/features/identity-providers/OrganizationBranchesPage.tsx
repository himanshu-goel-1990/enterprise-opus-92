import { Box, Grid, Card, Stack, Typography, Chip, Button } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, MapPin } from "lucide-react";

const branches = [
  { name: "San Francisco HQ", region: "North America", country: "🇺🇸 United States", staff: 218, primary: true },
  { name: "London Office", region: "EMEA", country: "🇬🇧 United Kingdom", staff: 84 },
  { name: "Berlin Office", region: "EMEA", country: "🇩🇪 Germany", staff: 62 },
  { name: "Tokyo Office", region: "APAC", country: "🇯🇵 Japan", staff: 48 },
  { name: "Singapore Office", region: "APAC", country: "🇸🇬 Singapore", staff: 36 },
  { name: "Toronto Office", region: "North America", country: "🇨🇦 Canada", staff: 34 },
];

export default function OrganizationBranchesPage() {
  return (
    <Box>
      <PageHeader title="Branches" subtitle="Global offices and subsidiaries" actions={<Button startIcon={<Plus size={16} />} variant="contained">Add branch</Button>} />
      <Grid container spacing={2}>
        {branches.map((b) => (
          <Grid item xs={12} sm={6} md={4} key={b.name}>
            <Card sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center"><Typography fontWeight={700}>{b.name}</Typography>{b.primary && <Chip size="small" label="HQ" color="primary" />}</Stack>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, color: "text.secondary" }} alignItems="center"><MapPin size={12} /><Typography variant="caption">{b.country} · {b.region}</Typography></Stack>
                </Box>
              </Stack>
              <Typography variant="caption" color="text.secondary">Staff</Typography>
              <Typography variant="h5" fontWeight={800}>{b.staff}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
