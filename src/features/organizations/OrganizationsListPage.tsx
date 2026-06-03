import { useEffect } from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Switch,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { type GridColDef } from "@mui/x-data-grid";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import Badge from "react-bootstrap/Badge";
import { mockOrgs } from "@/mocks/organizations";
import { formatCurrency, formatNumber, formatDate } from "@/lib/date";
import api from "@/features/api/axios";
import { getAllOrg, getAvatarColor, setDateFormat, CapitalFirstCase } from "@/lib/commonApis";
import { Plus, Trash2, FilePenLine, MoreHorizontal, Shield, Search, RefreshCw } from "lucide-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import CommonDialog from "@/features/components/CommonDialog";



export default function OrganizationsListPage() {
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState("all");
  const [records, setRecords] = useState([]);
  const [view, setView] = useState<"table" | "grid">("table");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getOrgList();
  }, []);

  const getOrgList = async () => {
    const res = await getAllOrg();
    if (res.success) {
      setRecords(res.data);
    }
  };

  const handleStatusChange = async (id, checked) => {
    const status = checked ? "ACTIVE" : "INACTIVE";

    try {
      await api.patch(`/rbac/roles/${id}/status`, { status });
      // update local state
      setRecords((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
      enqueueSnackbar(`Role status has been changed`, { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async () => {
    if (!confirmId) return;
    const res = await api.delete(`/organizations/delete/${confirmId}`);
    if (res.data.success) {
      setRecords((p) => p.filter((a) => a.id !== confirmId));
      enqueueSnackbar("Role is successfully deleted", { variant: "success" });
      setConfirmId(null);
      setOpen(false);
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };

  const openDelete = (id) => {
    setOpen(true);
    setConfirmId(id);
  };

  const refreshData = () => {
    getOrgList();
  };

  return (
    <Box>
      <PageHeader
        title="Organizations"
        subtitle={`${records.length} organizations across your tenants`}
        actions={
          <>
            <Button onClick={refreshData} variant="contained">
              <RefreshCw />
            </Button>
            <Link to="/organizations/new">
              <Button startIcon={<Plus size={16} />} variant="contained">
                Create organization
              </Button>
            </Link>
          </>
        }
      />
      <SectionCard padded={false}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          sx={{ p: 2, borderBottom: 1, borderColor: "divider", alignItems: "center" }}
        >
          <TextField
            placeholder="Search organizations…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            size="small"
            sx={{ flex: 1, maxWidth: 380 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={14} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            size="small"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="all">All plans</MenuItem>
            {["free", "team", "business", "enterprise"].map((p) => (
              <MenuItem key={p} value={p} sx={{ textTransform: "capitalize" }}>
                {p}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ flex: 1 }} />
        </Stack>
        <Grid container spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: getAvatarColor(row.name),
                            width: 32,
                            height: 32,
                            fontSize: 14,
                          }}
                        >
                          {row.name[0].toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography
                            className="mr-3"
                            variant="body2"
                            fontWeight={600}
                            component={Link}
                            to={`/organizations/edit/${row.id}`}
                            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
                          >
                            {row.name}
                          </Typography>
                          <Typography className="m-3" variant="caption" color="text.secondary">
                            {row.slug}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {CapitalFirstCase(row.status)}
                      <Switch
                        color="success"
                        checked={row.status == "active" ? true : false}
                        onChange={(e) => handleStatusChange(row.id, e.target.checked)}
                        slotProps={{ input: { "aria-label": "controlled" } }}
                      />
                    </TableCell>
                    <TableCell>{setDateFormat(row.created_at)}</TableCell>
                    <TableCell>
                      <Link to={`/organizations/edit/${row.id}`}>
                        <button
                          type="button"
                          className="p-2 m-2 btn btn-primary rounded text-red-500 hover:bg-red-100"
                        >
                          <FilePenLine size={16} />
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openDelete(row.id)}
                        className="p-2 rounded btn btn-danger  text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </SectionCard>
      <CommonDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Organization"
        maxWidth="xs"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="btn btn-danger" variant="contained" onClick={() => remove()}>
              Delete
            </Button>
          </>
        }
      >
        <Typography gutterBottom>Are you sure want to delete it ?</Typography>
      </CommonDialog>
    </Box>
  );
}
