import { Box, Grid, Stack, TextField, Avatar, Button, Card, Typography, Switch, Divider } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { useAppSelector } from "@/app/store";

export default function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <Box>
      <PageHeader title="Your profile" subtitle="Manage your personal information and preferences" />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2.5}>
            <SectionCard title="Personal information">
              <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                <Avatar src={user?.avatarUrl} sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: 28 }}>{user?.fullName?.[0]}</Avatar>
                <Stack><Button variant="outlined" size="small">Upload photo</Button><Button size="small" color="error">Remove</Button></Stack>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><TextField label="Full name" defaultValue={user?.fullName} fullWidth /></Grid>
                <Grid item xs={12} md={6}><TextField label="Email" defaultValue={user?.email} fullWidth /></Grid>
                <Grid item xs={12} md={6}><TextField label="Phone" placeholder="+1 (555) 000-0000" fullWidth /></Grid>
                <Grid item xs={12} md={6}><TextField label="Time zone" defaultValue="America/Los_Angeles" fullWidth /></Grid>
              </Grid>
            </SectionCard>
            <SectionCard title="Preferences">
              <Stack divider={<Divider />}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}><Typography>Compact mode</Typography><Switch /></Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}><Typography>Send me product updates</Typography><Switch defaultChecked /></Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}><Typography>Send me weekly digest</Typography><Switch defaultChecked /></Stack>
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Avatar src={user?.avatarUrl} sx={{ width: 56, height: 56, mx: "auto", bgcolor: "primary.main" }}>{user?.fullName?.[0]}</Avatar>
              <Typography variant="h6" sx={{ mt: 1.5 }}>{user?.fullName}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
              <Typography variant="caption" sx={{ display: "block", mt: 0.5, textTransform: "capitalize", color: "primary.main", fontWeight: 600 }}>{user?.role.replace("_", " ")}</Typography>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
