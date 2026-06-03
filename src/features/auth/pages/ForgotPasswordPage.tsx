import { Stack, Typography, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return setErr(error.message);
    setSent(true);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ mb: 1 }}>Reset your password</Typography>
        <Typography color="text.secondary">We&apos;ll send you a secure reset link.</Typography>
      </Box>
      {sent ? (
        <Alert severity="success">If an account exists for {email}, a reset link is on its way.</Alert>
      ) : (
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            {err && <Alert severity="error">{err}</Alert>}
            <TextField label="Work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required size="medium" />
            <Button variant="contained" type="submit" size="large">Send reset link</Button>
          </Stack>
        </form>
      )}
      <Typography variant="body2" align="center">
        <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 600 }}>← Back to sign in</Box>
      </Typography>
    </Stack>
  );
}
