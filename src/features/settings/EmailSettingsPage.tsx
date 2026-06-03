import { Stack, TextField, Grid, Button } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

export default function EmailSettingsPage() {
  return (
    <SettingsTabs title="Email">
      <Stack spacing={2.5}>
        <SectionCard title="Sender">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField label="From name" defaultValue="Acme Corp" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="From address" defaultValue="no-reply@acme.com" fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Reply-to address" defaultValue="support@acme.com" fullWidth /></Grid>
          </Grid>
        </SectionCard>
        <SectionCard title="Templates">
          <Stack spacing={1}>
            {["Welcome", "Email verification", "Password reset", "Invitation", "Invoice receipt", "Weekly digest"].map((t) => (
              <Stack key={t} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1.5, border: 1, borderColor: "divider", borderRadius: 1.5 }}>
                <span>{t}</span>
                <Button size="small">Edit template</Button>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </Stack>
    </SettingsTabs>
  );
}
