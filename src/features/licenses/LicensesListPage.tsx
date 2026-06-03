import { Box, Button, Chip, Stack, LinearProgress, Typography, IconButton, TextField, InputAdornment, MenuItem, Snackbar, Alert } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import { Plus, Copy, MoreHorizontal, Search, Download, RefreshCw, Ban } from "lucide-react";
import { licenses as seedLicenses, type License, type LicenseStatus } from "@/mocks/licenses";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

const statusColor: Record<LicenseStatus, "success" | "warning" | "error" | "default"> = {
  active: "success",
  expiring: "warning",
  expired: "error",
  suspended: "default",
};

export default function LicensesListPage() {
  const nav = useNavigate();
  const [rows, setRows] = useState<License[]>(seedLicenses);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | LicenseStatus>("all");
  const [product, setProduct] = useState<"all" | string>("all");
  const [selection, setSelection] = useState<GridRowSelectionModel>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const products = useMemo(() => Array.from(new Set(seedLicenses.map((l) => l.product))), []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (product !== "all" && l.product !== product) return false;
      if (!term) return true;
      return [l.key, l.product, l.tier, l.assignedOrg, l.owner].some((v) => v.toLowerCase().includes(term));
    });
  }, [rows, q, status, product]);

  const runSearch = () => {
    // Simulated server-side search
    setLoading(true);
    setTimeout(() => setLoading(false), 350);
  };

  const selectedIds = selection as string[];
  const hasSelection = selectedIds.length > 0;

  const bulkSuspend = () => {
    setRows((prev) => prev.map((l) => (selectedIds.includes(l.id) ? { ...l, status: "suspended" } : l)));
    setToast(`Suspended ${selectedIds.length} license${selectedIds.length === 1 ? "" : "s"}`);
    setSelection([]);
  };
  const bulkRenew = () => {
    setRows((prev) => prev.map((l) => {
      if (!selectedIds.includes(l.id)) return l;
      const next = new Date();
      next.setFullYear(next.getFullYear() + 1);
      return { ...l, status: "active", expiresAt: next.toISOString().slice(0, 10), autoRenew: true };
    }));
    setToast(`Renewed ${selectedIds.length} license${selectedIds.length === 1 ? "" : "s"} for 1 year`);
    setSelection([]);
  };
  const exportRows = (which: License[]) => {
    const header = ["key", "product", "tier", "status", "seatsUsed", "seatsTotal", "assignedOrg", "owner", "issuedAt", "expiresAt", "autoRenew"];
    const csv = [header.join(",")].concat(
      which.map((l) => header.map((h) => JSON.stringify((l as any)[h] ?? "")).join(","))
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `licenses-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setToast(`Exported ${which.length} license${which.length === 1 ? "" : "s"}`);
  };

  const cols: GridColDef[] = [
    {
      field: "key", headerName: "License key", flex: 1.6, renderCell: (p) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{p.value}</Typography>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(p.value); }}><Copy size={12} /></IconButton>
        </Stack>
      ),
    },
    { field: "product", headerName: "Product", flex: 1 },
    { field: "tier", headerName: "Tier", width: 120, renderCell: (p) => <Chip size="small" label={p.value} variant="outlined" /> },
    { field: "assignedOrg", headerName: "Organization", flex: 1 },
    {
      field: "seats", headerName: "Seats", flex: 1, valueGetter: (_, row) => `${row.seatsUsed}/${row.seatsTotal}`,
      renderCell: (p) => {
        const pct = (p.row.seatsUsed / p.row.seatsTotal) * 100;
        return (
          <Box sx={{ width: "100%" }}>
            <Typography variant="caption">{p.row.seatsUsed} / {p.row.seatsTotal}</Typography>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 5, borderRadius: 999, mt: 0.5 }} />
          </Box>
        );
      },
    },
    { field: "status", headerName: "Status", width: 130, renderCell: (p) => <Chip size="small" label={p.value} color={statusColor[p.value as LicenseStatus]} /> },
    { field: "expiresAt", headerName: "Expires", width: 130 },
    { field: "autoRenew", headerName: "Auto-renew", width: 120, renderCell: (p) => <Chip size="small" label={p.value ? "On" : "Off"} variant="outlined" color={p.value ? "success" : "default"} /> },
    { field: "_a", headerName: "", width: 50, sortable: false, renderCell: () => <IconButton size="small"><MoreHorizontal size={16} /></IconButton> },
  ];

  return (
    <Box>
      <PageHeader
        title="Licenses"
        subtitle="All issued licenses across products and organizations"
        actions={
          <>
            <Button startIcon={<Download size={16} />} variant="outlined" onClick={() => exportRows(filtered)}>Export</Button>
            <Button startIcon={<Plus size={16} />} variant="contained" onClick={() => nav("/licenses/new")}>Issue license</Button>
          </>
        }
      />

      <SectionCard padded={false}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ p: 2, borderBottom: 1, borderColor: "divider", alignItems: "center" }}>
          <TextField
            placeholder="Search by key, product, org, owner…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            size="small"
            sx={{ flex: 1, maxWidth: 420 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search size={14} /></InputAdornment> }}
          />
          <TextField select size="small" value={status} onChange={(e) => setStatus(e.target.value as any)} sx={{ minWidth: 150 }} label="Status">
            <MenuItem value="all">All statuses</MenuItem>
            {(["active", "expiring", "expired", "suspended"] as LicenseStatus[]).map((s) => (
              <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" value={product} onChange={(e) => setProduct(e.target.value)} sx={{ minWidth: 180 }} label="Product">
            <MenuItem value="all">All products</MenuItem>
            {products.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </TextField>
          <Box sx={{ flex: 1 }} />
          <Typography variant="caption" color="text.secondary">{filtered.length} results</Typography>
        </Stack>

        {hasSelection && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 2, py: 1.25, bgcolor: "action.hover", borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body2" fontWeight={700}>{selectedIds.length} selected</Typography>
            <Box sx={{ flex: 1 }} />
            <Button size="small" startIcon={<RefreshCw size={14} />} onClick={bulkRenew}>Renew</Button>
            <Button size="small" startIcon={<Ban size={14} />} color="error" onClick={bulkSuspend}>Suspend</Button>
            <Button size="small" startIcon={<Download size={14} />} onClick={() => exportRows(rows.filter((r) => selectedIds.includes(r.id)))}>Export selected</Button>
          </Stack>
        )}

        {loading && <LinearProgress />}

        <DataTable
          rows={filtered}
          columns={cols}
          checkboxSelection
          rowSelectionModel={selection}
          onRowSelectionModelChange={setSelection}
          onRowClick={(p) => nav(`/licenses/list/${p.id}`)}
          sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </SectionCard>

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setToast(null)} variant="filled">{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
