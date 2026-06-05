import { useState, useEffect } from "react";
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
  Switch,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/features/api/axios";
import { getAllOrg, getAllRoles } from "@/lib/commonApis";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

export default function AddUserPage() {
  const { userId } = useParams();
  const nav = useNavigate();
  const [orgs, setOrgs] = useState([]);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    org_id: "",
    roleIds: [],
  });
  const [roles, setRoles] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [roleIds, setRoleIds] = useState<string[]>([]);
  const [sendInvite, setSendInvite] = useState(true);
  const [requireMfa, setRequireMfa] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const isEditMode = userId && userId !== "new";

  useEffect(() => {
    getOrgList();
    getRolesList();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/edit/${userId}`);
        if (res.data.success) {
          setData(res.data.data);
        } else {
          enqueueSnackbar(`User not found`, { variant: "error" });
          return 0;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId, isEditMode]);

  const getRolesList = async () => {
    const body = {};
    const res = await getAllRoles();
    if (res.success) {
      setRoles(res.data);
    }
  };

  const getOrgList = async () => {
    const res = await getAllOrg();
    if (res.success) {
      setOrgs(res.data);
    }
  };

  const addUserSubmit = async () => {
    if (!data.first_name || !data.last_name || !data.email || !data.org_id) {
      enqueueSnackbar(`First Name, Last Name, Email and Organization are required fields`, {
        variant: "error",
      });
      return;
    }

    data.roleIds = roleIds;
    const body = data;
    console.log(body);

    const res = isEditMode
      ? await api.patch("/users/update/" + userId, body)
      : await api.post("/users/add", body);
    console.log(res);
    if (res.data.success) {
      enqueueSnackbar(`User added successfully`, { variant: "success" });
      setTimeout(() => nav("/users"), 700);
    } else {
      enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      return 0;
    }
    setToast(sendInvite ? `Invitation sent to ${email}` : `User ${email} created`);
    setTimeout(() => nav("/users"), 700);
  };

  const toggleRole = (id: string) =>
    setRoleIds((p) => (p.includes(id) ? p.filter((r) => r !== id) : [...p, id]));

  const assignedRoleIds = data?.userRoleAssignments?.map(({ role }) => role.id) || [];

  return (
    <Box>
      <Button
        startIcon={<ArrowLeft size={14} />}
        onClick={() => nav("/users")}
        size="small"
        sx={{ mb: 1 }}
      >
        Back
      </Button>
      <PageHeader
        title="Add user"
        subtitle="Invite or provision a new user and assign roles"
        actions={
          <Button
            type="button"
            onClick={addUserSubmit}
            variant="contained"
            startIcon={<Save size={16} />}
          >
            {isEditMode ? "Update User" : "Create user"}
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid item size={6} xs={12} md={8}>
          <SectionCard title="Identity">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  value={data?.first_name || ""}
                  onChange={(e) => setData({ ...data, first_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  value={data?.last_name || ""}
                  onChange={(e) => setData({ ...data, last_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  value={data?.email || ""}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  value={data?.password || ""}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </Grid>
            </Grid>
          </SectionCard>

          <Box mt={2}>
            <SectionCard title="Roles" subtitle="Select one or more roles to assign at creation">
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {roles.map((role) => (
                  <Chip
                    key={role.id}
                    label={role.name}
                    onClick={() => toggleRole(role.id)}
                    color={assignedRoleIds.includes(role.id) ? "primary" : "default"}
                    variant={assignedRoleIds.includes(role.id) ? "filled" : "outlined"}
                  />
                ))}
              </Stack>
            </SectionCard>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <SectionCard title="Organization & access">
            <Stack spacing={2}>
              <TextField
                fullWidth
                select
                label="Organization"
                value={data?.org_id || ""}
                onChange={(e) => setData({ ...data, org_id: e.target.value })}
              >
                {orgs &&
                  orgs.map((o) => (
                    <MenuItem key={o.id} value={o.id}>
                      {o.name}
                    </MenuItem>
                  ))}
              </TextField>
              <FormControlLabel
                control={
                  <Switch checked={sendInvite} onChange={(e) => setSendInvite(e.target.checked)} />
                }
                label="Send email invitation"
              />
              <FormControlLabel
                control={
                  <Switch checked={requireMfa} onChange={(e) => setRequireMfa(e.target.checked)} />
                }
                label="Require MFA on first login"
              />
              <Typography variant="caption" color="text.secondary">
                Invited users sign in via SSO when enabled.
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
