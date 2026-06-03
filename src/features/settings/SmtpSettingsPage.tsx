import { Stack, TextField, Grid, Switch, Button, Typography } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

export default function SmtpSettingsPage() {
  return (
    <SettingsTabs title="SMTP">
      <SectionCard title="Custom SMTP" action={<Button variant="outlined" size="small">Send test email</Button>}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between"><Typography>Use custom SMTP server</Typography><Switch defaultChecked /></Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}><TextField label="Host" defaultValue="smtp.sendgrid.net" fullWidth /></Grid>
            <Grid item xs={12} md={4}><TextField label="Port" defaultValue={587} fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Username" defaultValue="apikey" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Password" type="password" defaultValue="••••••••••••" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Encryption" select defaultValue="tls" fullWidth /></Grid>
          </Grid>
        </Stack>
      </SectionCard>
    </SettingsTabs>
  );
}
