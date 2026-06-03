import { Grid, Box, Stack, Typography, Avatar, Button, Card, Divider, LinearProgress, Chip } from "@mui/material";
import { Users, Building2, CreditCard, Activity, Zap, Database, ArrowUpRight, Download, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/common/KpiCard";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useAppSelector } from "@/app/store";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { formatCompact, formatCurrency, formatDistanceToNow } from "@/lib/date";
import { mockAudit } from "@/mocks/audit";

const monthlyGrowth = Array.from({ length: 30 }).map((_, i) => ({
  d: `D${i + 1}`,
  users: Math.round(800 + i * 42 + Math.sin(i / 3) * 80),
  active: Math.round(420 + i * 28 + Math.cos(i / 4) * 60),
}));

const apiUsage = Array.from({ length: 14 }).map((_, i) => ({
  d: `${i + 1}`,
  calls: Math.round(80_000 + Math.random() * 60_000 + i * 4000),
  errors: Math.round(200 + Math.random() * 400),
}));

const distribution = [
  { name: "Active", value: 1248, color: "#10b981" },
  { name: "Invited", value: 142, color: "#3b82f6" },
  { name: "Suspended", value: 22, color: "#f59e0b" },
  { name: "Deactivated", value: 38, color: "#94a3b8" },
];

const sparkline1 = monthlyGrowth.map((m) => m.users);
const sparkline2 = apiUsage.map((m) => m.calls);

export default function DashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const org = useAppSelector((s) => s.org.current);

  return (
    <Box>
      <PageHeader
        title={`Good ${greeting()}, ${user?.fullName?.split(" ")[0] ?? "there"}`}
        subtitle={`Here's what's happening across ${org?.name ?? "your workspace"} today.`}
        actions={
          <>
            <Button startIcon={<Download size={16} />} variant="outlined">Export</Button>
            <Button variant="contained" startIcon={<Zap size={16} />}>Quick action</Button>
          </>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard label="Total users" value="1,450" delta={12.4} icon={Users} color="#6366f1" sparkline={sparkline1} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard label="Active organizations" value="124" delta={4.1} icon={Building2} color="#10b981" sparkline={sparkline1.map((v) => v / 12)} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard label="MRR" value="$48,920" delta={8.7} icon={CreditCard} color="#a855f7" sparkline={sparkline1.map((v) => v / 2)} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard label="API calls (24h)" value="2.4M" delta={-2.3} icon={Activity} color="#f59e0b" sparkline={sparkline2} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <SectionCard
            title="User growth"
            subtitle="Daily active vs total registered, last 30 days"
            action={<Button size="small" endIcon={<ArrowUpRight size={14} />}>View report</Button>}
          >
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer>
                <AreaChart data={monthlyGrowth}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatCompact} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2.5} fill="url(#g1)" name="Total users" />
                  <Area type="monotone" dataKey="active" stroke="#a855f7" strokeWidth={2.5} fill="url(#g2)" name="Active users" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <SectionCard title="User distribution" subtitle="Across all organizations">
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={92} paddingAngle={3}>
                    {distribution.map((d) => <Cell key={d.name} fill={d.color} stroke="transparent" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} lg={8}>
          <SectionCard title="API traffic" subtitle="Requests vs errors (last 14 days)" action={<Chip size="small" label="Healthy" color="success" sx={{ height: 20, fontSize: 11 }} />}>
            <Box sx={{ height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={apiUsage}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatCompact} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="calls" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <SectionCard title="Subscription" subtitle={`${org?.name} · ${org?.plan} plan`}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography variant="h4" fontWeight={800}>{formatCurrency(2400)}</Typography>
                <Typography color="text.secondary">/month</Typography>
              </Stack>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Seats</Typography>
                  <Typography variant="caption" fontWeight={600}>23 / 25</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={92} sx={{ height: 6, borderRadius: 999, "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg,#6366f1,#a855f7)" } }} />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Storage</Typography>
                  <Typography variant="caption" fontWeight={600}>312 GB / 500 GB</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={62} sx={{ height: 6, borderRadius: 999 }} color="info" />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">API quota</Typography>
                  <Typography variant="caption" fontWeight={600}>72M / 100M</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={72} sx={{ height: 6, borderRadius: 999 }} color="warning" />
              </Box>
              <Divider />
              <Button variant="outlined" size="small" startIcon={<Database size={14} />}>Manage subscription</Button>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid item xs={12} lg={7}>
          <SectionCard title="Recent activity" subtitle="Across your organization" action={<Button size="small" endIcon={<MoreHorizontal size={14} />}>All events</Button>}>
            <Stack divider={<Divider />}>
              {mockAudit.slice(0, 6).map((e) => (
                <Stack key={e.id} direction="row" spacing={2} alignItems="center" sx={{ py: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "primary.main" }}>{e.actor[0]}</Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2">
                      <strong>{e.actor}</strong>{" "}
                      <Box component="span" sx={{ color: "text.secondary" }}>performed</Box>{" "}
                      <Box component="code" sx={{ fontFamily: "monospace", fontSize: 12, bgcolor: "action.hover", px: 0.75, py: 0.15, borderRadius: 0.5 }}>{e.action}</Box>{" "}
                      <Box component="span" sx={{ color: "text.secondary" }}>on</Box> {e.resource}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{formatDistanceToNow(e.at)} · {e.ip}</Typography>
                  </Box>
                  <StatusBadge status={e.risk} />
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        <Grid item xs={12} lg={5}>
          <SectionCard title="Top organizations" subtitle="By MRR · current cycle">
            <Stack divider={<Divider />}>
              {[
                { name: "Acme Corp", mrr: 12400, plan: "Enterprise", color: "#6366f1" },
                { name: "Globex Industries", mrr: 8900, plan: "Business", color: "#10b981" },
                { name: "Wayne Enterprises", mrr: 7600, plan: "Enterprise", color: "#a855f7" },
                { name: "Stark Industries", mrr: 6400, plan: "Business", color: "#f59e0b" },
                { name: "Initech", mrr: 3200, plan: "Team", color: "#ef4444" },
              ].map((o) => (
                <Stack key={o.name} direction="row" spacing={2} alignItems="center" sx={{ py: 1.5 }}>
                  <Card sx={{ width: 36, height: 36, display: "grid", placeItems: "center", bgcolor: o.color, color: "white", fontWeight: 700 }}>{o.name[0]}</Card>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{o.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{o.plan}</Typography>
                  </Box>
                  <Typography fontWeight={700}>{formatCurrency(o.mrr)}</Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
