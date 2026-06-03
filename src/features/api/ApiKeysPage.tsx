import { Box, Stack, Card, Typography, Button, Chip, IconButton } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, Copy, MoreHorizontal } from "lucide-react";

const keys = [
  { name: "Production API", prefix: "sk_live_8h2bsf3…", env: "Production", scopes: ["read","write","admin"], lastUsed: "2m ago", created: "Jan 14, 2024" },
  { name: "CI/CD bot", prefix: "sk_live_b32xms4…", env: "Production", scopes: ["write"], lastUsed: "1h ago", created: "Aug 9, 2023" },
  { name: "Local dev", prefix: "sk_test_a91axk2…", env: "Sandbox", scopes: ["read","write"], lastUsed: "Yesterday", created: "May 22, 2024" },
  { name: "Read-only reporting", prefix: "sk_live_r7tdf9k…", env: "Production", scopes: ["read"], lastUsed: "8d ago", created: "Mar 3, 2024" },
];

export default function ApiKeysPage() {
  return (
    <Box>
      <PageHeader title="API keys" subtitle="Manage workspace and personal API keys" actions={<Button startIcon={<Plus size={16} />} variant="contained">Create key</Button>} />
      <Stack spacing={1.25}>
        {keys.map((k) => (
          <Card key={k.name} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={700}>{k.name}</Typography>
                  <Chip size="small" label={k.env} color={k.env === "Production" ? "error" : "default"} />
                  {k.scopes.map((s) => <Chip key={s} size="small" label={s} variant="outlined" />)}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary" }}>{k.prefix}</Typography>
                  <IconButton size="small"><Copy size={12} /></IconButton>
                  <Typography variant="caption" color="text.secondary">· Created {k.created} · Last used {k.lastUsed}</Typography>
                </Stack>
              </Box>
              <Button size="small">Roll</Button>
              <Button size="small" color="error">Revoke</Button>
              <IconButton size="small"><MoreHorizontal size={16} /></IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
