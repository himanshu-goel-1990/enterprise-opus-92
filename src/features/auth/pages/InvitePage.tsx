import { Stack, Typography, Avatar, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function InvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  return (
    <Stack spacing={3} alignItems="center" textAlign="center">
      <Avatar sx={{ width: 64, height: 64, bgcolor: "#6366f1", fontSize: 24, fontWeight: 700 }}>A</Avatar>
      <Box>
        <Typography variant="h3">Join Acme Corp</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          You&apos;ve been invited by <strong>Sarah Chen</strong> to collaborate as a Developer.
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" size="large" onClick={() => navigate("/dashboard")}>Accept invitation</Button>
        <Button variant="outlined" size="large">Decline</Button>
      </Stack>
      <Typography variant="caption" color="text.secondary">Token: {token}</Typography>
    </Stack>
  );
}
