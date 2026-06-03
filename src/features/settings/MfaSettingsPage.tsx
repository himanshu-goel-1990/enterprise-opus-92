import { Stack, Card, Typography, Switch, Chip } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";

const methods = [
  { name: "Authenticator app (TOTP)", desc: "Google Authenticator, 1Password, Authy", on: true, recommended: true },
  { name: "Hardware security keys (WebAuthn)", desc: "YubiKey, Titan, biometric Touch ID", on: true, recommended: true },
  { name: "SMS one-time codes", desc: "Less secure — only as fallback", on: false },
  { name: "Email magic links", desc: "Single-use links sent via email", on: false },
];

export default function MfaSettingsPage() {
  return (
    <SettingsTabs title="MFA">
      <SectionCard title="Allowed second factors">
        <Stack spacing={1}>
          {methods.map((m) => (
            <Card key={m.name} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <div style={{ flex: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight={600}>{m.name}</Typography>
                    {m.recommended && <Chip size="small" label="Recommended" color="success" />}
                  </Stack>
                  <Typography variant="caption" color="text.secondary">{m.desc}</Typography>
                </div>
                <Switch defaultChecked={m.on} />
              </Stack>
            </Card>
          ))}
        </Stack>
      </SectionCard>
    </SettingsTabs>
  );
}
