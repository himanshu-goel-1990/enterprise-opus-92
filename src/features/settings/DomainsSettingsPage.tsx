import { Stack, Card, Typography, Button, Chip } from "@mui/material";
import { SettingsTabs } from "./_SettingsLayout";
import { SectionCard } from "@/components/common/SectionCard";
import { Plus } from "lucide-react";

export default function DomainsSettingsPage() {
  return (
    <SettingsTabs title="Domains">
      <SectionCard title="Custom domains" action={<Button startIcon={<Plus size={14} />} variant="contained" size="small">Add domain</Button>}>
        <Stack spacing={1}>
          {[
            { d: "app.acme.com", status: "verified", primary: true },
            { d: "console.acme.com", status: "pending", primary: false },
          ].map((d) => (
            <Card key={d.d} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography sx={{ flex: 1, fontFamily: "monospace" }}>{d.d}</Typography>
                {d.primary && <Chip size="small" label="Primary" color="primary" />}
                <Chip size="small" label={d.status} color={d.status === "verified" ? "success" : "warning"} />
                <Button size="small" color="error">Remove</Button>
              </Stack>
            </Card>
          ))}
        </Stack>
      </SectionCard>
    </SettingsTabs>
  );
}
