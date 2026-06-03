import { AppBar, Toolbar, IconButton, Stack, Box, Tooltip, Avatar, Menu, MenuItem, Divider, Typography, Badge } from "@mui/material";
import { Menu as MenuIcon, Search, Sun, Moon, Bell, LogOut, User as UserIcon, Settings as SettingsIcon, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { useAppDispatch, useAppSelector, toggleTheme, setCommandPaletteOpen, clearUser } from "@/app/store";
import { supabase } from "@/integrations/supabase/client";
import { NotificationsMenu } from "./NotificationsMenu";

export function Topbar({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mode = useAppSelector((s) => s.ui.themeMode);
  const user = useAppSelector((s) => s.auth.user);
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      className="glass-panel"
      sx={{
        bgcolor: (t) => (t.palette.mode === "dark" ? "rgba(10,14,26,0.7)" : "rgba(255,255,255,0.75)"),
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(14px)",
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 56, md: 60 } }}>
        <IconButton sx={{ display: { md: "none" } }} onClick={onOpenMobileNav}>
          <MenuIcon size={20} />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Breadcrumbs />
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          onClick={() => dispatch(setCommandPaletteOpen(true))}
          sx={{
            display: { xs: "none", sm: "flex" },
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            color: "text.secondary",
            cursor: "pointer",
            fontSize: 13,
            minWidth: 240,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Search size={14} />
          <Box sx={{ flex: 1 }}>Search or jump to…</Box>
          <Box
            sx={{
              fontSize: 10,
              px: 0.75,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            ⌘K
          </Box>
        </Stack>

        <Tooltip title="Help">
          <IconButton><HelpCircle size={18} /></IconButton>
        </Tooltip>

        <Tooltip title="Toggle theme">
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge color="error" variant="dot">
              <Bell size={18} />
            </Badge>
          </IconButton>
        </Tooltip>
        <NotificationsMenu anchorEl={notifAnchor} onClose={() => setNotifAnchor(null)} />

        <IconButton onClick={(e) => setUserMenu(e.currentTarget)}>
          <Avatar src={user?.avatarUrl} sx={{ width: 30, height: 30, bgcolor: "primary.main", fontSize: 13 }}>
            {user?.fullName?.[0] ?? "U"}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={userMenu}
          open={Boolean(userMenu)}
          onClose={() => setUserMenu(null)}
          PaperProps={{ sx: { width: 240, border: "1px solid", borderColor: "divider", mt: 1 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="body2" fontWeight={600}>{user?.fullName}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { setUserMenu(null); navigate("/profile"); }}>
            <UserIcon size={16} style={{ marginRight: 10 }} /> Profile
          </MenuItem>
          <MenuItem onClick={() => { setUserMenu(null); navigate("/settings/general"); }}>
            <SettingsIcon size={16} style={{ marginRight: 10 }} /> Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <LogOut size={16} style={{ marginRight: 10 }} /> Sign out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
