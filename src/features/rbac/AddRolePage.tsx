import { useEffect, useState } from "react";
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
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { permissionGroups, roles } from "@/mocks/roles";
import api from "@/features/api/axios";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CapitalFirstCase } from "@/lib/commonFunctions";
import { getPermissionsRoleWiseList } from "@/lib/commonApis";


export default function AddRolePage() {
  const { roleId } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [gp, setGP] = useState([]);
  const [userPerms, setUserPerms] = useState([]);
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState<"organization" | "team" | "global">("organization");
  const [cloneFrom, setCloneFrom] = useState<string>("");
  const [perms, setPerms] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const isEditMode = roleId && roleId !== "new";

  useEffect(() => {
    if (!isEditMode) return;

    const fetchRole = async () => {
      try {
        const res = await api.get(`/rbac/roles/edit/${roleId}`);
        if (res.data.success) {
          const { name, description, rolePermissions } = res.data.data;
          setName(name);
          setDescription(description);
          const initialPerms = Object.fromEntries(
            res.data.data.rolePermissions.map((rp) => [rp.permission_id, true])
          );

          setPerms(initialPerms);
        } else {
          enqueueSnackbar(`Role not found`, { variant: "error" });
          return 0;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRole();
  }, [roleId, isEditMode]);

  useEffect(() => {
    getPermissionsList();
  }, []);


  const getPermissionsList = async () => {
    const body = {};
    const res = await getPermissionsRoleWiseList();
    if (res.success) {
      setGP(res.data);
    }
  };

  const getPermissionKey = (groupKey: string, action: string) => `${groupKey}:${action}`;

  const toggle = (permissionId: string) => {
    setPerms((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const toggleGroup = (groupId: string, permissions: any[]) => {
    setPerms((prev) => {
      const allOn = permissions.every((p) => prev[p.id]);

      const next = { ...prev };

      permissions.forEach((p) => {
        next[p.id] = !allOn;
      });

      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      enqueueSnackbar(`Role name is required field`, { variant: "error" });
      return;
    }

    const body = {
      name,
      description,
      perms,
    };
    const res = await api.patch(`/rbac/roles/update/${roleId}`, body);
    console.log(res);
    if (res.data.success) {
      enqueueSnackbar(`Role updated successfully`, { variant: "success" });
      setTimeout(() => nav("/rbac/roles"), 700);
    } else {
      enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      return;
    }
  };

  //const enabledCount = Object.values(perms).filter(Boolean).length;

  return (
    <Box>
      <Button
        startIcon={<ArrowLeft size={14} />}
        onClick={() => nav("/rbac/roles")}
        size="small"
        sx={{ mb: 1 }}
      >
        Back
      </Button>
      <PageHeader
        title={isEditMode ? "Update Role" : "Create role"}
        subtitle="Define a role with a focused set of permissions"
        actions={
          <Button type="button" onClick={handleSubmit} variant="contained" startIcon={<Save size={16} />}>
            {isEditMode ? "Update Role" : "Create role"}
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <SectionCard title="Details">
            <Stack spacing={2}>
              <TextField
                required
                label="Role name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Description"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                select
                label="Scope"
                value={scope}
                onChange={(e) => setScope(e.target.value as any)}
              >
                {["organization", "team", "global"].map((s) => (
                  <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <Divider />
              <TextField
                select
                label="Clone permissions from"
                value={cloneFrom}
                onChange={(e) => {
                  setCloneFrom(e.target.value);
                  // simulated clone: nothing real to copy
                  setToast(e.target.value ? "Permissions cloned" : null);
                }}
              >
                <MenuItem value="">— None —</MenuItem>
                {roles.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="caption" color="text.secondary">
                {/* {enabledCount} permissions enabled */}
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <SectionCard title="Permissions" subtitle="Toggle groups or individual permissions">
            <Stack spacing={2.5}>
              {gp.map((g) => {
                const allOn = g.permissions.every((p) => perms[p.id]);

                return (
                  <Box key={g.id}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 1 }}
                    >
                      <Typography variant="subtitle2" fontWeight={700}>
                        {CapitalFirstCase(g.category)}
                      </Typography>

                      <Button
                        size="small"
                        onClick={() => toggleGroup(g.id, g.permissions)}
                      >
                        {allOn ? "Clear all" : "Select all"}
                      </Button>
                    </Stack>

                    <Grid container>
                      {g.permissions.map((p) => (
                        <Grid item xs={6} sm={4} key={p.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={!!perms[p.id]}
                                onChange={() => toggle(p.id)}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {p.action.replace(/_/g, " ")}
                              </Typography>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Divider sx={{ mt: 1 }} />
                  </Box>
                );
              })}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast(null)}>
        <Alert severity="success" variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
