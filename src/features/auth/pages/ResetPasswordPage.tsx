import { Stack, Typography, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setErr("Passwords do not match");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setErr(error.message);
    navigate("/login");
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Set a new password</Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {err && <Alert severity="error">{err}</Alert>}
          <TextField label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required size="medium" />
          <TextField label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required size="medium" />
          <Button variant="contained" type="submit" size="large">Update password</Button>
        </Stack>
      </form>
    </Stack>
  );
}
