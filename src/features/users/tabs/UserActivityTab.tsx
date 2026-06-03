import { Stack, Divider, Typography, Box, Avatar } from "@mui/material";
import { SectionCard } from "@/components/common/SectionCard";
import { mockAudit } from "@/mocks/audit";
import { formatDistanceToNow } from "@/lib/date";

export default function UserActivityTab() {
  return (
    <SectionCard title="Activity timeline">
      <Stack divider={<Divider />}>
        {mockAudit.slice(0, 15).map((e) => (
          <Stack key={e.id} direction="row" spacing={2} sx={{ py: 1.5 }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: 12 }}>{e.actor[0]}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2"><Box component="code" sx={{ fontFamily: "monospace", fontSize: 12, bgcolor: "action.hover", px: 0.75, borderRadius: 0.5 }}>{e.action}</Box> on {e.resource}</Typography>
              <Typography variant="caption" color="text.secondary">{formatDistanceToNow(e.at)} · {e.ip} · {e.ua}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}
