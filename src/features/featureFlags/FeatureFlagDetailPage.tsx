import { Box, Grid, Stack, Typography, Card, Switch, Slider, Chip, Button, Divider, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { featureFlags } from "@/mocks/featureFlags";
import { useState } from "react";

export default function FeatureFlagDetailPage() {
  const { flagId } = useParams();
  const flag = featureFlags.find((f) => f.id === flagId) ?? featureFlags[0];
  const [rollout, setRollout] = useState(flag.rollout);
  return (
    <Box>
      <PageHeader title={flag.name} subtitle={flag.description} actions={<><Button variant="outlined">View history</Button><Button variant="contained">Save</Button></>} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2.5}>
            <SectionCard title="Configuration">
              <Stack spacing={2}>
                <TextField label="Key" defaultValue={flag.key} size="medium" />
                <TextField label="Description" defaultValue={flag.description} multiline rows={2} size="medium" />
              </Stack>
            </SectionCard>
            <SectionCard title="Rollout">
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center"><Typography>Percentage rollout</Typography><Typography fontWeight={700}>{rollout}%</Typography></Stack>
                <Slider value={rollout} onChange={(_, v) => setRollout(v as number)} valueLabelDisplay="auto" />
                <Divider />
                <Typography variant="subtitle2">Per environment</Typography>
                {flag.environments.map((e) => (
                  <Stack key={e.name} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ textTransform: "capitalize" }}>{e.name}</Typography>
                    <Switch defaultChecked={e.enabled} />
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
            <SectionCard title="Targeting rules" subtitle="Override the global rollout for specific users or attributes">
              <Stack spacing={1}>
                <Card variant="outlined" sx={{ p: 1.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2"><strong>If</strong> user.plan <Box component="code" sx={{ mx: 0.5, fontFamily: "monospace", bgcolor: "action.hover", px: 0.5, borderRadius: 0.5 }}>in</Box> [enterprise, business] → <strong>enabled</strong></Typography>
                    <Chip size="small" label="100%" color="success" />
                  </Stack>
                </Card>
                <Card variant="outlined" sx={{ p: 1.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2"><strong>If</strong> org.region <Box component="code" sx={{ mx: 0.5, fontFamily: "monospace", bgcolor: "action.hover", px: 0.5, borderRadius: 0.5 }}>=</Box> EU → <strong>disabled</strong></Typography>
                    <Chip size="small" label="0%" />
                  </Stack>
                </Card>
                <Button variant="outlined" size="small">+ Add rule</Button>
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5}>
            <SectionCard title="Owner">
              <Stack spacing={1}>
                <Typography variant="body2">{flag.owner}</Typography>
                <Typography variant="caption" color="text.secondary">Updated {flag.updated.slice(0, 10)}</Typography>
              </Stack>
            </SectionCard>
            <SectionCard title="Tags"><Stack direction="row" flexWrap="wrap" gap={0.5}>{flag.tags.map((t) => <Chip key={t} size="small" label={t} variant="outlined" />)}</Stack></SectionCard>
            <SectionCard title="Status">
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Switch defaultChecked={flag.enabled} />
                <Typography fontWeight={600}>{flag.enabled ? "Active" : "Disabled"}</Typography>
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
