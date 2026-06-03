import { Stack, TextField, Grid, Card, Typography, Chip, Button } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

const providers = [
  { name: "Okta", status: "active", users: 218 },
  { name: "Azure AD", status: "inactive", users: 0 },
  { name: "Google Workspace", status: "active", users: 64 },
  { name: "OneLogin", status: "inactive", users: 0 },
  { name: "Generic SAML 2.0", status: "inactive", users: 0 },
];

export default function SsoSettingsPage() {
  return (
    <SettingsTabs title="SSO">
      <Stack spacing={2.5}>
        <SectionCard title="Identity providers">
          <Stack spacing={1}>
            {providers.map((p) => (
              <Card key={p.name} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography sx={{ flex: 1, fontWeight: 600 }}>{p.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{p.users} users</Typography>
                  <Chip size="small" label={p.status} color={p.status === "active" ? "success" : "default"} />
                  <Button size="small">{p.status === "active" ? "Configure" : "Connect"}</Button>
                </Stack>
              </Card>
            ))}
          </Stack>
        </SectionCard>
        <SectionCard title="SCIM provisioning">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}><TextField label="SCIM endpoint" defaultValue="https://acme.northstar.app/scim/v2" fullWidth InputProps={{ readOnly: true, sx: { fontFamily: "monospace" } }} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Bearer token" defaultValue="scim_********************" fullWidth InputProps={{ readOnly: true, sx: { fontFamily: "monospace" } }} /></Grid>
          </Grid>
        </SectionCard>
      </Stack>
    </SettingsTabs>
  );
}
