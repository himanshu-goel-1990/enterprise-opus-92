import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";
import { useAppDispatch, useAppSelector, setCommandPaletteOpen } from "@/app/store";

const SIDEBAR_W = 256;
const SIDEBAR_W_COLLAPSED = 72;

export function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(setCommandPaletteOpen(true));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  const width = isMobile ? 0 : collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        isMobile={isMobile}
        collapsed={!isMobile && collapsed}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, ml: { xs: 0, md: `${width}px` }, transition: "margin-left .25s ease" }}>
        <Topbar onOpenMobileNav={() => setMobileOpen(true)} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
      <CommandPalette />
    </Box>
  );
}
