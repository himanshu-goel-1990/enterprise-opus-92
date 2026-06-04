import { useEffect, useState } from "react";
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
  Collapse,
  Popover,
} from "@mui/material";
import { ChevronsLeft, ChevronsRight, ChevronDown, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";
import { navGroups, type NavItem } from "@/config/nav";
import { useAppDispatch, useAppSelector, toggleSidebar } from "@/app/store";
import { OrgSwitcher } from "./OrgSwitcher";

const SIDEBAR_W = 264;
const SIDEBAR_W_COLLAPSED = 76;

function isPathActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(to + "/");
}

function itemHasActiveChild(item: NavItem, pathname: string): boolean {
  if (!item.children) return false;
  return item.children.some((c) => isPathActive(pathname, c.to));
}

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
  const isCollapsed = collapsed && !isMobile;

  const visibleGroups = navGroups.filter((g) =>
    g.requiresPlatformAdmin ? role === "platform_admin" : true,
  );

  // Track open submenus
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  // Auto-open the menu whose child matches current path
  useEffect(() => {
    const next: Record<string, boolean> = { ...openMap };
    visibleGroups.forEach((g) =>
      g.items.forEach((it) => {
        if (it.children && itemHasActiveChild(it, location.pathname)) {
          next[it.to] = true;
        }
      }),
    );
    setOpenMap(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleOpen = (key: string) =>
    setOpenMap((m) => ({ ...m, [key]: !m[key] }));

  // Popover for collapsed mode flyout
  const [flyout, setFlyout] = useState<{ el: HTMLElement; item: NavItem } | null>(
    null,
  );

  const renderLeaf = (item: NavItem, depth = 0, onClick?: () => void) => {
    const Icon = item.icon;
    const active = isPathActive(location.pathname, item.to);
    return (
      <Stack
        component={Link}
        to={item.to}
        onClick={onClick}
        key={item.to}
        direction="row"
        alignItems="center"
        spacing={1.25}
        sx={{
          textDecoration: "none",
          pl: depth === 0 ? 1.25 : 4.25,
          pr: 1.25,
          py: 0.8,
          borderRadius: 1.5,
          position: "relative",
          color: active ? "primary.main" : "text.secondary",
          bgcolor: active
            ? (t) =>
                t.palette.mode === "dark"
                  ? "rgba(99,102,241,0.14)"
                  : "rgba(99,102,241,0.09)"
            : "transparent",
          fontWeight: active ? 600 : 500,
          fontSize: 13.5,
          transition: "background-color .15s ease, color .15s ease, transform .15s ease",
          "&:hover": {
            bgcolor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(148,163,184,0.08)"
                : "rgba(15,23,42,0.04)",
            color: "text.primary",
            transform: "translateX(2px)",
          },
          "&::before":
            depth > 0
              ? {
                  content: '""',
                  position: "absolute",
                  left: 24,
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  bgcolor: active ? "primary.main" : "divider",
                  borderRadius: 2,
                }
              : undefined,
        }}
      >
        <Icon size={depth === 0 ? 18 : 15} />
        <Box sx={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.label}
        </Box>
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
      </Stack>
    );
  };

  const renderParent = (item: NavItem) => {
    const Icon = item.icon;
    const hasChildren = !!item.children?.length;
    const active = isPathActive(location.pathname, item.to) || itemHasActiveChild(item, location.pathname);
    const open = !!openMap[item.to];

    if (isCollapsed) {
      // Collapsed mode: icon button with flyout popover for children
      return (
        <Tooltip key={item.to} title={hasChildren ? "" : item.label} placement="right">
          <Stack
            component={hasChildren ? "div" : Link}
            to={hasChildren ? undefined : (item.to as any)}
            onMouseEnter={(e: React.MouseEvent<HTMLElement>) =>
              hasChildren ? setFlyout({ el: e.currentTarget, item }) : undefined
            }
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              if (hasChildren) {
                setFlyout({ el: e.currentTarget, item });
              }
            }}
            alignItems="center"
            justifyContent="center"
            sx={{
              cursor: "pointer",
              width: 44,
              height: 44,
              mx: "auto",
              borderRadius: 2,
              color: active ? "primary.main" : "text.secondary",
              bgcolor: active
                ? (t) =>
                    t.palette.mode === "dark"
                      ? "rgba(99,102,241,0.14)"
                      : "rgba(99,102,241,0.09)"
                : "transparent",
              "&:hover": {
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(148,163,184,0.08)"
                    : "rgba(15,23,42,0.04)",
                color: "text.primary",
              },
            }}
          >
            <Icon size={18} />
          </Stack>
        </Tooltip>
      );
    }

    return (
      <Box key={item.to}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          onClick={() => (hasChildren ? toggleOpen(item.to) : undefined)}
          component={hasChildren ? "div" : (Link as any)}
          to={hasChildren ? undefined : item.to}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            px: 1.25,
            py: 0.85,
            borderRadius: 1.5,
            color: active ? "primary.main" : "text.secondary",
            bgcolor:
              active && !hasChildren
                ? (t) =>
                    t.palette.mode === "dark"
                      ? "rgba(99,102,241,0.14)"
                      : "rgba(99,102,241,0.09)"
                : "transparent",
            fontWeight: active ? 600 : 500,
            fontSize: 14,
            transition: "background-color .15s ease, color .15s ease",
            "&:hover": {
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(148,163,184,0.08)"
                  : "rgba(15,23,42,0.04)",
              color: "text.primary",
            },
          }}
        >
          <Icon size={18} />
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
          {hasChildren && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transition: "transform .2s ease",
                transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                color: "text.disabled",
              }}
            >
              <ChevronDown size={15} />
            </Box>
          )}
        </Stack>
        {hasChildren && (
          <Collapse in={open} timeout={220} unmountOnExit>
            <Stack spacing={0.15} sx={{ mt: 0.25, mb: 0.5 }}>
              {item.children!.map((c) => renderLeaf(c, 1, isMobile ? onMobileClose : undefined))}
            </Stack>
          </Collapse>
        )}
      </Box>
    );
  };

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
        justifyContent={isCollapsed ? "center" : "space-between"}
        sx={{ px: 2, py: 1.75, minHeight: 60 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          component={Link}
          to="/dashboard"
          sx={{ color: "text.primary", textDecoration: "none" }}
        >
          <Logo size={28} />
          {!isCollapsed && (
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

      <Box sx={{ px: isCollapsed ? 1 : 2, pb: 1 }}>
        <OrgSwitcher collapsed={isCollapsed} />
      </Box>

      <Divider sx={{ mx: isCollapsed ? 1 : 2 }} />

      <Box sx={{ flex: 1, overflowY: "auto", py: 1.5 }}>
        {visibleGroups.map((group) => (
          <Box key={group.label} sx={{ px: isCollapsed ? 0.75 : 2, mb: 2 }}>
            {!isCollapsed && (
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", px: 1, fontSize: 10, letterSpacing: "0.08em" }}
              >
                {group.label}
              </Typography>
            )}
            <Stack spacing={0.25} sx={{ mt: 0.5 }}>
              {group.items.map((item) =>
                item.children ? renderParent(item) : isCollapsed ? renderParent(item) : renderLeaf(item, 0, isMobile ? onMobileClose : undefined),
              )}
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
        sx={{
          p: 1.5,
          color: "text.primary",
          textDecoration: "none",
          justifyContent: isCollapsed ? "center" : "flex-start",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Avatar
          src={user?.avatarUrl}
          sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 14 }}
        >
          {user?.fullName?.[0] ?? user?.name?.[0] ?? "U"}
        </Avatar>
        {!isCollapsed && (
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.fullName ?? user?.name ?? "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
              {user?.email ?? ""}
            </Typography>
          </Box>
        )}
      </Stack>

      {/* Flyout popover for collapsed mode */}
      <Popover
        open={!!flyout}
        anchorEl={flyout?.el}
        onClose={() => setFlyout(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            onMouseLeave: () => setFlyout(null),
            sx: {
              ml: 1,
              minWidth: 220,
              p: 1,
              borderRadius: 2,
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            },
          },
        }}
      >
        {flyout && (
          <Box>
            <Typography
              variant="overline"
              sx={{ px: 1, color: "text.secondary", fontSize: 10 }}
            >
              {flyout.item.label}
            </Typography>
            <Stack spacing={0.25} sx={{ mt: 0.5 }}>
              {flyout.item.children!.map((c) => {
                const Icon = c.icon;
                const active = isPathActive(location.pathname, c.to);
                return (
                  <Stack
                    key={c.to}
                    component={Link}
                    to={c.to}
                    onClick={() => setFlyout(null)}
                    direction="row"
                    alignItems="center"
                    spacing={1.25}
                    sx={{
                      textDecoration: "none",
                      px: 1.25,
                      py: 0.75,
                      borderRadius: 1.5,
                      color: active ? "primary.main" : "text.primary",
                      bgcolor: active
                        ? (t) =>
                            t.palette.mode === "dark"
                              ? "rgba(99,102,241,0.14)"
                              : "rgba(99,102,241,0.09)"
                        : "transparent",
                      fontSize: 13.5,
                      fontWeight: active ? 600 : 500,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Icon size={15} />
                    <Box sx={{ flex: 1 }}>{c.label}</Box>
                    <ChevronRight size={14} style={{ opacity: 0.4 }} />
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        )}
      </Popover>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        open={mobileOpen}
        onClose={onMobileClose}
        PaperProps={{ sx: { width: SIDEBAR_W, border: 0 } }}
      >
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
