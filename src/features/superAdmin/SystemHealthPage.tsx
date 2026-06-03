import { Box, Grid, Card, Stack, Typography, Chip } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";

const services = [
  { name: "API Gateway", status: "operational", uptime: "99.998%" },
  { name: "Auth Service", status: "operational", uptime: "100%" },
  { name: "Database (primary)", status: "operational", uptime: "99.99%" },
  { name: "Database (read replicas)", status: "operational", uptime: "99.97%" },
  { name: "Queue / Workers", status: "degraded", uptime: "98.4%" },
  { name: "Realtime / WebSocket", status: "operational", uptime: "99.99%" },
  { name: "Object Storage", status: "operational", uptime: "100%" },
  { name: "Email delivery", status: "operational", uptime: "99.95%" },
];

const latency = Array.from({ length: 24 }).map((_, i) => ({ h: `${i}h`, p50: 40 + Math.random() * 10, p95: 120 + Math.random() * 60, p99: 240 + Math.random() * 120 }));

export default function SystemHealthPage() {
  return (
    <Box>
      <PageHeader title="System health" subtitle="Service status, latency, and incidents" />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard title="API latency · last 24h">
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={latency}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="h" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}ms`} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Services">
            <Stack spacing={1}>
              {services.map((s) => (
                <Card key={s.name} variant="outlined" sx={{ p: 1.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: 999, bgcolor: s.status === "operational" ? "#10b981" : s.status === "degraded" ? "#f59e0b" : "#ef4444" }} className="pulse-dot" />
                    <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>{s.name}</Typography>
                    <Chip size="small" label={s.uptime} variant="outlined" />
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
