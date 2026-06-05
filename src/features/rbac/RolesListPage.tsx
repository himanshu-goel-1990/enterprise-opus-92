import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Stack,
  Avatar,
  Typography,
  Chip,
  Button,
  IconButton,
  Switch,
  TextField,
  InputAdornment,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { SectionCard } from "@/components/common/SectionCard";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { roles } from "@/mocks/roles";
import { Plus, Trash2, FilePenLine, MoreHorizontal, Shield, Search, RefreshCw } from "lucide-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "@/features/api/axios";
import { useSnackbar } from "notistack";
import CommonDialog from "@/features/components/CommonDialog";
import { getAllRoles } from "@/lib/commonApis";
import { getAvatarColor, CapitalFirstCase, setDateFormat } from "@/lib/commonFunctions";

export default function RolesListPage() {
  const [records, setRecords] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState("all");

  useEffect(() => {
    getRolesList();
  }, []);

  const refreshData = () => {
    getRolesList();
  };

  const getRolesList = async () => {
    const body = {};
    const res = await getAllRoles();
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
    const res = await api.delete(`/rbac/roles/delete/${confirmId}`);
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

  return (
    <Box>
      <PageHeader
        title="Roles"
        subtitle="Define what people can do across organizations and teams"
        actions={
          <>
            <Button onClick={refreshData} variant="contained">
              <RefreshCw />
            </Button>
            <Link to="/rbac/roles/new">
              <Button startIcon={<Plus size={16} />} variant="contained">
                Create role
              </Button>
            </Link>
            <Link to="/rbac/permissions">
              <Button variant="contained">Permissions</Button>
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
            placeholder="Search roles..."
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
                  <TableCell>Role Name</TableCell>
                  <TableCell>Scope</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                            to={`/rbac/roles/edit/${row.id}`}
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
                    <TableCell>{CapitalFirstCase(row.scope)}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{setDateFormat(row.created_at)}</TableCell>
                    <TableCell>
                      <Link to={`/roles/edit/${row.id}`}>
                        <Tooltip title="Edit" placement="top">
                          <IconButton
                            type="button"
                            className="p-2 m-1 btn btn-primary rounded text-red-500 hover:bg-red-100"
                          >
                            <FilePenLine size={16} />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip title="Delete" placement="top">
                        <IconButton
                          type="button"
                          sx={{
                            color: "red",
                          }}
                          onClick={() => openDelete(row.id)}
                          className="p-2 m-1 rounded btn btn-danger text-red-500 hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </Tooltip>
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
        title="Delete Role"
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
