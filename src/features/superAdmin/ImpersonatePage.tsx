import { Box, TextField, Button, Card, Stack, Typography, Alert, Avatar } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { useState } from "react";
import { Eye } from "lucide-react";
import { mockUsers } from "@/mocks/users";

export default function ImpersonatePage() {
  const [q, setQ] = useState("");
  const matches = q ? mockUsers.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase())).slice(0, 8) : [];
  return (
    <Box>
      <PageHeader title="Impersonate user" subtitle="Investigate issues by signing in as another user" />
      <Alert severity="warning" sx={{ mb: 3 }}>
        All impersonation sessions are recorded in the platform audit log and visible to the impersonated user.
      </Alert>
      <SectionCard title="Find a user">
        <TextField placeholder="Search by name or email…" fullWidth size="medium" value={q} onChange={(e) => setQ(e.target.value)} />
        <Stack spacing={1} sx={{ mt: 2 }}>
          {matches.map((u) => (
            <Card key={u.id} variant="outlined" sx={{ p: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={u.avatar} sx={{ width: 32, height: 32 }} />
                <Box sx={{ flex: 1 }}><Typography variant="body2" fontWeight={600}>{u.name}</Typography><Typography variant="caption" color="text.secondary">{u.email} · {u.org}</Typography></Box>
                <Button startIcon={<Eye size={14} />} size="small" variant="contained">Impersonate</Button>
              </Stack>
            </Card>
          ))}
        </Stack>
      </SectionCard>
    </Box>
  );
}
