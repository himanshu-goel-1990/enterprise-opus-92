import { Stack, Typography, Card, Avatar, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector, setCurrentOrg } from "@/app/store";

export default function SelectOrganizationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orgs = useAppSelector((s) => s.org.available);
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3">Select an organization</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>You belong to {orgs.length} workspaces.</Typography>
      </Box>
      <Stack spacing={1.5}>
        {orgs.map((o) => (
          <Card key={o.id} sx={{ p: 2, cursor: "pointer", "&:hover": { borderColor: "primary.main" } }} onClick={() => { dispatch(setCurrentOrg(o.id)); navigate("/dashboard"); }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: o.logoColor, fontWeight: 700 }}>{o.name[0]}</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={700}>{o.name}</Typography>
                <Typography variant="caption" color="text.secondary">{o.slug}.northstar.app</Typography>
              </Box>
              <Chip size="small" label={o.plan} sx={{ textTransform: "capitalize" }} />
              <ChevronRight size={18} />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
