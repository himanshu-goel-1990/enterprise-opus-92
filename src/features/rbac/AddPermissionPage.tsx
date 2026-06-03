import { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { ArrowLeft, Save, Plus, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { permissionGroups, roles } from "@/mocks/roles";
import { Link } from "react-router-dom";
import api from "@/features/api/axios";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const permissionActions = [
  { label: "Select Action", value: "NOVALUE" },
  { label: "Manage", value: "MANAGE" },
  { label: "Create", value: "CREATE" },
  { label: "Read", value: "READ" },
  { label: "Update", value: "UPDATE" },
  { label: "Delete", value: "DELETE" },
];

export default function AddPermissionPage() {
  const nav = useNavigate();
  const [group, setGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [action, setAction] = useState(permissionActions[0].value);
  const [key, setKey] = useState();
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [risk, setRisk] = useState<"low" | "medium" | "high">("low");
  const [assignedRoles, setAssignedRoles] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const body = {};
    const res = await api.get("/rbac/groups/list", body);
    console.log(res.data.data);

    if (res.data.success) {
      setGroups(res.data.data);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitPermission = async () => {
    if (action == "NOVALUE") {
      enqueueSnackbar(`Permission action is required field`, { variant: "error" });
      return;
    }
    const body = {
      group,
      action,
      description,
    };
    console.log(body);

    const res = await api.post("/rbac/permissions/add", body);
    console.log(res);
    if (res.data.success) {
      enqueueSnackbar(`Permission added successfully`, { variant: "success" });
      setTimeout(() => nav("/rbac/permissions"), 700);
    } else {
      enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      return 0;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const res = await api.post("/rbac/groups/add", formJson);
    if (res.data.success) {
      enqueueSnackbar(`Group added successfully`, { variant: "success" });
      setTimeout(() => nav("/rbac/permissions/new"), 700);
      form.reset();
      getGroups();
      handleClose();
    } else {
      enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      return 0;
    }
  };

  const toggle = (id: string) =>
    setAssignedRoles((p) => (p.includes(id) ? p.filter((r) => r !== id) : [...p, id]));

  return (
    <Box>
      <Button
        startIcon={<ArrowLeft size={14} />}
        onClick={() => nav("/rbac/permissions")}
        size="small"
        sx={{ mb: 1 }}
      >
        Back
      </Button>
      <PageHeader
        title="Create permission"
        subtitle="Define a granular permission and attach it to roles"
        actions={
          <>
            <Link to="/rbac/permissions">
              <Button startIcon={<List size={16} />} variant="contained">
                Permissions
              </Button>
            </Link>
            <Button
              onClick={() => handleClickOpen()}
              variant="contained"
              startIcon={<Plus size={16} />}
            >
              Add Group
            </Button>
          </>
        }
      />

      <Grid container spacing={2}>
        <Grid item offset={4} size={4} xs={12} md={12}>
          <SectionCard title="Permission">
            <Grid container spacing={2} className="m-4">
              <Grid item size={12} xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  {groups &&
                    groups.map((g) => (
                      <MenuItem key={g.id} value={g.id}>
                        {g.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="m-4">
              <Grid item size={12} xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                >
                  {permissionActions.map((g) => (
                    <MenuItem key={g.value} value={g.value}>
                      {g.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="m-4">
              <Grid item size={12} xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="m-4 float-right">
              <Grid item size={12} xs={12}>
                <Button
                  type="submit"
                  onClick={submitPermission}
                  variant="contained"
                  startIcon={<Save size={16} />}
                >
                  Create Permission
                </Button>
              </Grid>
            </Grid>
          </SectionCard>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <SectionCard title="Assign to roles">
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {roles.map((r) => (
                <Chip key={r.id} label={r.name} variant={assignedRoles.includes(r.id) ? "filled" : "outlined"} color={assignedRoles.includes(r.id) ? "primary" : "default"} onClick={() => toggle(r.id)} />
              ))}
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>You can change role assignments later from the permission matrix.</Typography>
          </SectionCard>
        </Grid> */}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              className="py-4"
              autoFocus
              required
              margin="dense"
              id="groupName"
              name="groupName"
              label="Group Name"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              required
              multiline
              margin="dense"
              id="groupDesc"
              name="groupDesc"
              label="Group Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save Group
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast(null)}>
        <Alert severity="success" variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
