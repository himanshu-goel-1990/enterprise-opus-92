import { Box, Card, Stack, Typography, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";

const scopes = [
  { name: "Global", desc: "Applies across all organizations and tenants", color: "#a855f7" },
  { name: "Organization", desc: "Scoped to a single organization workspace", color: "#6366f1" },
  { name: "Team", desc: "Scoped to a team within an organization", color: "#10b981" },
  { name: "Project", desc: "Scoped to a single project resource", color: "#f59e0b" },
  { name: "Resource", desc: "Scoped to a single instance of a resource", color: "#ef4444" },
];

export default function ScopesPage() {
  return (
    <Box>
      <PageHeader title="Scopes" subtitle="Each role and permission can be limited to a scope" />
      <Stack spacing={1.5}>
        {scopes.map((s) => (
          <Card key={s.name} sx={{ p: 2.5 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 4, height: 36, bgcolor: s.color, borderRadius: 1 }} />
              <Stack sx={{ flex: 1 }}>
                <Typography fontWeight={700}>{s.name}</Typography>
                <Typography variant="caption" color="text.secondary">{s.desc}</Typography>
              </Stack>
              <Chip size="small" label="Built-in" />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
