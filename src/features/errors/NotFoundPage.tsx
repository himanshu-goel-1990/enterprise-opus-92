import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: 92, fontWeight: 800 }} className="gradient-text">404</Typography>
      <Typography variant="h4">Page not found</Typography>
      <Typography color="text.secondary">The page you&apos;re looking for doesn&apos;t exist or has been moved.</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" component={Link} to="/dashboard">Go to dashboard</Button>
        <Button variant="outlined" onClick={() => history.back()}>Go back</Button>
      </Stack>
    </Stack>
  );
}
