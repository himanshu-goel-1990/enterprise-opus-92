import { Menu, Box, Typography, Stack, Avatar, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { mockNotifications } from "@/mocks/notifications";
import { formatDistanceToNow } from "@/lib/date";

export function NotificationsMenu({ anchorEl, onClose }: { anchorEl: HTMLElement | null; onClose: () => void }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{ sx: { width: 380, border: "1px solid", borderColor: "divider", mt: 1 } }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={700}>Notifications</Typography>
        <Button size="small" component={Link} to="/notifications" onClick={onClose}>View all</Button>
      </Stack>
      <Divider />
      <Box sx={{ maxHeight: 420, overflowY: "auto" }}>
        {mockNotifications.slice(0, 6).map((n) => (
          <Stack
            key={n.id}
            direction="row"
            spacing={1.5}
            sx={{ p: 1.5, "&:hover": { bgcolor: "action.hover" }, cursor: "pointer" }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: n.color, fontSize: 13 }}>{n.icon}</Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>{n.title}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{n.body}</Typography>
              <Typography variant="caption" color="text.secondary">{formatDistanceToNow(n.at)}</Typography>
            </Box>
            {!n.read && <Box sx={{ width: 8, height: 8, borderRadius: 999, bgcolor: "primary.main", mt: 1 }} />}
          </Stack>
        ))}
      </Box>
    </Menu>
  );
}
