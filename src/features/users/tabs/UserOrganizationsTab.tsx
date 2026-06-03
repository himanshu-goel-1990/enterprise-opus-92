import { Stack, Avatar, Typography, Chip, Card } from "@mui/material";
import { useAppSelector } from "@/app/store";

export default function UserOrganizationsTab() {
  const orgs = useAppSelector((s) => s.org.available);
  return (
    <Stack spacing={1.5}>
      {orgs.map((o) => (
        <Card key={o.id} sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: o.logoColor }}>{o.name[0]}</Avatar>
            <Stack sx={{ flex: 1 }}>
              <Typography fontWeight={700}>{o.name}</Typography>
              <Typography variant="caption" color="text.secondary">Joined Jan 14, 2022 · {o.plan} plan</Typography>
            </Stack>
            <Chip size="small" label="Admin" />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
