import { Grid, Box, Stack, Avatar, Typography, Card, Divider, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { KpiCard } from "@/components/common/KpiCard";
import { mockOrgs } from "@/mocks/organizations";
import { Users, Building2, CreditCard, Activity } from "lucide-react";
import { formatCurrency, formatNumber, formatDate } from "@/lib/date";

export default function OrganizationOverviewPage() {
  const { orgId } = useParams();
  const org = mockOrgs.find((o) => o.id === orgId) ?? mockOrgs[0];
  const spark = Array.from({ length: 20 }).map(() => Math.random() * 100 + 20);
  return (
    <Box>
      <PageHeader title={org.name} subtitle={`${org.industry} · ${org.region} · Created ${formatDate(org.created)}`} actions={<><Button variant="outlined">Edit</Button><Button variant="contained">Open in admin</Button></>} />
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ md: "center" }}>
          <Avatar sx={{ bgcolor: org.color, width: 64, height: 64, fontSize: 24 }}>{org.name[0]}</Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">{org.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <StatusBadge status={org.status} />
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>{org.plan} plan</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="text.secondary">ID: {org.id}</Typography>
            </Stack>
          </Box>
        </Stack>
      </Card>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><KpiCard label="Members" value={formatNumber(org.members)} delta={5.2} icon={Users} color="#6366f1" sparkline={spark} /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="Teams" value="18" delta={2.0} icon={Building2} color="#10b981" sparkline={spark} /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="MRR" value={formatCurrency(org.mrr)} delta={11.4} icon={CreditCard} color="#a855f7" sparkline={spark} /></Grid>
        <Grid item xs={6} md={3}><KpiCard label="API calls (24h)" value="1.2M" delta={-1.4} icon={Activity} color="#f59e0b" sparkline={spark} /></Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <SectionCard title="Configuration">
            <Stack divider={<Divider />} spacing={0}>
              {[
                ["Workspace URL", `${org.slug}.northstar.app`],
                ["Default region", org.region],
                ["SSO", "SAML · Okta"],
                ["MFA enforcement", "Required for admins"],
                ["Data residency", "EU"],
                ["SCIM provisioning", "Enabled"],
              ].map(([k, v]) => (
                <Stack key={k} direction="row" justifyContent="space-between" sx={{ py: 1.25 }}>
                  <Typography variant="body2" color="text.secondary">{k}</Typography>
                  <Typography variant="body2" fontWeight={600}>{v}</Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionCard title="Recent admins">
            <Stack divider={<Divider />}>
              {["Sarah Chen","Marcus Wright","Aisha Khan","Daniel Garcia"].map((n) => (
                <Stack key={n} direction="row" spacing={1.5} alignItems="center" sx={{ py: 1.25 }}>
                  <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: "primary.main" }}>{n[0]}</Avatar>
                  <Box sx={{ flex: 1 }}><Typography variant="body2" fontWeight={600}>{n}</Typography><Typography variant="caption" color="text.secondary">{n.toLowerCase().replace(" ", ".")}@{org.slug}.com</Typography></Box>
                  <Typography variant="caption" color="text.secondary">Active now</Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
