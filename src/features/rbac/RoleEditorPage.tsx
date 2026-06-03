import { Box, Grid, Stack, TextField, Typography, Switch, Button, Card, Chip, Divider, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { roles, permissionGroups } from "@/mocks/roles";
import { Shield } from "lucide-react";

export default function RoleEditorPage() {
  const { id } = useParams();
  const role = roles.find((r) => r.id === id) ?? roles[0];
  return (
    <Box>
      <PageHeader title={`Edit · ${role.name}`} subtitle={role.description} actions={<><Button variant="outlined">Discard</Button><Button variant="contained">Save changes</Button></>} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2.5}>
            <SectionCard title="Details">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><TextField label="Role name" defaultValue={role.name} fullWidth size="medium" /></Grid>
                <Grid item xs={12} md={6}><TextField label="Slug" defaultValue={role.id} fullWidth size="medium" /></Grid>
                <Grid item xs={12}><TextField label="Description" defaultValue={role.description} fullWidth multiline rows={2} size="medium" /></Grid>
              </Grid>
            </SectionCard>
            <SectionCard title="Permissions matrix" subtitle="Granular permissions grouped by domain">
              <Stack spacing={2}>
                {permissionGroups.map((g) => (
                  <Box key={g.name}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>{g.name}</Typography>
                      <Chip size="small" label={`${g.permissions.length} permissions`} variant="outlined" />
                    </Stack>
                    <Card variant="outlined">
                      {g.permissions.map((p, i) => (
                        <Stack key={p} direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.25, borderBottom: i < g.permissions.length - 1 ? "1px solid" : 0, borderColor: "divider" }}>
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ textTransform: "capitalize" }}>{p.replace(/_/g, " ")}</Typography>
                            <Typography variant="caption" color="text.secondary">{g.name.toLowerCase()}.{p}</Typography>
                          </Box>
                          <Switch defaultChecked={Math.random() > 0.4} />
                        </Stack>
                      ))}
                    </Card>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5}>
            <SectionCard title="Role badge">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: role.color, width: 56, height: 56 }}><Shield size={26} /></Avatar>
                <Box>
                  <Typography variant="h5">{role.name}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Chip size="small" label={`${role.members} members`} />
                    <Chip size="small" label={`${role.permissions} perms`} />
                  </Stack>
                </Box>
              </Stack>
            </SectionCard>
            <SectionCard title="Dependencies">
              <Stack divider={<Divider />}>
                {["Users.view","Organizations.view","Audit.view"].map((d) => (
                  <Stack key={d} direction="row" justifyContent="space-between" sx={{ py: 1 }}>
                    <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{d}</Typography>
                    <Chip size="small" label="auto" />
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
