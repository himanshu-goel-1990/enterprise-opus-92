import { Stack, TextField, Grid, Switch, Typography } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

export default function ApiSettingsPage() {
  return (
    <SettingsTabs title="API">
      <Stack spacing={2.5}>
        <SectionCard title="Defaults">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField label="Default rate limit (req/min)" defaultValue={5000} fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="API version" defaultValue="2025-10-01" fullWidth /></Grid>
          </Grid>
        </SectionCard>
        <SectionCard title="Policies">
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between"><Typography>Require IP allow-list</Typography><Switch /></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Auto-rotate keys every 90 days</Typography><Switch defaultChecked /></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Log full request bodies</Typography><Switch /></Stack>
          </Stack>
        </SectionCard>
      </Stack>
    </SettingsTabs>
  );
}
