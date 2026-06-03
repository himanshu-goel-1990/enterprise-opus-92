import { Stack, Switch, Typography, TextField, Grid } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

export default function SecuritySettingsPage() {
  return (
    <SettingsTabs title="Security">
      <Stack spacing={2.5}>
        <SectionCard title="Authentication policies">
          {[
            ["Enforce MFA for all members", true],
            ["Allow social logins (Google, Apple)", true],
            ["Block sign-ins from anonymous proxies (Tor)", true],
            ["Require strong passwords (12+ chars, mixed)", true],
            ["Auto-revoke inactive sessions after 30 days", false],
          ].map(([label, on]) => (
            <Stack key={label as string} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
              <Typography>{label}</Typography>
              <Switch defaultChecked={on as boolean} />
            </Stack>
          ))}
        </SectionCard>
        <SectionCard title="Session lifetime">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField label="Idle timeout (minutes)" defaultValue={30} type="number" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Absolute lifetime (hours)" defaultValue={12} type="number" fullWidth /></Grid>
          </Grid>
        </SectionCard>
      </Stack>
    </SettingsTabs>
  );
}
