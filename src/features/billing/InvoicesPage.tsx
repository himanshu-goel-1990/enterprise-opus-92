import { Box } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import { invoices } from "@/mocks/billing";
import { formatCurrency, formatDate } from "@/lib/date";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@mui/material";
import { Download } from "lucide-react";

export default function InvoicesPage() {
  const columns: GridColDef[] = [
    { field: "number", headerName: "Invoice", flex: 1 },
    { field: "date", headerName: "Date", flex: 1, renderCell: (p) => formatDate(p.value) },
    { field: "amount", headerName: "Amount", flex: 0.6, renderCell: (p) => formatCurrency(p.value) },
    { field: "status", headerName: "Status", flex: 0.6, renderCell: (p) => <StatusBadge status={p.value} /> },
    { field: "actions", headerName: "", width: 100, sortable: false, renderCell: () => <Button size="small" startIcon={<Download size={14} />}>PDF</Button> },
  ];
  return (
    <Box>
      <PageHeader title="Invoices" subtitle="All issued invoices, sorted by issue date" actions={<Button startIcon={<Download size={16} />} variant="outlined">Download all</Button>} />
      <SectionCard padded={false}>
        <DataTable rows={invoices} columns={columns} getRowId={(r) => r.id} />
      </SectionCard>
    </Box>
  );
}
