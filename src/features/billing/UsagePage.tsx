import { Box, Grid } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { formatCompact } from "@/lib/date";

const apiData = Array.from({ length: 30 }).map((_, i) => ({ d: `D${i + 1}`, calls: 80_000 + Math.random() * 40_000 + i * 2000 }));
const storageData = Array.from({ length: 12 }).map((_, i) => ({ m: `M${i + 1}`, gb: 120 + i * 16 + Math.random() * 20 }));

export default function UsagePage() {
  return (
    <Box>
      <PageHeader title="Usage" subtitle="Track consumption across all metered resources" />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard title="API requests" subtitle="Last 30 days">
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={apiData}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatCompact} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="calls" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Storage growth" subtitle="Trailing 12 months">
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={storageData}>
                  <defs>
                    <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--mui-palette-background-paper)", border: "1px solid var(--mui-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="gb" stroke="#a855f7" strokeWidth={2.5} fill="url(#gs)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
