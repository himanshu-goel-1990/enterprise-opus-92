import { Stack, TextField, Grid, MenuItem, Button } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

export default function GeneralSettingsPage() {
  return (
    <SettingsTabs title="General">
      <Stack spacing={2.5}>
        <SectionCard title="Workspace">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField label="Workspace name" defaultValue="Acme Corp" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Workspace URL" defaultValue="acme.northstar.app" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Default region" select defaultValue="us-east-1" fullWidth>{["us-east-1","us-west-2","eu-central-1","ap-northeast-1"].map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField></Grid>
            <Grid item xs={12} md={6}><TextField label="Time zone" select defaultValue="America/Los_Angeles" fullWidth>{["America/Los_Angeles","America/New_York","Europe/Berlin","Asia/Tokyo"].map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField></Grid>
          </Grid>
        </SectionCard>
        <SectionCard title="Localization">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField label="Default language" select defaultValue="en-US" fullWidth>{["en-US","de-DE","fr-FR","ja-JP","pt-BR"].map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField></Grid>
            <Grid item xs={12} md={6}><TextField label="Date format" select defaultValue="MM/DD/YYYY" fullWidth>{["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"].map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField></Grid>
          </Grid>
        </SectionCard>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="outlined">Discard</Button>
          <Button variant="contained">Save changes</Button>
        </Stack>
      </Stack>
    </SettingsTabs>
  );
}
