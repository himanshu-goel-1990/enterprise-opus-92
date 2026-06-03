import { Box, Grid, Card, Stack, Typography, Switch, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { formatCurrency } from "@/lib/date";

const addons = [
  { name: "Premium support", desc: "Dedicated CSM and 24/7 priority response", price: 499, enabled: true },
  { name: "Extra storage · 500 GB", desc: "Block storage attached to your workspace", price: 49, enabled: false },
  { name: "SCIM provisioning", desc: "Automated user provisioning via SCIM 2.0", price: 99, enabled: true },
  { name: "Audit log retention · 7y", desc: "Extended retention for compliance audits", price: 199, enabled: false },
  { name: "Data residency · EU", desc: "Keep all data physically inside the European Union", price: 299, enabled: true },
  { name: "Custom domain", desc: "Serve the app from your own subdomain", price: 29, enabled: false },
];

export default function AddOnsPage() {
  return (
    <Box>
      <PageHeader title="Add-ons" subtitle="Optional extras for your subscription" />
      <Grid container spacing={2}>
        {addons.map((a) => (
          <Grid item xs={12} md={6} key={a.name}>
            <Card sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography fontWeight={700}>{a.name}</Typography>
                    {a.enabled && <Chip size="small" label="Active" color="success" />}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{a.desc}</Typography>
                  <Typography variant="caption" color="primary.main" sx={{ display: "block", mt: 1 }}>{formatCurrency(a.price)}/month</Typography>
                </Box>
                <Switch defaultChecked={a.enabled} />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
