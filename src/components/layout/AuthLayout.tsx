import { Outlet, Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";

export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(1200px 600px at -10% -20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(900px 500px at 110% 110%, rgba(168,85,247,0.30), transparent 55%), linear-gradient(135deg, #0a0e1a 0%, #131a2e 100%)",
          color: "#e2e8f0",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} component={Link} to="/login">
          <Logo size={32} />
          <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em">
            Northstar
          </Typography>
        </Stack>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" sx={{ maxWidth: 480, mb: 2 }}>
            The control plane for modern SaaS teams.
          </Typography>
          <Typography sx={{ color: "rgba(226,232,240,0.7)", maxWidth: 480 }}>
            Manage organizations, permissions, billing, and platform operations from a single, beautifully consistent
            console. Trusted by 4,200+ enterprise teams.
          </Typography>
        </motion.div>

        <Stack direction="row" spacing={3} sx={{ color: "rgba(226,232,240,0.5)", fontSize: 13 }}>
          <span>SOC 2 Type II</span>
          <span>ISO 27001</span>
          <span>GDPR · HIPAA · CCPA</span>
        </Stack>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, md: 6 } }}>
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
