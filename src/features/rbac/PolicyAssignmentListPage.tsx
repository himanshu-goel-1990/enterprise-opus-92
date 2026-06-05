import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Autocomplete,
  Slider,
  Typography,
  Divider,
  Switch,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import { Badge } from "react-bootstrap";
import { Plus, Pencil, Trash2, Copy, Search, FilePenLine, UsersRound } from "lucide-react";
import {
  seedPolicies,
  type Policy,
  type PolicyEffect,
  type PolicyStatus,
  RESOURCE_OPTIONS,
  ACTION_OPTIONS,
  SUBJECT_OPTIONS,
} from "@/mocks/policies";
import api from "@/features/api/axios";
import { enqueueSnackbar, useSnackbar } from "notistack";
import CommonDialog from "@/features/components/CommonDialog";
import { getAvatarColor, setDateFormat } from "@/lib/commonFunctions";
import {
  getAllPolicyAssignments,
  getAllOrg,
  getAllPolicies,
  getAllRoles,
  getAllUsers,
} from "@/lib/commonApis";
import { assignments } from "@/mocks/licenses";

const emptyPolicy = (): Policy => ({
  id: "",
  name: "",
  description: "",
  effect: "allow",
  status: "active",
  scope: "organization",
  resources: [],
  actions: [],
  subjects: [],
  conditions: "{}",
  priority: 50,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "you@acme.com",
});

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [orgs, setOrgs] = useState([]);
  const [pols, setPols] = useState([]);
  const [roles, setRoles] = useState([]);
  const [usrs, setUsrs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PolicyStatus>("all");
  const [effectFilter, setEffectFilter] = useState<"all" | PolicyEffect>("all");
  const [editing, setEditing] = useState({});
  const [openDialogue, setOpenDialogue] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Policy | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    getPolicyOrgsList();
    getPolicyAssignList();
  }, []);

  const getPolicyOrgsList = async () => {
    try {
      const [policies, organizations] = await Promise.all([getAllPolicies(), getAllOrg()]);

      setPols(policies.data);
      setOrgs(organizations.data);
    } catch (error) {
      console.error("Failed to load policies and organizations:", error);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return policies.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (effectFilter !== "all" && p.effect !== effectFilter) return false;
      if (q && !`${p.name} ${p.description} ${p.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [policies, search, statusFilter, effectFilter]);

  const refreshData = () => {
    getPolicyAssignList();
  };

  const getPolicyAssignList = async () => {
    const body = {};
    const res = await getAllPolicyAssignments();
    if (res.success) {
      setPolicies(res.data);
    }
  };

  const handleTypeChange = async (val) => {
    if (val == "role") {
      if (roles.length == 0) {
        const rolesData = await getAllRoles();
        setRoles(rolesData.data);
      }
    } else {
      if (usrs.length == 0) {
        const userData = await getAllUsers();
        setUsrs(userData.data);
      }
    }
  };

  const handleStatusChange = async (id, checked) => {
    const status = checked ? true : false;

    try {
      await api.patch(`/rbac/policies/${id}/status`, { status });
      // update local state
      setPolicies((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_active: checked } : item)),
      );
      enqueueSnackbar(`Policy status has been changed`, { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const openCreate = () => setOpenDialogue(true);
  const openEdit = (p: Policy) => setEditing({ ...p });
  const duplicate = (p: Policy) => {
    const copy: Policy = {
      ...p,
      id: `pol_${Math.random().toString(36).slice(2, 8)}`,
      name: `${p.name} (copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPolicies((prev) => [copy, ...prev]);
    setToast({ msg: "Policy duplicated", type: "success" });
  };

  const remove = (p: Policy) => {
    setPolicies((prev) => prev.filter((x) => x.id !== p.id));
    setConfirmDelete(null);
    setToast({ msg: "Policy deleted", type: "success" });
  };

  const save = async () => {
    // if (!editing) return;
    // if (!editing.name.trim()) {
    //   setToast({ msg: "Name is required", type: "error" });
    //   return;
    // }
    // if (editing.resources.length === 0 || editing.actions.length === 0) {
    //   setToast({ msg: "Add at least one resource and action", type: "error" });
    //   return;
    // }
    // try {
    //   JSON.parse(editing.conditions || "{}");
    // } catch {
    //   setToast({ msg: "Conditions must be valid JSON", type: "error" });
    //   return;
    // }

    if (!editing.id) {
        console.log(editing);
        const body = editing
        const res = await api.post("/rbac/policy-assignments/add", body);
        setToast({ msg: "Policy created", type: "success" });
        refreshData()
    } else {
    //   setPolicies((prev) =>
    //     prev.map((p) =>
    //       p.id === editing.id ? { ...editing, updatedAt: new Date().toISOString() } : p,
    //     ),
    //   );
      setToast({ msg: "Policy updated", type: "success" });
    }
    setEditing(null);
    setOpenDialogue(false);
  };

  return (
    <Box>
      <PageHeader
        title="Access Policies"
        subtitle="Define fine-grained allow/deny rules for resources and actions"
        actions={
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={openCreate}>
            New Policy Assignments
          </Button>
        }
      />

      <SectionCard
        title={`${policies.length} policies`}
        action={
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Search policies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search size={14} style={{ marginRight: 6, opacity: 0.6 }} />,
              }}
              sx={{ width: 240 }}
            />
            <TextField
              size="small"
              select
              label="Effect"
              value={effectFilter}
              onChange={(e) => setEffectFilter(e.target.value as any)}
              sx={{ width: 130 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="allow">Allow</MenuItem>
              <MenuItem value="deny">Deny</MenuItem>
            </TextField>
            <TextField
              size="small"
              select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              sx={{ width: 140 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </TextField>
          </Stack>
        }
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Policy</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.map((row) => (
                <TableRow
                  key={row.policy.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="td" scope="row">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: getAvatarColor(row.policy.name),
                          width: 32,
                          height: 32,
                          fontSize: 14,
                        }}
                      >
                        {row.policy.name[0].toUpperCase()}
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
                          {row.policy.name}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.organization.name}</TableCell>
                  <TableCell>{row.role?.name}</TableCell>
                  <TableCell>{row.user?.first_name} {row.user?.last_name}</TableCell>
                  <TableCell>{setDateFormat(row.created_at)}</TableCell>
                  <TableCell>{setDateFormat(row.updated_at)}</TableCell>
                  <TableCell>
                    <Link to={`/organizations/edit/${row.id}`}>
                      <Tooltip title="Edit" placement="top">
                        <IconButton
                          type="button"
                          className="p-2 m-1 btn btn-primary rounded text-red-500 hover:bg-red-100"
                        >
                          <FilePenLine size={16} />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link to={`/organizations/members/${row.id}`}>
                      <Tooltip title="Users" placement="top">
                        <IconButton
                          type="button"
                          sx={{
                            color: "green",
                          }}
                          className="p-2 m-1 btn btn-primary rounded text-red-500 hover:bg-red-100"
                        >
                          <UsersRound size={16} />
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
      </SectionCard>

      {/* Create / Edit dialog */}
      <Dialog open={!!openDialogue} onClose={() => setOpenDialogue(null)} fullWidth maxWidth="xs">
        <DialogTitle>
          {editing ? "Edit Policy Assignments" : "Create Policy Assignments"}
        </DialogTitle>
        <DialogContent dividers>
          {editing && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <TextField
                  fullWidth
                  select
                  label="Policy"
                  value={editing.policy_id ?? ""}
                  onChange={(e) => setEditing({ ...editing, policy_id: e.target.value })}
                >
                  {pols.map((policy) => (
                    <MenuItem key={policy.id} value={policy.id}>
                      {policy.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <TextField
                  fullWidth
                  select
                  label="Organization"
                  value={editing.org_id ?? ""}
                  onChange={(e) => setEditing({ ...editing, org_id: e.target.value })}
                >
                  {orgs.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <TextField
                  fullWidth
                  select
                  label="Assignment Type"
                  value={editing.type ?? ""}
                  onChange={(e) => {
                    setEditing({ ...editing, type: e.target.value });
                    handleTypeChange(e.target.value);
                  }}
                >
                  <MenuItem key="role" value={"role"}>
                    Role
                  </MenuItem>
                  <MenuItem key="user" value={"user"}>
                    User
                  </MenuItem>
                </TextField>
              </Grid>

               {editing && editing.type == 'role' && <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <TextField
                    fullWidth
                    select
                    label="Roles"
                    value={editing.role_id ?? ""}
                    onChange={(e) => setEditing({ ...editing, role_id: e.target.value })}
                    >
                    {roles &&
                        roles.map((org) => (
                        <MenuItem key={org.id} value={org.id}>
                            {org.name}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid> }

               {editing && editing.type == 'user' &&  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <TextField
                    fullWidth
                    select
                    label="Users"
                    value={editing.user_id ?? ""}
                    onChange={(e) => setEditing({ ...editing, user_id: e.target.value })}
                    >
                    {usrs &&
                        usrs.map((org) => (
                        <MenuItem key={org.id} value={org.id}>
                            {org.first_name} {org.last_name}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid> }
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogue(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>
            {editing?.id ? "Save Assignment" : "Create Assignment"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Delete policy?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This will permanently delete <strong>{confirmDelete?.name}</strong>. This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => confirmDelete && remove(confirmDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {toast ? (
          <Alert severity={toast.type} variant="filled">
            {toast.msg}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
