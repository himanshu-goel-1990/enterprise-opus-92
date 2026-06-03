import { Box, Stack, Typography, Button } from "@mui/material";
import { type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Stack alignItems="center" spacing={2} sx={{ p: 8, textAlign: "center" }}>
      <Box sx={{ p: 2, borderRadius: 999, bgcolor: "action.hover", color: "text.secondary" }}>
        <Icon size={32} />
      </Box>
      <Typography variant="h5">{title}</Typography>
      {description && <Typography color="text.secondary" sx={{ maxWidth: 420 }}>{description}</Typography>}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>{actionLabel}</Button>
      )}
    </Stack>
  );
}
