import { Box, Grid, Stack, Typography, Card, Chip, LinearProgress, Button } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/common/KpiCard";
import { SectionCard } from "@/components/common/SectionCard";
import { ShieldCheck, ShieldAlert, FileWarning, Activity, Download } from "lucide-react";
import { licenses } from "@/mocks/licenses";

const issues = [
  { severity: "high", title: "Over-allocation on Lovable Platform — Globex", detail: "211 seats in use, contractual cap 200. Excess of 11 seats.", recommendation: "Increase pool by 25 seats or revoke inactive users." },
  { severity: "high", title: "Expired license still in use — Stark Industries", detail: "AI Gateway license LCV-PRO-G19A-… expired 2025-04-10 but 3 devices remain activated.", recommendation: "Revoke device activations or renew the license." },
  { severity: "medium", title: "Auto-renew disabled on Initech Analytics", detail: "Analytics Add-on (50 seats) expires in 28 days with auto-renew off.", recommendation: "Confirm renewal intent with billing contact." },
  { severity: "low", title: "Idle seats on Pied Piper Pro", detail: "8 of 27 assigned seats have been inactive for 60+ days.", recommendation: "Reclaim seats to optimize spend." },
];

const sevColor: Record<string, "error" | "warning" | "default"> = { high: "error", medium: "warning", low: "default" };

export default function LicenseCompliancePage() {
  const score = 78;
  return (
    <Box>
      <PageHeader
        title="Compliance & audit"
        subtitle="License compliance posture across all customers"
        actions={<Button startIcon={<Download size={16} />} variant="outlined">Export report</Button>}
      />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Compliance score" value={`${score}%`} icon={ShieldCheck} delta={4} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Open issues" value={String(issues.length)} icon={ShieldAlert} delta={-2} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Audit events (30d)" value="1,284" icon={Activity} delta={12} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Over-allocations" value="1" icon={FileWarning} delta={-1} /></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Active compliance issues" subtitle="Sorted by severity">
            <Stack spacing={1.5}>
              {issues.map((i) => (
                <Card key={i.title} variant="outlined" sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Chip size="small" label={i.severity} color={sevColor[i.severity]} sx={{ mt: 0.5 }} />
                    <Box flex={1}>
                      <Typography fontWeight={700}>{i.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{i.detail}</Typography>
                      <Typography variant="caption" sx={{ mt: 1, display: "block" }}><strong>Recommendation:</strong> {i.recommendation}</Typography>
                    </Box>
                    <Button size="small" variant="contained">Resolve</Button>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Compliance breakdown">
            <Stack spacing={2}>
              {[
                { label: "Seat compliance", v: 92 },
                { label: "Expiration coverage", v: 71 },
                { label: "Activation hygiene", v: 84 },
                { label: "Audit trail", v: 96 },
              ].map((m) => (
                <Box key={m.label}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption">{m.label}</Typography>
                    <Typography variant="caption" fontWeight={700}>{m.v}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={m.v} sx={{ height: 6, borderRadius: 999 }} />
                </Box>
              ))}
            </Stack>
          </SectionCard>

          <Box mt={2}>
            <SectionCard title="License inventory">
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Total licenses</Typography><Typography fontWeight={700}>{licenses.length}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Total seats</Typography><Typography fontWeight={700}>{licenses.reduce((s, l) => s + l.seatsTotal, 0)}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Utilization</Typography><Typography fontWeight={700}>{Math.round((licenses.reduce((s, l) => s + l.seatsUsed, 0) / licenses.reduce((s, l) => s + l.seatsTotal, 0)) * 100)}%</Typography></Stack>
              </Stack>
            </SectionCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
