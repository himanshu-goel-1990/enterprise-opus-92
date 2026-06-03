import { Box, Grid, Stack, Avatar, Typography, Divider, Switch, Card } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { mockNotifications } from "@/mocks/notifications";
import { formatDistanceToNow } from "@/lib/date";

export default function NotificationCenterPage() {
  const types = ["billing", "security", "org", "system", "mention"] as const;
  return (
    <Box>
      <PageHeader title="Notifications" subtitle="Inbox and delivery preferences" />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Inbox">
            <Stack divider={<Divider />}>
              {mockNotifications.map((n) => (
                <Stack key={n.id} direction="row" spacing={1.5} sx={{ py: 1.5 }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: n.color }}>{n.icon}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{n.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{n.body}</Typography>
                    <Typography variant="caption" color="text.secondary">{formatDistanceToNow(n.at)}</Typography>
                  </Box>
                  {!n.read && <Box sx={{ width: 8, height: 8, borderRadius: 999, bgcolor: "primary.main", mt: 1 }} />}
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Delivery preferences">
            <Stack spacing={2}>
              {types.map((t) => (
                <Card key={t} variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ textTransform: "capitalize", mb: 1 }}>{t}</Typography>
                  <Stack spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2">In-app</Typography><Switch defaultChecked size="small" /></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2">Email</Typography><Switch defaultChecked={t !== "system"} size="small" /></Stack>
                    <Stack direction="row" justifyContent="space-between"><Typography variant="body2">Push</Typography><Switch defaultChecked={t === "security" || t === "mention"} size="small" /></Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
