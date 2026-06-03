import { Box, Grid } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { KpiCard } from "@/components/common/KpiCard";
import { Users, Building2, TrendingUp, Globe2 } from "lucide-react";
import { formatCompact } from "@/lib/date";

const platformData = Array.from({ length: 12 }).map((_, i) => ({ m: `M${i + 1}`, tenants: 200 + i * 40 + Math.random() * 20, users: 4_000 + i * 800, revenue: 80_000 + i * 12_000 }));

export default function PlatformAnalyticsPage() {
  const spark = platformData.map((d) => d.users);
  return (
    <Box>
      <PageHeader title="Platform analytics" subtitle="Cross-tenant operational and business metrics" />
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><KpiCard label="Total tenants" value="624" delta={6.4} icon={Building2} sparkline={spark} color="#6366f1" /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="Total users" value="48.2K" delta={9.1} icon={Users} sparkline={spark} color="#10b981" /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="ARR" value="$5.8M" delta={14.2} icon={TrendingUp} sparkline={spark} color="#a855f7" /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="Regions live" value="14" delta={2.0} icon={Globe2} color="#f59e0b" /></Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Tenant & user growth" subtitle="Last 12 months">
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={platformData}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatCompact} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="tenants" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Revenue" subtitle="Monthly recurring">
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer>
                <AreaChart data={platformData}>
                  <defs>
                    <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatCompact} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#gr)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
