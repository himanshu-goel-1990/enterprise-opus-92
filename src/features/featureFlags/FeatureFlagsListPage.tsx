import { Box, Stack, Typography, Chip, Switch, Card, Button, IconButton, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { featureFlags } from "@/mocks/featureFlags";
import { Plus, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "@/lib/date";

const typeColors: Record<string, string> = {
  release: "#6366f1",
  experiment: "#a855f7",
  "kill-switch": "#ef4444",
  permission: "#10b981",
};

export default function FeatureFlagsListPage() {
  return (
    <Box>
      <PageHeader title="Feature flags" subtitle="Roll out features progressively, run experiments, and toggle kill-switches" actions={<Button startIcon={<Plus size={16} />} variant="contained">New flag</Button>} />
      <Stack spacing={1.5}>
        {featureFlags.map((f) => (
          <Card key={f.id} sx={{ p: 2.5 }}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={700} component={Link} to={`/feature-flags/${f.id}`} sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>{f.name}</Typography>
                  <Chip size="small" label={f.type} sx={{ bgcolor: `${typeColors[f.type]}22`, color: typeColors[f.type], textTransform: "capitalize" }} />
                  {f.tags.map((t) => <Chip key={t} size="small" label={t} variant="outlined" />)}
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", display: "block", mt: 0.5 }}>{f.key}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{f.description}</Typography>
              </Box>
              <Box sx={{ minWidth: 180 }}>
                <Typography variant="caption" color="text.secondary">Rollout · {f.rollout}%</Typography>
                <LinearProgress variant="determinate" value={f.rollout} sx={{ height: 6, borderRadius: 999, mt: 0.5 }} />
              </Box>
              <Stack alignItems="center" spacing={0.5}>
                <Switch defaultChecked={f.enabled} />
                <Typography variant="caption" color="text.secondary">{formatDistanceToNow(f.updated)}</Typography>
              </Stack>
              <IconButton size="small"><MoreHorizontal size={16} /></IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
