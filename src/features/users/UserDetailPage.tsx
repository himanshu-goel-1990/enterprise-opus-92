import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import { Box, Stack, Avatar, Typography, Tabs, Tab, Chip, Button, Card } from "@mui/material";
import { Mail, MoreHorizontal, Pencil } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { mockUsers } from "@/mocks/users";
import { StatusBadge } from "@/components/common/StatusBadge";

const TABS = [
  { v: "overview", l: "Overview" },
  { v: "activity", l: "Activity" },
  { v: "permissions", l: "Permissions" },
  { v: "organizations", l: "Organizations" },
  { v: "teams", l: "Teams" },
  { v: "devices", l: "Devices" },
  { v: "sessions", l: "Sessions" },
  { v: "api-keys", l: "API Keys" },
  { v: "onboarding", l: "Onboarding" },
];

export default function UserDetailPage() {
  const { userId } = useParams();
  const { pathname } = useLocation();
  const user = mockUsers.find((u) => u.id === userId) ?? mockUsers[0];
  const active = TABS.find((t) => pathname.endsWith(t.v))?.v ?? "overview";

  return (
    <Box>
      <PageHeader title={user.name} subtitle={user.email} actions={<><Button startIcon={<Mail size={16} />} variant="outlined">Email</Button><Button startIcon={<Pencil size={16} />} variant="outlined">Edit</Button><Button startIcon={<MoreHorizontal size={16} />} variant="outlined" sx={{ minWidth: 40, px: 1 }} /></>} />
      <Card sx={{ p: 2.5, mb: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
          <Avatar src={user.avatar} sx={{ width: 64, height: 64 }} />
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5">{user.name}</Typography>
              <StatusBadge status={user.status} />
            </Stack>
            <Typography color="text.secondary">{user.email}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip size="small" label={user.role} />
              <Chip size="small" label={user.org} variant="outlined" />
              <Chip size="small" label={user.team} variant="outlined" />
              <Chip size="small" label={user.country} variant="outlined" />
            </Stack>
          </Box>
        </Stack>
      </Card>
      <Tabs value={active} variant="scrollable" sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        {TABS.map((t) => <Tab key={t.v} value={t.v} label={t.l} component={Link} to={t.v} />)}
      </Tabs>
      <Outlet />
    </Box>
  );
}
