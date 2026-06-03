import { Box, Button, Grid, TextField, MenuItem, Stack, Typography, Snackbar, Alert, Switch, FormControlLabel, Divider } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { mockOrgs } from "@/mocks/organizations";

const PRODUCTS = ["Lovable Platform", "Analytics Add-on", "AI Gateway", "SSO Add-on"];
const TIERS = ["Starter", "Pro", "Business", "Enterprise"];

function generateKey(tier: string) {
  const block = () => Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4).padEnd(4, "X");
  const prefix = tier.slice(0, 3).toUpperCase();
  return `LCV-${prefix}-${block()}-${block()}-${block()}`;
}

export default function AddLicensePage() {
  const nav = useNavigate();
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [tier, setTier] = useState("Pro");
  const [seats, setSeats] = useState(10);
  const [orgId, setOrgId] = useState(mockOrgs[0]?.id ?? "");
  const [owner, setOwner] = useState("");
  const [issuedAt, setIssuedAt] = useState(new Date().toISOString().slice(0, 10));
  const [expiresAt, setExpiresAt] = useState(() => {
    const d = new Date(); d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [autoRenew, setAutoRenew] = useState(true);
  const [licenseKey, setLicenseKey] = useState(() => generateKey("Pro"));
  const [toast, setToast] = useState<string | null>(null);

  const org = useMemo(() => mockOrgs.find((o) => o.id === orgId), [orgId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner || !org) return;
    setToast(`License ${licenseKey} issued to ${org.name}`);
    setTimeout(() => nav("/licenses/list"), 700);
  };

  return (
    <Box component="form" onSubmit={submit}>
      <Button startIcon={<ArrowLeft size={14} />} onClick={() => nav("/licenses/list")} size="small" sx={{ mb: 1 }}>Back</Button>
      <PageHeader
        title="Issue license"
        subtitle="Generate a new license key and assign it to an organization"
        actions={<Button type="submit" variant="contained" startIcon={<Save size={16} />}>Issue license</Button>}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Product & seats">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Product" value={product} onChange={(e) => setProduct(e.target.value)}>
                  {PRODUCTS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Tier" value={tier} onChange={(e) => { setTier(e.target.value); setLicenseKey(generateKey(e.target.value)); }}>
                  {TIERS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" label="Seats" value={seats} onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))} inputProps={{ min: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Organization" value={orgId} onChange={(e) => setOrgId(e.target.value)}>
                  {mockOrgs.slice(0, 12).map((o) => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth required type="email" label="Owner email" value={owner} onChange={(e) => setOwner(e.target.value)} />
              </Grid>
            </Grid>
          </SectionCard>

          <Box mt={2}>
            <SectionCard title="Validity">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Issued" InputLabelProps={{ shrink: true }} value={issuedAt} onChange={(e) => setIssuedAt(e.target.value)} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Expires" InputLabelProps={{ shrink: true }} value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} /></Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Switch checked={autoRenew} onChange={(e) => setAutoRenew(e.target.checked)} />} label="Auto-renew on expiration" />
                </Grid>
              </Grid>
            </SectionCard>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <SectionCard title="License key">
            <Stack spacing={1.5}>
              <Typography sx={{ fontFamily: "monospace", fontSize: 16, p: 1.5, bgcolor: "action.hover", borderRadius: 1 }}>{licenseKey}</Typography>
              <Button startIcon={<Sparkles size={14} />} size="small" onClick={() => setLicenseKey(generateKey(tier))}>Regenerate</Button>
              <Divider />
              <Typography variant="caption" color="text.secondary">Summary</Typography>
              <Stack direction="row" justifyContent="space-between"><Typography variant="body2">Product</Typography><Typography variant="body2" fontWeight={700}>{product}</Typography></Stack>
              <Stack direction="row" justifyContent="space-between"><Typography variant="body2">Tier</Typography><Typography variant="body2" fontWeight={700}>{tier}</Typography></Stack>
              <Stack direction="row" justifyContent="space-between"><Typography variant="body2">Seats</Typography><Typography variant="body2" fontWeight={700}>{seats}</Typography></Stack>
              <Stack direction="row" justifyContent="space-between"><Typography variant="body2">Org</Typography><Typography variant="body2" fontWeight={700}>{org?.name ?? "—"}</Typography></Stack>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" variant="filled">{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
