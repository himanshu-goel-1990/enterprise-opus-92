import { Box, Button, Stack, Avatar, Typography } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { UserPlus } from "lucide-react";
import { assignments, licenses } from "@/mocks/licenses";
import type { GridColDef } from "@mui/x-data-grid";

export default function LicenseAssignmentsPage() {
  const rows = assignments.map((a) => {
    const l = licenses.find((x) => x.id === a.licenseId);
    return { ...a, product: l?.product, tier: l?.tier, org: l?.assignedOrg };
  });

  const cols: GridColDef[] = [
    {
      field: "userName", headerName: "User", flex: 1.2, renderCell: (p) => (
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar sx={{ width: 30, height: 30, fontSize: 12 }}>{(p.value as string).split(" ").map((s) => s[0]).join("")}</Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{p.value}</Typography>
            <Typography variant="caption" color="text.secondary">{p.row.userEmail}</Typography>
          </Box>
        </Stack>
      ),
    },
    { field: "product", headerName: "Product", flex: 1 },
    { field: "tier", headerName: "Tier", width: 110 },
    { field: "org", headerName: "Organization", flex: 1 },
    { field: "device", headerName: "Device", flex: 1 },
    { field: "assignedAt", headerName: "Assigned", width: 120 },
    { field: "lastActive", headerName: "Last active", width: 130 },
    { field: "_a", headerName: "", width: 240, sortable: false, renderCell: () => (
      <Stack direction="row" spacing={1}><Button size="small">Reassign</Button><Button size="small" color="error">Revoke</Button></Stack>
    ) },
  ];

  return (
    <Box>
      <PageHeader
        title="Seat assignments"
        subtitle="Every active seat across all licenses"
        actions={<Button startIcon={<UserPlus size={16} />} variant="contained">Assign seats</Button>}
      />
      <DataTable rows={rows} columns={cols} getRowHeight={() => 60} />
    </Box>
  );
}
