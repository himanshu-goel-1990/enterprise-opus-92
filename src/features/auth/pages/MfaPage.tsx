import { Stack, Typography, Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MfaPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3">Two-factor verification</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Enter the 6-digit code from your authenticator app.
        </Typography>
      </Box>
      <TextField
        label="Verification code"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        size="medium"
        inputProps={{ inputMode: "numeric", style: { letterSpacing: "0.5em", fontFamily: "monospace", fontSize: 22, textAlign: "center" } }}
      />
      <Button variant="contained" size="large" onClick={() => navigate("/dashboard")}>Verify</Button>
      <Button size="small">Use a recovery code instead</Button>
    </Stack>
  );
}
