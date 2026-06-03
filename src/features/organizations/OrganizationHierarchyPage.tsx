import { Box, Stack, Typography, Card, Avatar } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { ChevronDown, GripVertical } from "lucide-react";

interface Node {
  name: string;
  members?: number;
  color: string;
  children?: Node[];
}

const tree: Node = {
  name: "Acme Corp",
  members: 482,
  color: "#6366f1",
  children: [
    { name: "Engineering", members: 142, color: "#3b82f6", children: [
      { name: "Platform", members: 38, color: "#3b82f6" },
      { name: "Product", members: 56, color: "#3b82f6" },
      { name: "Infrastructure", members: 24, color: "#3b82f6" },
      { name: "Security", members: 14, color: "#3b82f6" },
    ]},
    { name: "Design", members: 32, color: "#a855f7", children: [
      { name: "Brand", members: 8, color: "#a855f7" },
      { name: "Product Design", members: 18, color: "#a855f7" },
    ]},
    { name: "Go-to-Market", members: 88, color: "#10b981", children: [
      { name: "Sales", members: 42, color: "#10b981" },
      { name: "Marketing", members: 28, color: "#10b981" },
      { name: "Customer Success", members: 18, color: "#10b981" },
    ]},
    { name: "Operations", members: 36, color: "#f59e0b" },
    { name: "Finance & Legal", members: 14, color: "#ef4444" },
  ],
};

function TreeNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  return (
    <Box sx={{ ml: depth ? 4 : 0 }}>
      <Card sx={{ p: 1.5, mb: 1, "&:hover": { borderColor: "primary.main" } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GripVertical size={14} style={{ opacity: 0.4, cursor: "grab" }} />
          {node.children?.length ? <ChevronDown size={14} /> : <Box sx={{ width: 14 }} />}
          <Avatar sx={{ width: 28, height: 28, bgcolor: node.color, fontSize: 12 }}>{node.name[0]}</Avatar>
          <Box sx={{ flex: 1 }}><Typography variant="body2" fontWeight={600}>{node.name}</Typography></Box>
          <Typography variant="caption" color="text.secondary">{node.members} members</Typography>
        </Stack>
      </Card>
      {node.children?.map((c) => <TreeNode key={c.name} node={c} depth={depth + 1} />)}
    </Box>
  );
}

export default function OrganizationHierarchyPage() {
  return (
    <Box>
      <PageHeader title="Hierarchy" subtitle="Drag to restructure departments, teams, and branches" />
      <TreeNode node={tree} />
    </Box>
  );
}
