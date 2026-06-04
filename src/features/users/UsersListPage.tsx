import { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Box,
  Stack,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Switch,
} from "@mui/material";
import { Search, Plus, Download, Upload, MoreHorizontal, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { type GridColDef } from "@mui/x-data-grid";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable } from "@/components/common/DataTable";
import { mockUsers } from "@/mocks/users";
import { formatDistanceToNow } from "@/lib/date";
import { getAllUsers } from "@/lib/commonApis";
import { getAvatarColor, setDateFormat } from "@/lib/commonFunctions";
import { Trash2, FilePenLine, RefreshCw } from "lucide-react";
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


export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  const [open, setOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    const res = await getAllUsers();
    if (res.success) {
      setUsers(res.data);
    }
  };

  const refreshData = () => {
    getUsersList();
  }

  const handleStatusChange = async (id, checked) => {
    const status = checked ? "ACTIVE" : "INACTIVE";

    try {
      await api.patch(`/userss/${id}/status`, { status });
      // update local state
      setUsers((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
      enqueueSnackbar(`Role status has been changed`, { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };


  const remove = async () => {
    if (!confirmId) return;
    const res = await api.delete(`/users/delete/${confirmId}`);
    if (res.data.success) {
      setUsers((p) => p.filter((a) => a.id !== confirmId));
      enqueueSnackbar("User is successfully deleted", { variant: "success" });
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
        title="Users"
        subtitle={`${mockUsers.length} users across all organizations`}
        actions={
          <>
            <Button onClick={refreshData} variant="contained"><RefreshCw/></Button>
            <Button startIcon={<Upload size={16} />} variant="outlined">
              Import
            </Button>
            <Button startIcon={<Download size={16} />} variant="outlined">
              Export
            </Button>
            <Link to="/users/new">
              <Button startIcon={<Plus size={16} />} variant="contained">
                Invite user
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
          {/* <TextField
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
          </TextField> */}
          <Box sx={{ flex: 1 }} />
        </Stack>
        <Grid container spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((row) => (
                    <TableRow
                      key={row.first_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="td" scope="row">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            sx={{ bgcolor: getAvatarColor(row.first_name), width: 32, height: 32, fontSize: 14 }}
                          >
                            {row.first_name[0].toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography
                              className="mr-3"
                              variant="body2"
                              fontWeight={600}
                              component={Link}
                              to={`/users/${row.id}`}
                              sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
                            >
                              {row.first_name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>{row?.organization?.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Switch
                          color="success"
                          checked={row.is_active}
                          onChange={(e) => handleStatusChange(row.id, e.target.checked)}
                          slotProps={{ input: { "aria-label": "controlled" } }}
                        />
                      </TableCell>
                      <TableCell>{setDateFormat(row.created_at)}</TableCell>
                      <TableCell>
                        <Link to={`/users/edit/${row.id}`}>
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
        title="Delete User"
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
