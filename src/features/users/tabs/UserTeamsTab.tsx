import { Stack, Card, Typography, Chip } from "@mui/material";

const teams = ["Platform Engineering","Design Systems","Security","Growth"];

export default function UserTeamsTab() {
  return (
    <Stack spacing={1.5}>
      {teams.map((t) => (
        <Card key={t} sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack>
              <Typography fontWeight={700}>{t}</Typography>
              <Typography variant="caption" color="text.secondary">12 members · 4 active projects</Typography>
            </Stack>
            <Chip size="small" label="Member" />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
