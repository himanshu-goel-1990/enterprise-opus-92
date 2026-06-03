import { Box, Grid, Card, Stack, Typography, Button, Chip, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Check } from "lucide-react";
import { plans } from "@/mocks/billing";
import { useState } from "react";
import { formatCurrency } from "@/lib/date";

export default function PlanPage() {
  const [cycle, setCycle] = useState<"month" | "year">("month");
  return (
    <Box>
      <PageHeader title="Choose your plan" subtitle="Upgrade, downgrade, or switch to annual billing for 20% off" />
      <Stack alignItems="center" sx={{ mb: 3 }}>
        <ToggleButtonGroup size="small" value={cycle} exclusive onChange={(_, v) => v && setCycle(v)}>
          <ToggleButton value="month">Monthly</ToggleButton>
          <ToggleButton value="year">Annual · save 20%</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Grid container spacing={2}>
        {plans.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card sx={{ p: 3, height: "100%", position: "relative", borderColor: p.highlight ? "primary.main" : "divider", borderWidth: p.highlight ? 2 : 1 }}>
              {p.highlight && <Chip size="small" label="Most popular" color="primary" sx={{ position: "absolute", top: -10, right: 14 }} />}
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: ".08em" }}>{p.name}</Typography>
              <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                {p.price === 0 ? (p.id === "enterprise" ? "Custom" : "Free") : formatCurrency(cycle === "year" ? Math.round(p.price * 12 * 0.8) : p.price)}
                {p.price !== 0 && <Box component="span" sx={{ fontSize: 13, color: "text.secondary", fontWeight: 500 }}> / {cycle === "year" ? "year" : "mo"}</Box>}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, minHeight: 32 }}>{p.tagline}</Typography>
              <Button fullWidth variant={p.highlight ? "contained" : "outlined"} sx={{ my: 2 }}>{p.cta}</Button>
              <Stack spacing={1}>
                {p.features.map((f) => (
                  <Stack key={f} direction="row" spacing={1} alignItems="flex-start">
                    <Check size={14} style={{ marginTop: 4, color: "#10b981", flexShrink: 0 }} />
                    <Typography variant="body2">{f}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
