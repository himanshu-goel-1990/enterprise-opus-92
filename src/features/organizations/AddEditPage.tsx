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
import ImageUpload from "@/components/common/ImageUpload";
import { makeSlug } from "@/lib/commonFunctions";


const allStatus = [
  { label: "Active", value: "active" },
  { label: "Pending Setup", value: "pending_setup" },
  { label: "Suspended", value: "suspended" },
];

const allDomainStatus = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && { slug: makeSlug(value) }),
    }));
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
        <Grid className="w-100" item xs={12} md={12}>
          <SectionCard title="Organization details">
            <Grid container spacing={2} className="py-3">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Name"
                  value={data.name ?? ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  required
                  name="slug"
                  label="Slug"
                  value={data.slug ?? ""}
                  onChange={handleChange}
                  helperText="Used in URLs and API"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  required
                  name="display_name"
                  label="Display Name"
                  value={data.display_name ?? ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="py-3">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  required
                  name="domain"
                  label="Domain"
                  value={data.domain ?? ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  required
                  select
                  name="domain_verified"
                  label="Domain domain_verified"
                  value={data.domain_verified ?? ""}
                  onChange={handleChange}
                >
                  {allDomainStatus.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  required
                  select
                  name="status"
                  label="Organization Status"
                  value={data.status ?? ""}
                  onChange={handleChange}
                >
                  {allStatus.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="py-5">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="Metadata"
                  label="Metadata (Optional)"
                  value={JSON.stringify(data.metadata) ?? ""}
                  onChange={handleChange}
                  helperText="JSON format"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="Settings"
                  label="settings (Optional)"
                  value={JSON.stringify(data.settings) ?? ""}
                  onChange={handleChange}
                  helperText="JSON format"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="py-2">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box className="py-2">
                  <ImageUpload
                    label="Organization logo"
                    value={data.logo || null}
                    onChange={(url) => setData((prev: any) => ({ ...prev, logo: url }))}
                    uploadUrl="/upload/image"
                    fieldName="file"
                    shape="square"
                    size={120}
                    helperText="Square PNG/JPG, up to 5MB"
                  />
                </Box>
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
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
