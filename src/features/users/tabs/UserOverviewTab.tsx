import { Grid, Stack, Typography, Card } from "@mui/material";
import { SectionCard } from "@/components/common/SectionCard";

export default function UserOverviewTab() {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={8}>
        <SectionCard title="Profile">
          <Grid container spacing={2}>
            {[
              ["First name", "Alex"], ["Last name", "Patel"], ["Job title", "Senior Engineer"],
              ["Department", "Platform"], ["Manager", "Sarah Chen"], ["Location", "San Francisco, US"],
              ["Hire date", "Jan 14, 2022"], ["Employee ID", "EMP-2042"],
            ].map(([k, v]) => (
              <Grid item xs={12} sm={6} key={k}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: ".06em", fontSize: 11 }}>{k}</Typography>
                <Typography fontWeight={600}>{v}</Typography>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <SectionCard title="Security">
            <Stack spacing={1}>
              <Row k="MFA" v="Enabled · TOTP" />
              <Row k="Last password change" v="42 days ago" />
              <Row k="Failed sign-ins" v="0 (30d)" />
            </Stack>
          </SectionCard>
          <SectionCard title="Onboarding">
            <Stack spacing={1}>
              <Row k="Profile" v="100%" />
              <Row k="Team setup" v="100%" />
              <Row k="First action" v="Completed" />
            </Stack>
          </SectionCard>
        </Stack>
      </Grid>
    </Grid>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">{k}</Typography><Typography variant="body2" fontWeight={600}>{v}</Typography></Stack>
  );
}
