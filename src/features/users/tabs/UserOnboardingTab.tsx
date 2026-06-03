import { Stack, Card, Typography, LinearProgress, Box } from "@mui/material";
import { Check } from "lucide-react";

const steps = [
  { t: "Verify email", done: true },
  { t: "Complete profile", done: true },
  { t: "Join a team", done: true },
  { t: "Enable two-factor auth", done: true },
  { t: "Invite a teammate", done: false },
  { t: "Create your first project", done: false },
];

export default function UserOnboardingTab() {
  const done = steps.filter((s) => s.done).length;
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5">Onboarding · {Math.round((done / steps.length) * 100)}% complete</Typography>
      <LinearProgress variant="determinate" value={(done / steps.length) * 100} sx={{ my: 2, height: 6, borderRadius: 999 }} />
      <Stack spacing={1.5}>
        {steps.map((s) => (
          <Stack key={s.t} direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 22, height: 22, borderRadius: 999, display: "grid", placeItems: "center", bgcolor: s.done ? "success.main" : "action.hover", color: s.done ? "white" : "text.secondary" }}>
              {s.done && <Check size={14} />}
            </Box>
            <Typography sx={{ textDecoration: s.done ? "line-through" : "none", color: s.done ? "text.secondary" : "text.primary" }}>{s.t}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
