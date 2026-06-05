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
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable } from "@/components/common/DataTable";
import { Badge } from "react-bootstrap";
import { Plus, Pencil, Trash2, Copy, Search } from "lucide-react";
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
import { getAvatarColor } from "@/lib/commonFunctions";
import { getAllPolicies } from "@/lib/commonApis";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PolicyStatus>("all");
  const [effectFilter, setEffectFilter] = useState<"all" | PolicyEffect>("all");
  const [editing, setEditing] = useState<Policy | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Policy | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return policies.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (effectFilter !== "all" && p.effect !== effectFilter) return false;
      if (q && !`${p.name} ${p.description} ${p.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [policies, search, statusFilter, effectFilter]);

  useEffect(() => {
    getPolicyList();
  }, []);

  const refreshData = () => {
    getPolicyList();
  };

  const getPolicyList = async () => {
    const body = {};
    const res = await getAllPolicies();
    if (res.success) {
      setPolicies(res.data);
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

  const openCreate = () => setEditing(emptyPolicy());
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

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      setToast({ msg: "Name is required", type: "error" });
      return;
    }
    if (editing.resources.length === 0 || editing.actions.length === 0) {
      setToast({ msg: "Add at least one resource and action", type: "error" });
      return;
    }
    try {
      JSON.parse(editing.conditions || "{}");
    } catch {
      setToast({ msg: "Conditions must be valid JSON", type: "error" });
      return;
    }

    if (!editing.id) {
      const created: Policy = {
        ...editing,
        id: `pol_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPolicies((prev) => [created, ...prev]);
      setToast({ msg: "Policy created", type: "success" });
    } else {
      setPolicies((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...editing, updatedAt: new Date().toISOString() } : p,
        ),
      );
      setToast({ msg: "Policy updated", type: "success" });
    }
    setEditing(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
      minWidth: 200,
      renderCell: (p: any) => (
        <Stack>
          <Typography variant="body2" fontWeight={600}>
            {p.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {p.row.slug}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "effect_default",
      headerName: "Effect",
      width: 110,
      renderCell: (p: any) => (
        <Chip
          size="small"
          label={p.row.effect_default}
          color={p.row.effect_default === "allow" ? "success" : "error"}
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      field: "policy_type",
      headerName: "Policy Type",
      width: 130,
      renderCell: (p: any) => (
        <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
          {p.row.policy_type}
        </Typography>
      ),
    },
    {
      field: "resources",
      headerName: "Resources",
      flex: 1,
      minWidth: 180,
      renderCell: (p: any) => (
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
          {p.row.resources.slice(0, 2).map((r: string) => (
            <Chip key={r} size="small" label={r} variant="outlined" />
          ))}
          {p.row.resources.length > 2 && (
            <Chip size="small" label={`+${p.row.resources.length - 2}`} variant="outlined" />
          )}
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 180,
      renderCell: (p: any) => (
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
          {p.row.actions.slice(0, 3).map((a: string) => (
            <Chip key={a} size="small" label={a} />
          ))}
          {p.row.actions.length > 3 && <Chip size="small" label={`+${p.row.actions.length - 3}`} />}
        </Stack>
      ),
    },
    { field: "priority", headerName: "Priority", width: 100 },
    {
      field: "is_active",
      headerName: "Status",
      width: 130,
      renderCell: (p: any) => (
        <>
          {p.row.is_active ? (
            <Badge color="success">Active</Badge>
          ) : (
            <Badge color="error">Inactive</Badge>
          )}
          <Switch
            color="success"
            checked={p.row.is_active}
            onChange={(e) => handleStatusChange(p.row.id, e.target.checked)}
            slotProps={{ input: { "aria-label": "controlled" } }}
          />
        </>
      ),
    },
    {
      field: "rowActions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (p: any) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => openEdit(p.row)}>
              <Pencil size={15} />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Duplicate">
                        <IconButton size="small" onClick={() => duplicate(p.row)}><Copy size={15} /></IconButton>
                    </Tooltip> */}
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => setConfirmDelete(p.row)}>
              <Trash2 size={15} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Access Policies"
        subtitle="Define fine-grained allow/deny rules for resources and actions"
        actions={
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={openCreate}>
            New policy
          </Button>
        }
      />

      <SectionCard
        title={`${filtered.length} policies`}
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
        <DataTable rows={filtered} columns={columns as any} getRowId={(r) => r.id} />
      </SectionCard>

      {/* Create / Edit dialog */}
      <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="md">
        <DialogTitle>{editing?.id ? "Edit policy" : "Create policy"}</DialogTitle>
        <DialogContent dividers>
          {editing && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  required
                  label="Policy name"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Effect"
                  value={editing.effect}
                  onChange={(e) =>
                    setEditing({ ...editing, effect: e.target.value as PolicyEffect })
                  }
                >
                  <MenuItem value="allow">Allow</MenuItem>
                  <MenuItem value="deny">Deny</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Scope"
                  value={editing.scope}
                  onChange={(e) =>
                    setEditing({ ...editing, scope: e.target.value as Policy["scope"] })
                  }
                >
                  <MenuItem value="organization">Organization</MenuItem>
                  <MenuItem value="team">Team</MenuItem>
                  <MenuItem value="global">Global</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value as PolicyStatus })
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack sx={{ px: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Priority ({editing.priority})
                  </Typography>
                  <Slider
                    value={editing.priority}
                    min={1}
                    max={100}
                    onChange={(_, v) => setEditing({ ...editing, priority: v as number })}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Targets</Typography>
                </Divider>
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={RESOURCE_OPTIONS}
                  value={editing.resources}
                  onChange={(_, v) => setEditing({ ...editing, resources: v })}
                  renderTags={(value, getTagProps) =>
                    value.map((opt, i) => (
                      <Chip size="small" label={opt} {...getTagProps({ index: i })} key={opt} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Resources" placeholder="Add resource" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={ACTION_OPTIONS}
                  value={editing.actions}
                  onChange={(_, v) => setEditing({ ...editing, actions: v })}
                  renderTags={(value, getTagProps) =>
                    value.map((opt, i) => (
                      <Chip size="small" label={opt} {...getTagProps({ index: i })} key={opt} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Actions" placeholder="Add action" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={SUBJECT_OPTIONS}
                  value={editing.subjects}
                  onChange={(_, v) => setEditing({ ...editing, subjects: v })}
                  renderTags={(value, getTagProps) =>
                    value.map((opt, i) => (
                      <Chip size="small" label={opt} {...getTagProps({ index: i })} key={opt} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subjects (roles or users)"
                      placeholder="role:admin, user:..."
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Conditions (JSON)"
                  value={editing.conditions}
                  onChange={(e) => setEditing({ ...editing, conditions: e.target.value })}
                  helperText='e.g. {"ip_range": "10.0.0.0/8", "mfa": true}'
                  InputProps={{ sx: { fontFamily: "monospace", fontSize: 13 } }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={save}>
            {editing?.id ? "Save changes" : "Create policy"}
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
