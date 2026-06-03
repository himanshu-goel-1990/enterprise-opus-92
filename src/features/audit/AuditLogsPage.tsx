import { Box, Stack, TextField, MenuItem, Button, InputAdornment, Chip } from "@mui/material";
import { Search, Download, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { type GridColDef } from "@mui/x-data-grid";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAudit } from "@/mocks/audit";
import { formatDateTime } from "@/lib/date";

export default function AuditLogsPage() {
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState("all");
  const rows = useMemo(() => mockAudit.filter((e) => {
    if (risk !== "all" && e.risk !== risk) return false;
    if (q && !`${e.actor} ${e.action} ${e.resource} ${e.ip}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, risk]);
  const columns: GridColDef[] = [
    { field: "at", headerName: "Time", flex: 0.9, renderCell: (p) => formatDateTime(p.value) },
    { field: "actor", headerName: "Actor", flex: 0.9 },
    { field: "action", headerName: "Action", flex: 1, renderCell: (p) => <Chip size="small" variant="outlined" label={p.value} sx={{ fontFamily: "monospace" }} /> },
    { field: "resource", headerName: "Resource", flex: 1, renderCell: (p) => <Box component="code" sx={{ fontFamily: "monospace", fontSize: 12 }}>{p.value}</Box> },
    { field: "ip", headerName: "IP", flex: 0.7 },
    { field: "ua", headerName: "User agent", flex: 1 },
    { field: "risk", headerName: "Risk", flex: 0.5, renderCell: (p) => <StatusBadge status={p.value} /> },
  ];
  return (
    <Box>
      <PageHeader title="Audit logs" subtitle={`${mockAudit.length} events · realtime stream`} actions={<Button startIcon={<Download size={16} />} variant="outlined">Export</Button>} />
      <SectionCard padded={false}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <TextField placeholder="Search events…" value={q} onChange={(e) => setQ(e.target.value)} size="small" sx={{ flex: 1, maxWidth: 380 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search size={14} /></InputAdornment> }} />
          <TextField select size="small" value={risk} onChange={(e) => setRisk(e.target.value)} sx={{ minWidth: 140 }}>
            <MenuItem value="all">All risk</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <Button variant="outlined" size="small" startIcon={<Filter size={14} />}>More filters</Button>
        </Stack>
        <DataTable rows={rows} columns={columns} getRowId={(r) => r.id} rowHeight={48} />
      </SectionCard>
    </Box>
  );
}
