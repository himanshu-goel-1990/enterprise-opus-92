import { Stack, Card, Typography, Button, Box } from "@mui/material";
import { SectionCard } from "@/components/common/SectionCard";
import { Plus } from "lucide-react";

const keys = [
  { name: "Production API", prefix: "sk_live_8h2…", created: "Jan 14, 2024", lastUsed: "2m ago" },
  { name: "Local dev", prefix: "sk_test_a91…", created: "May 22, 2024", lastUsed: "Yesterday" },
  { name: "CI/CD bot", prefix: "sk_live_b32…", created: "Aug 9, 2023", lastUsed: "32d ago" },
];

export default function UserApiKeysTab() {
  return (
    <SectionCard title="Personal API keys" action={<Button startIcon={<Plus size={14} />} variant="contained" size="small">New key</Button>}>
      <Stack spacing={1.25}>
        {keys.map((k) => (
          <Card key={k.name} sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={700}>{k.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>{k.prefix} · Created {k.created} · Last used {k.lastUsed}</Typography>
              </Box>
              <Button size="small">Roll</Button>
              <Button size="small" color="error">Revoke</Button>
            </Stack>
          </Card>
        ))}
      </Stack>
    </SectionCard>
  );
}
