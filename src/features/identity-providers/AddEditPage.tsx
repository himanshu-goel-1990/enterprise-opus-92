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
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import api from "@/features/api/axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { getAllRoles } from "@/lib/commonApis";
import { getAvatarColor } from "@/lib/commonFunctions";


const allStatus = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

export default function AddOrganizationPage() {
  const { orgId } = useParams();
  const nav = useNavigate();

  const [plan, setPlan] = useState("team");
  const [industry, setIndustry] = useState("SaaS");
  const [region, setRegion] = useState("NA · East");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [trial, setTrial] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [orgData, setOrgData] = useState({});
  const [data, setData] = useState({});
  const isEditMode = orgId && orgId !== "new";
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchOrganization = async () => {
      try {
        const res = await api.get(`/organizations/edit/${orgId}`);
        if (res.data.success) {
          setData(res.data.data);
        } else {
          enqueueSnackbar(`Organization not found`, { variant: "error" });
          return 0;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrganization();
  }, [orgId, isEditMode]);

  const autoSlug = useMemo(
    () =>
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    [name],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    if (!data.name) {
      enqueueSnackbar(`Name, Email and Password are required fields`, { variant: "error" });
      return;
    }

    const body = data;

    const res = isEditMode
      ? await api.patch("/organizations/update/" + orgId, body)
      : await api.post("/organizations/add", body);

    if (res.data.success) {
      enqueueSnackbar(`${res.data.message}`, { variant: "success" });
      navigate("/organizations");
    } else {
      enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      return;
    }

    setTimeout(() => nav("/organizations"), 700);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowLeft size={14} />}
        onClick={() => nav("/organizations")}
        size="small"
        sx={{ mb: 1 }}
      >
        Back
      </Button>
      <PageHeader
        title={isEditMode ? "Update Organization" : "Create organization"}
        subtitle="Provision a new tenant with an owner and starting plan"
        actions={
          <Button onClick={handleSubmit} variant="contained" startIcon={<Save size={16} />}>
            {isEditMode ? "Update Organization" : "Create organization"}
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Organization details">
            <Grid container spacing={2} className="py-2">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Name"
                  value={data.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="slug"
                  label="Slug"
                  value={data.slug}
                  onChange={handleChange}
                  helperText="Used in URLs and API"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="py-2">
              <Grid item xs={12} sm={6} style={{ minWidth: "30%" }}>
                <TextField
                  fullWidth
                  required
                  select
                  name="status"
                  label="Status"
                  value={data.status || ""}
                  onChange={handleChange}
                >
                  {allStatus.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} style={{ minWidth: "30%" }}>
                <TextField
                  fullWidth
                  select
                  label="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  {[
                    "SaaS",
                    "FinTech",
                    "Healthcare",
                    "E-commerce",
                    "Media",
                    "Education",
                    "Manufacturing",
                    "Gaming",
                  ].map((i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} style={{ minWidth: "30%" }}>
                <TextField
                  fullWidth
                  select
                  label="Region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {[
                    "NA · East",
                    "NA · West",
                    "EU · Central",
                    "EU · West",
                    "APAC · Tokyo",
                    "APAC · Singapore",
                    "LATAM",
                  ].map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </SectionCard>

          {/* <Box mt={2}>
            <SectionCard title="Owner">
              <div className="w-100 py-3">
                <TextField  fullWidth  type="email" label="Owner email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)}/>
              </div>
              <div className="w-100 py-3">
                <TextField  fullWidth type="password" label="Owner Password" value={ownerPassword} onChange={(e) => setOwnerPassword(e.target.value)} />
              </div>
            </SectionCard>
          </Box> */}
        </Grid>

        <Grid item xs={12} md={4}>
          <SectionCard title="Plan">
            <Stack spacing={2}>
              <TextField
                fullWidth
                select
                label="Plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                {["free", "team", "business", "enterprise"].map((p) => (
                  <MenuItem key={p} value={p} sx={{ textTransform: "capitalize" }}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={<Switch checked={trial} onChange={(e) => setTrial(e.target.checked)} />}
                label="Start with 14-day trial"
              />
              <Typography variant="caption" color="text.secondary">
                You can change the plan anytime from billing.
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
