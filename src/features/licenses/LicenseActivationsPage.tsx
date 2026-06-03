import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { activations } from "@/mocks/licenses";
import type { GridColDef } from "@mui/x-data-grid";

export default function LicenseActivationsPage() {
  const cols: GridColDef[] = [
    { field: "licenseKey", headerName: "License", flex: 1.4, renderCell: (p) => <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{p.value}</Typography> },
    { field: "device", headerName: "Device", flex: 1.2 },
    { field: "ip", headerName: "IP", width: 140, renderCell: (p) => <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{p.value}</Typography> },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "activatedAt", headerName: "Activated", width: 160 },
    { field: "status", headerName: "Status", width: 110, renderCell: (p) => (
      <Chip size="small" label={p.value} color={p.value === "online" ? "success" : p.value === "offline" ? "default" : "error"} />
    ) },
    { field: "_a", headerName: "", width: 110, sortable: false, renderCell: () => <Button size="small" color="error">Revoke</Button> },
  ];

  return (
    <Box>
      <PageHeader
        title="Device activations"
        subtitle="Where this license is currently activated"
        actions={<Stack direction="row" spacing={1}><Button variant="outlined">Export</Button><Button variant="contained" color="error">Revoke all</Button></Stack>}
      />
      <DataTable rows={activations} columns={cols} />
    </Box>
  );
}
