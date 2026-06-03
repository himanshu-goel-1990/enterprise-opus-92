import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Logo } from "./Logo";
import { navGroups } from "@/config/nav";
import { useAppDispatch, useAppSelector, toggleSidebar } from "@/app/store";
import { OrgSwitcher } from "./OrgSwitcher";

const SIDEBAR_W = 256;
const SIDEBAR_W_COLLAPSED = 72;

export function Sidebar({
  mobileOpen,
  onMobileClose,
  isMobile,
  collapsed,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
  isMobile: boolean;
  collapsed: boolean;
}) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((s) => s.auth.user);
  const role = user?.role ?? "member";

  const width = collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W;

  const visibleGroups = navGroups.filter((g) => (g.requiresPlatformAdmin ? role === "platform_admin" : true));

  const content = (
    <Box
      sx={{
        height: "100%",
        width: isMobile ? SIDEBAR_W : width,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "width .25s ease",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={collapsed && !isMobile ? "center" : "space-between"}
        sx={{ px: 2, py: 1.75, minHeight: 60 }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25} component={Link} to="/dashboard" sx={{ color: "text.primary" }}>
          <Logo size={28} />
          {(!collapsed || isMobile) && (
            <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.02em">
              Northstar
            </Typography>
          )}
        </Stack>
        {!isMobile && (
          <IconButton size="small" onClick={() => dispatch(toggleSidebar())}>
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </IconButton>
        )}
      </Stack>

      <Box sx={{ px: collapsed && !isMobile ? 1 : 2, pb: 1 }}>
        <OrgSwitcher collapsed={collapsed && !isMobile} />
      </Box>

      <Divider sx={{ mx: collapsed && !isMobile ? 1 : 2 }} />

      <Box sx={{ flex: 1, overflowY: "auto", py: 1.5 }}>
        {visibleGroups.map((group) => (
          <Box key={group.label} sx={{ px: collapsed && !isMobile ? 1 : 2, mb: 2 }}>
            {(!collapsed || isMobile) && (
              <Typography variant="overline" sx={{ color: "text.secondary", px: 1, fontSize: 10 }}>
                {group.label}
              </Typography>
            )}
            <Stack spacing={0.25} sx={{ mt: 0.5 }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname.startsWith(item.to.split("/").slice(0, 2).join("/"));
                const button = (
                  <Stack
                    component={Link}
                    to={item.to}
                    onClick={isMobile ? onMobileClose : undefined}
                    direction="row"
                    alignItems="center"
                    spacing={1.25}
                    sx={{
                      px: 1.25,
                      py: 0.85,
                      borderRadius: 1.5,
                      color: active ? "primary.main" : "text.secondary",
                      bgcolor: active ? (t) => (t.palette.mode === "dark" ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)") : "transparent",
                      fontWeight: active ? 600 : 500,
                      fontSize: 14,
                      transition: "background-color .15s ease, color .15s ease",
                      "&:hover": {
                        bgcolor: (t) => (t.palette.mode === "dark" ? "rgba(148,163,184,0.08)" : "rgba(15,23,42,0.04)"),
                        color: "text.primary",
                      },
                      justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                    }}
                  >
                    <Icon size={18} />
                    {(!collapsed || isMobile) && (
                      <>
                        <Box sx={{ flex: 1 }}>{item.label}</Box>
                        {item.badge && (
                          <Box
                            sx={{
                              fontSize: 10,
                              fontWeight: 700,
                              px: 0.75,
                              py: 0.15,
                              borderRadius: 999,
                              bgcolor: "secondary.main",
                              color: "secondary.contrastText",
                            }}
                          >
                            {item.badge}
                          </Box>
                        )}
                      </>
                    )}
                  </Stack>
                );
                return collapsed && !isMobile ? (
                  <Tooltip key={item.to} title={item.label} placement="right">
                    {button}
                  </Tooltip>
                ) : (
                  <Box key={item.to}>{button}</Box>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Box>

      <Divider />
      <Stack
        direction="row"
        component={Link}
        to="/profile"
        spacing={1.25}
        alignItems="center"
        sx={{ p: 1.5, color: "text.primary", "&:hover": { bgcolor: "action.hover" } }}
      >
        <Avatar src={user?.avatarUrl} sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 14 }}>
          {user?.fullName?.[0] ?? "U"}
        </Avatar>
        {(!collapsed || isMobile) && (
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.fullName ?? "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
              {user?.email ?? ""}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer open={mobileOpen} onClose={onMobileClose} PaperProps={{ sx: { width: SIDEBAR_W, border: 0 } }}>
        {content}
      </Drawer>
    );
  }
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width,
        zIndex: (t) => t.zIndex.appBar - 1,
        transition: "width .25s ease",
      }}
    >
      {content}
    </Box>
  );
}
