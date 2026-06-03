import { Box, Grid, Card, Typography, Stack, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { permissionGroups } from "@/mocks/roles";

export default function PermissionGroupsPage() {
  return (
    <Box>
      <PageHeader title="Permission groups" subtitle="Bundle related permissions into reusable presets" />
      <Grid container spacing={2}>
        {permissionGroups.map((g) => (
          <Grid item xs={12} sm={6} md={4} key={g.name}>
            <Card sx={{ p: 2.5 }}>
              <Typography fontWeight={700} sx={{ mb: 1 }}>{g.name}</Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {g.permissions.map((p) => <Chip key={p} size="small" label={p.replace(/_/g, " ")} variant="outlined" />)}
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
