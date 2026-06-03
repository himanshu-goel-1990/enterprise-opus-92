import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: 92, fontWeight: 800 }} className="gradient-text">403</Typography>
      <Typography variant="h4">Access denied</Typography>
      <Typography color="text.secondary">You don&apos;t have permission to view this page.</Typography>
      <Button variant="contained" component={Link} to="/dashboard">Back to dashboard</Button>
    </Stack>
  );
}
