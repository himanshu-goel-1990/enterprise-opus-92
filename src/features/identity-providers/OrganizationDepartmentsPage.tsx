import { Box, Grid, Card, Stack, Avatar, Typography, Button, IconButton } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, MoreHorizontal } from "lucide-react";

const deps = [
  { name: "Engineering", lead: "Sarah Chen", members: 142, color: "#3b82f6" },
  { name: "Design", lead: "Aisha Khan", members: 32, color: "#a855f7" },
  { name: "Sales", lead: "Marcus Wright", members: 42, color: "#10b981" },
  { name: "Marketing", lead: "Lin Park", members: 28, color: "#ec4899" },
  { name: "Operations", lead: "Hannah Reed", members: 36, color: "#f59e0b" },
  { name: "Finance", lead: "Daniel Garcia", members: 14, color: "#ef4444" },
];

export default function OrganizationDepartmentsPage() {
  return (
    <Box>
      <PageHeader title="Departments" subtitle="6 departments · 294 members" actions={<Button startIcon={<Plus size={16} />} variant="contained">Add department</Button>} />
      <Grid container spacing={2}>
        {deps.map((d) => (
          <Grid item xs={12} sm={6} md={4} key={d.name}>
            <Card sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Avatar sx={{ bgcolor: d.color }}>{d.name[0]}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={700}>{d.name}</Typography>
                  <Typography variant="caption" color="text.secondary">Lead · {d.lead}</Typography>
                </Box>
                <IconButton size="small"><MoreHorizontal size={16} /></IconButton>
              </Stack>
              <Typography variant="caption" color="text.secondary">Members</Typography>
              <Typography variant="h5" fontWeight={800}>{d.members}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
