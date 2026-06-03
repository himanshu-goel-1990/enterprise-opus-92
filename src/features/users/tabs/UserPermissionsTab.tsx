import { Grid, Stack, Typography, Switch, Divider } from "@mui/material";
import { SectionCard } from "@/components/common/SectionCard";
import { permissionGroups } from "@/mocks/roles";

export default function UserPermissionsTab() {
  return (
    <Grid container spacing={2.5}>
      {permissionGroups.map((g) => (
        <Grid item xs={12} md={6} key={g.name}>
          <SectionCard title={g.name}>
            <Stack divider={<Divider />}>
              {g.permissions.map((p) => (
                <Stack key={p} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ textTransform: "capitalize" }}>{p.replace(/_/g, " ")}</Typography>
                  <Switch defaultChecked={Math.random() > 0.4} size="small" />
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      ))}
    </Grid>
  );
}
