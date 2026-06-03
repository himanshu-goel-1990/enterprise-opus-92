import { Box, Grid, Card, Stack, Typography, Button, Divider, LinearProgress, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { KpiCard } from "@/components/common/KpiCard";
import { CreditCard, TrendingUp, Receipt, Users } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/date";
import { invoices } from "@/mocks/billing";
import { StatusBadge } from "@/components/common/StatusBadge";

export default function BillingOverviewPage() {
  const spark = Array.from({ length: 18 }).map((_, i) => 1200 + i * 80 + Math.random() * 200);
  return (
    <Box>
      <PageHeader title="Billing" subtitle="Subscription, invoices, payment methods and usage" actions={<><Button variant="outlined" component={Link} to="/billing/invoices">View invoices</Button><Button variant="contained" component={Link} to="/billing/plan">Change plan</Button></>} />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><KpiCard label="Monthly bill" value={formatCurrency(2400)} delta={0} icon={CreditCard} color="#6366f1" sparkline={spark} /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="MRR (last cycle)" value={formatCurrency(2400)} delta={8.7} icon={TrendingUp} color="#10b981" sparkline={spark} /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="Open invoices" value="1" delta={0} icon={Receipt} color="#f59e0b" /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="Active seats" value="23 / 25" delta={4.2} icon={Users} color="#a855f7" /></Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Current plan" subtitle="Business · monthly" action={<Button size="small" variant="outlined" component={Link} to="/billing/plan">Change</Button>}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ md: "center" }}>
              <Stack sx={{ flex: 1 }}>
                <Typography variant="h3" fontWeight={800}>{formatCurrency(199)}<Box component="span" sx={{ fontSize: 14, color: "text.secondary", fontWeight: 400 }}> / month</Box></Typography>
                <Typography variant="caption" color="text.secondary">Renews Jan 14, 2026 · Auto-renew on</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip label="Business" />
                <Chip label="Annual save 20%" color="success" />
              </Stack>
            </Stack>
            <Divider sx={{ my: 2.5 }} />
            <Stack spacing={2}>
              <Meter label="Seats" used={23} total={25} />
              <Meter label="Storage" used={312} total={500} unit="GB" />
              <Meter label="API quota" used={72} total={100} unit="M" />
              <Meter label="Webhooks" used={4} total={20} />
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Payment method" action={<Button size="small" variant="outlined" component={Link} to="/billing/payment-methods">Manage</Button>}>
            <Card variant="outlined" sx={{ p: 2.5, background: "linear-gradient(135deg,#0a0e1a,#1e293b)", color: "white" }}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center"><CreditCard size={20} /><Typography variant="caption">VISA</Typography></Stack>
                <Typography variant="h5" sx={{ fontFamily: "monospace", letterSpacing: 2 }}>•••• •••• •••• 4242</Typography>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption">Sarah Chen</Typography><Typography variant="caption">12/27</Typography></Stack>
              </Stack>
            </Card>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>Next charge: <strong>{formatDate(invoices[0].date)}</strong></Typography>
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <SectionCard title="Recent invoices" action={<Button size="small" component={Link} to="/billing/invoices">All invoices</Button>}>
            <Stack divider={<Divider />}>
              {invoices.slice(0, 5).map((inv) => (
                <Stack key={inv.id} direction="row" alignItems="center" spacing={2} sx={{ py: 1.25 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{inv.number}</Typography>
                    <Typography variant="caption" color="text.secondary">{formatDate(inv.date)}</Typography>
                  </Box>
                  <StatusBadge status={inv.status} />
                  <Typography fontWeight={700}>{formatCurrency(inv.amount)}</Typography>
                  <Button size="small">PDF</Button>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}

function Meter({ label, used, total, unit = "" }: { label: string; used: number; total: number; unit?: string }) {
  const pct = (used / total) * 100;
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="caption" fontWeight={600}>{used}{unit} / {total}{unit}</Typography>
      </Stack>
      <LinearProgress variant="determinate" value={pct} sx={{ height: 6, borderRadius: 999, "& .MuiLinearProgress-bar": { background: pct > 90 ? "linear-gradient(90deg,#f59e0b,#ef4444)" : "linear-gradient(90deg,#6366f1,#a855f7)" } }} />
    </Box>
  );
}
