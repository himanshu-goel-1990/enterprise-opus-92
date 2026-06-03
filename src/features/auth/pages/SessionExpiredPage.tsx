import { Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function SessionExpiredPage() {
  return (
    <Stack spacing={3} textAlign="center" alignItems="center">
      <Box sx={{ p: 2, borderRadius: 999, bgcolor: "warning.main", color: "white", fontSize: 28 }}>⏱</Box>
      <Typography variant="h3">Your session has expired</Typography>
      <Typography color="text.secondary">For your security, please sign in again to continue.</Typography>
      <Button variant="contained" size="large" component={Link} to="/login">Sign in again</Button>
    </Stack>
  );
}
