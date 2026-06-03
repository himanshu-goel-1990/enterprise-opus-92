import { Box, Stack, Card, Typography, LinearProgress, Button, Avatar } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { mockUsers } from "@/mocks/users";
import { Plus } from "lucide-react";

export default function SeatsPage() {
  const used = 23, total = 25;
  return (
    <Box>
      <PageHeader title="Seats" subtitle="Manage license seats and assignments" actions={<Button startIcon={<Plus size={16} />} variant="contained">Add seats</Button>} />
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={800}>{used} <Box component="span" sx={{ fontSize: 16, color: "text.secondary" }}>of {total} seats</Box></Typography>
            <Typography variant="caption" color="text.secondary">2 seats remaining · $24/seat/month</Typography>
            <LinearProgress variant="determinate" value={(used / total) * 100} sx={{ mt: 1.5, height: 6, borderRadius: 999, "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg,#6366f1,#a855f7)" } }} />
          </Box>
        </Stack>
      </Card>
      <SectionCard title="Assigned seats">
        <Stack divider={<Box sx={{ borderTop: 1, borderColor: "divider" }} />}>
          {mockUsers.slice(0, 12).map((u) => (
            <Stack key={u.id} direction="row" alignItems="center" spacing={2} sx={{ py: 1.25 }}>
              <Avatar src={u.avatar} sx={{ width: 32, height: 32 }} />
              <Box sx={{ flex: 1 }}><Typography variant="body2" fontWeight={600}>{u.name}</Typography><Typography variant="caption" color="text.secondary">{u.email}</Typography></Box>
              <Typography variant="caption" color="text.secondary">{u.role}</Typography>
              <Button size="small">Unassign</Button>
            </Stack>
          ))}
        </Stack>
      </SectionCard>
    </Box>
  );
}
