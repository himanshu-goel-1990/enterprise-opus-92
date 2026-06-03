import { Box, Stack, Card, Typography, Button, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, ArrowUpRight } from "lucide-react";

const hooks = [
  { url: "https://hooks.acme.com/billing-events", events: ["invoice.paid", "subscription.updated"], status: "active", delivery: "99.4%" },
  { url: "https://api.globex.io/webhooks/users", events: ["user.created", "user.updated", "user.deleted"], status: "active", delivery: "100%" },
  { url: "https://logs.initech.co/audit", events: ["audit.*"], status: "failing", delivery: "76.2%" },
];

export default function WebhooksPage({ embedded }: { embedded?: boolean }) {
  const body = (
    <Stack spacing={1.25}>
      {hooks.map((h) => (
        <Card key={h.url} sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: 600 }}>{h.url}</Typography>
                <ArrowUpRight size={14} />
              </Stack>
              <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap">
                {h.events.map((e) => <Chip key={e} size="small" label={e} variant="outlined" />)}
              </Stack>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">Delivery</Typography>
              <Typography fontWeight={700}>{h.delivery}</Typography>
            </Box>
            <Chip size="small" label={h.status} color={h.status === "active" ? "success" : "error"} />
            <Button size="small">Test</Button>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
  if (embedded) return body;
  return (
    <Box>
      <PageHeader title="Webhooks" subtitle="Deliver events to your endpoints" actions={<Button startIcon={<Plus size={16} />} variant="contained">New endpoint</Button>} />
      {body}
    </Box>
  );
}
