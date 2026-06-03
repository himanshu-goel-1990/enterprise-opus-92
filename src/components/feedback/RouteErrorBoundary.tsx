import { useRouteError, Link } from "react-router-dom";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { AlertTriangle } from "lucide-react";

export function RouteErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 4 }}>
      <Paper sx={{ p: 6, maxWidth: 480, textAlign: "center", border: "1px solid", borderColor: "divider" }}>
        <Stack spacing={2} alignItems="center">
          <Box sx={{ p: 2, borderRadius: 999, bgcolor: "error.main", color: "white" }}>
            <AlertTriangle size={28} />
          </Box>
          <Typography variant="h4">Something went wrong</Typography>
          <Typography color="text.secondary">
            {error?.message || "An unexpected error occurred. Try refreshing the page."}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => window.location.reload()}>Reload</Button>
            <Button variant="outlined" component={Link} to="/dashboard">Go home</Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
