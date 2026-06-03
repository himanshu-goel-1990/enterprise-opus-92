import { Box, Stack, Card, Typography, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { mockAudit } from "@/mocks/audit";
import { formatDateTime } from "@/lib/date";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export default function ApiLogsPage() {
  return (
    <Box>
      <PageHeader title="API logs" subtitle="Realtime request stream · sampled" />
      <Stack spacing={0.5}>
        {mockAudit.slice(0, 25).map((e, i) => {
          const method = methods[i % methods.length];
          const status = i % 7 === 0 ? 500 : i % 5 === 0 ? 404 : 200;
          return (
            <Card key={e.id} variant="outlined" sx={{ p: 1.25 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ fontFamily: "monospace", fontSize: 12 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 130 }}>{formatDateTime(e.at)}</Typography>
                <Chip size="small" label={method} sx={{ minWidth: 56, fontFamily: "monospace" }} color={method === "GET" ? "info" : method === "DELETE" ? "error" : "primary"} variant="outlined" />
                <Chip size="small" label={status} color={status === 200 ? "success" : status === 404 ? "warning" : "error"} sx={{ minWidth: 50 }} />
                <Typography variant="caption" sx={{ flex: 1 }}>/v1/{e.resource.replace("/", "/")}</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>{Math.floor(Math.random() * 400 + 20)}ms</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>{e.ip}</Typography>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
