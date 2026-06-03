import { Box, Card, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface Props {
  label: string;
  value: string;
  delta?: number;
  icon?: LucideIcon;
  color?: string;
  sparkline?: number[];
}

export function KpiCard({ label, value, delta, icon: Icon, color = "#6366f1", sparkline }: Props) {
  const positive = (delta ?? 0) >= 0;
  const data = sparkline?.map((y, i) => ({ x: i, y })) ?? [];
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      sx={{ p: 2.5, position: "relative", overflow: "hidden", height: "100%" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{value}</Typography>
          {delta !== undefined && (
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: positive ? "success.main" : "error.main" }}>
              {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <Typography variant="caption" fontWeight={600}>
                {positive ? "+" : ""}{delta}% vs last 30d
              </Typography>
            </Stack>
          )}
        </Stack>
        {Icon && (
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}22`, color }}>
            <Icon size={18} />
          </Box>
        )}
      </Stack>
      {data.length > 0 && (
        <Box sx={{ height: 56, mt: 2, mx: -2.5, mb: -2.5 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="y" stroke={color} strokeWidth={2} fill={`url(#spark-${label})`} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Card>
  );
}
