import { useState, useEffect } from "react";
import { TableContainer, Paper, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack, TextField, InputAdornment, Avatar, Switch, Checkbox, Typography, Grid } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { roles, permissionGroups } from "@/mocks/roles";
import { Link } from "react-router-dom";
import { Plus, MoreHorizontal, Shield, Search, FilePenLine, Trash2, RefreshCw    } from "lucide-react";
import api from "@/features/api/axios";
import { useSnackbar } from "notistack";
import CommonDialog from "@/features/components/CommonDialog";
import { getAvatarColor, CapitalFirstCase, setDateFormat } from "@/lib/commonFunctions";




export default function PermissionMatrixPage() {
  const [records, setRecords] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState("all");

  useEffect(() => {
    getPermissionsList();
  }, []);

  const refreshData = () => {
    getPermissionsList();
  }

  const getPermissionsList = async () => {
    const body = {};
    const res = await api.get("/rbac/permissions/list", body);

    if (res.data.success) {
      setRecords(res.data.data);
    }
  };

  const handleStatusChange = async (id, checked) => {
    const status = checked ? "ACTIVE" : "INACTIVE";

    try {
      await api.patch(`/rbac/permissions/${id}/status`, { status });
      // update local state
      setRecords((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
      enqueueSnackbar(`Role status has been changed`, { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async () => {
    if (!confirmId) return;
    const res = await api.delete(`/rbac/permissions/delete/${confirmId}`);
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
      <PageHeader title="Permissions List" subtitle="At-a-glance view of every permission across every role" actions={
        <>
          <Button onClick={refreshData} variant="contained"><RefreshCw/></Button>
          <Link to="/rbac/permissions/new"><Button startIcon={<Plus size={16} />} variant="contained">Create Permission</Button></Link>
          <Link to="/rbac/roles"><Button  variant="contained">Roles</Button></Link>
        </>
      }/>
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
                  <TableCell>Action</TableCell>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Description</TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records &&
                  records.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="td" scope="row">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            sx={{ bgcolor: getAvatarColor(row.action), width: 32, height: 32, fontSize: 14 }}
                          >
                            {row.action[0].toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography
                              className="mr-3"
                              variant="body2"
                              fontWeight={600}
                              component={Link}
                              to={`/rbac/permission/${row.id}`}
                              sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
                            >
                              {row.action}
                            </Typography>
                          </Box>
                          <Typography
                              className="mr-3"
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {row.key}
                            </Typography>
                        </Stack>
                      
                    </TableCell>
                      <TableCell>{CapitalFirstCase(row.resource)}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      {/* <TableCell>
                        <Switch
                          color="success"
                          checked={row.status == "ACTIVE" ? true : false}
                          onChange={(e) => handleStatusChange(row.id, e.target.checked)}
                          slotProps={{ input: { "aria-label": "controlled" } }}
                        />
                      </TableCell> */}
                      <TableCell>{setDateFormat(row.created_at)}</TableCell>
                      <TableCell>
                        <Link to={`/permissions/edit/${row.id}`}>
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
        title="Delete Permission"
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
