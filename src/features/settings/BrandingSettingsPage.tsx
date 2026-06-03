import { Grid, Stack, TextField, Box, Typography, Button } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";
import { Logo } from "@/components/layout/Logo";

export default function BrandingSettingsPage() {
  return (
    <SettingsTabs title="Branding">
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Brand identity">
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: "primary.main", display: "grid", placeItems: "center", color: "white" }}><Logo size={36} /></Box>
                <Stack><Typography fontWeight={600}>Workspace logo</Typography><Typography variant="caption" color="text.secondary">PNG or SVG · 512×512 recommended</Typography></Stack>
                <Button variant="outlined" size="small">Upload</Button>
              </Stack>
              <TextField label="Primary color" defaultValue="#6366f1" />
              <TextField label="Accent color" defaultValue="#a855f7" />
              <TextField label="Custom CSS (optional)" multiline rows={4} placeholder=":root { --custom: ... }" />
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Preview">
            <Box sx={{ p: 3, borderRadius: 2, background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "white", textAlign: "center" }}>
              <Logo size={48} />
              <Typography variant="h6" sx={{ mt: 1 }}>Acme Corp</Typography>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </SettingsTabs>
  );
}
