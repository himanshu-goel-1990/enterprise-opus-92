import { Box, Grid, Card, Stack, Typography, Button, Chip, Divider, LinearProgress, Switch, FormControlLabel } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import { useParams, useNavigate } from "react-router-dom";
import { licenses, assignments } from "@/mocks/licenses";
import { ArrowLeft, RefreshCw, Ban, Copy } from "lucide-react";
import type { GridColDef } from "@mui/x-data-grid";

export default function LicenseDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const license = licenses.find((l) => l.id === id) ?? licenses[0];
  const rows = assignments.filter((a) => a.licenseId === license.id);
  const pct = Math.round((license.seatsUsed / license.seatsTotal) * 100);

  const cols: GridColDef[] = [
    { field: "userName", headerName: "User", flex: 1 },
    { field: "userEmail", headerName: "Email", flex: 1.2 },
    { field: "device", headerName: "Device", flex: 1 },
    { field: "assignedAt", headerName: "Assigned", width: 130 },
    { field: "lastActive", headerName: "Last active", width: 130 },
    { field: "_a", headerName: "", width: 110, sortable: false, renderCell: () => <Button size="small" color="error">Unassign</Button> },
  ];

  return (
    <Box>
      <Button startIcon={<ArrowLeft size={14} />} onClick={() => nav("/licenses/list")} size="small" sx={{ mb: 1 }}>Back to licenses</Button>
      <PageHeader
        title={`${license.product} — ${license.tier}`}
        subtitle={license.assignedOrg}
        actions={
          <>
            <Button startIcon={<RefreshCw size={16} />} variant="outlined">Renew</Button>
            <Button startIcon={<Ban size={16} />} variant="outlined" color="error">Suspend</Button>
          </>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SectionCard title="License details">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">License key</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ fontFamily: "monospace", fontSize: 15 }}>{license.key}</Typography>
                  <Button size="small" startIcon={<Copy size={12} />}>Copy</Button>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={3}><Typography variant="caption" color="text.secondary">Status</Typography><Box mt={0.5}><Chip size="small" label={license.status} color={license.status === "active" ? "success" : license.status === "expiring" ? "warning" : "error"} /></Box></Grid>
              <Grid item xs={6} sm={3}><Typography variant="caption" color="text.secondary">Owner</Typography><Typography>{license.owner}</Typography></Grid>
              <Grid item xs={6} sm={3}><Typography variant="caption" color="text.secondary">Issued</Typography><Typography>{license.issuedAt}</Typography></Grid>
              <Grid item xs={6} sm={3}><Typography variant="caption" color="text.secondary">Expires</Typography><Typography>{license.expiresAt}</Typography></Grid>
            </Grid>
            <Divider sx={{ my: 2.5 }} />
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between"><Typography variant="body2" fontWeight={700}>Seat utilization</Typography><Typography variant="caption">{license.seatsUsed}/{license.seatsTotal} ({pct}%)</Typography></Stack>
              <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 999 }} />
            </Stack>
            <Divider sx={{ my: 2.5 }} />
            <FormControlLabel control={<Switch defaultChecked={license.autoRenew} />} label="Auto-renew on expiration" />
          </SectionCard>

          <Box mt={2}>
            <SectionCard title="Assigned users" subtitle={`${rows.length} seats assigned`} padded={false}>
              <DataTable rows={rows} columns={cols} />
            </SectionCard>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard title="Billing">
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Plan</Typography><Typography variant="body2" fontWeight={700}>{license.tier}</Typography></Stack>
              <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Seats</Typography><Typography variant="body2">{license.seatsTotal}</Typography></Stack>
              <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Billing cycle</Typography><Typography variant="body2">Annual</Typography></Stack>
              <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Next invoice</Typography><Typography variant="body2">{license.expiresAt}</Typography></Stack>
            </Stack>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>View invoice</Button>
          </SectionCard>

          <Box mt={2}>
            <SectionCard title="Activity">
              <Stack spacing={1.5}>
                {[
                  { t: "Seat assigned to ben@acme.io", d: "2h ago" },
                  { t: "License renewed", d: "Jan 12, 2025" },
                  { t: "Pool increased by 5 seats", d: "Dec 4, 2024" },
                ].map((a) => (
                  <Box key={a.t}>
                    <Typography variant="body2">{a.t}</Typography>
                    <Typography variant="caption" color="text.secondary">{a.d}</Typography>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
