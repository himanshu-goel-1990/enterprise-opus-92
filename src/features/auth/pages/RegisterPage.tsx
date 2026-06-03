import { Stack, Typography, Button, TextField, Box, Stepper, Step, StepLabel, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const steps = ["Account", "Organization", "Invite teammates"];

export default function RegisterPage() {
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [invites, setInvites] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const next = () => setActive((s) => Math.min(steps.length - 1, s + 1));
  const back = () => setActive((s) => Math.max(0, s - 1));

  const finish = async () => {
    setErr(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, org_name: orgName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) return setErr(error.message);
    navigate("/dashboard");
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ mb: 1 }}>Create your workspace</Typography>
        <Typography color="text.secondary">14-day free trial of the Business plan. No credit card required.</Typography>
      </Box>

      <Stepper activeStep={active} alternativeLabel>
        {steps.map((s) => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
      </Stepper>

      {err && <Alert severity="error">{err}</Alert>}

      {active === 0 && (
        <Stack spacing={2}>
          <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} size="medium" />
          <TextField label="Work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} size="medium" />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="medium" helperText="At least 8 characters" />
        </Stack>
      )}
      {active === 1 && (
        <Stack spacing={2}>
          <TextField label="Organization name" value={orgName} onChange={(e) => setOrgName(e.target.value)} size="medium" />
          <TextField label="Workspace URL" value={orgName.toLowerCase().replace(/\s+/g, "-")} InputProps={{ startAdornment: <Typography color="text.secondary">northstar.app/</Typography> }} size="medium" disabled />
        </Stack>
      )}
      {active === 2 && (
        <Stack spacing={2}>
          <TextField label="Invite teammates (comma-separated emails)" value={invites} onChange={(e) => setInvites(e.target.value)} multiline rows={3} />
          <Typography variant="caption" color="text.secondary">You can do this later from Users → Invite.</Typography>
        </Stack>
      )}

      <Stack direction="row" justifyContent="space-between">
        <Button onClick={back} disabled={active === 0}>Back</Button>
        {active < steps.length - 1 ? (
          <Button variant="contained" onClick={next}>Continue</Button>
        ) : (
          <Button variant="contained" onClick={finish}>Create workspace</Button>
        )}
      </Stack>

      <Typography variant="body2" align="center" color="text.secondary">
        Already have an account?{" "}
        <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 600 }}>Sign in</Box>
      </Typography>
    </Stack>
  );
}
