import { Dialog, InputBase, Box, Stack, Typography, Divider } from "@mui/material";
import { Search, ArrowRight, LayoutDashboard, Users, Building2, ShieldCheck, CreditCard, Flag, Settings as SettingsIcon, KeyRound, FileClock, Crown, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, setCommandPaletteOpen, toggleTheme } from "@/app/store";
import { useMemo, useState } from "react";
import { type LucideIcon } from "lucide-react";

interface Cmd {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  action: () => void;
  keywords?: string;
}

export function CommandPalette() {
  const open = useAppSelector((s) => s.ui.commandPaletteOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const close = () => {
    dispatch(setCommandPaletteOpen(false));
    setQ("");
  };

  const go = (path: string) => () => { navigate(path); close(); };

  const commands: Cmd[] = useMemo(() => [
    { id: "go-dash", label: "Go to Dashboard", group: "Navigate", icon: LayoutDashboard, action: go("/dashboard") },
    { id: "go-org", label: "Organizations", group: "Navigate", icon: Building2, action: go("/organizations") },
    { id: "go-users", label: "Users", group: "Navigate", icon: Users, action: go("/users") },
    { id: "go-roles", label: "Roles & Permissions", group: "Navigate", icon: ShieldCheck, action: go("/rbac/roles") },
    { id: "go-billing", label: "Billing", group: "Navigate", icon: CreditCard, action: go("/billing/overview") },
    { id: "go-flags", label: "Feature Flags", group: "Navigate", icon: Flag, action: go("/feature-flags") },
    { id: "go-audit", label: "Audit Logs", group: "Navigate", icon: FileClock, action: go("/audit-logs") },
    { id: "go-notif", label: "Notifications", group: "Navigate", icon: Bell, action: go("/notifications") },
    { id: "go-settings", label: "Settings", group: "Navigate", icon: SettingsIcon, action: go("/settings/general") },
    { id: "go-api", label: "API Keys", group: "Navigate", icon: KeyRound, action: go("/api/keys") },
    { id: "go-super", label: "Super Admin", group: "Navigate", icon: Crown, action: go("/super-admin/tenants") },
    { id: "act-invite", label: "Invite user", group: "Actions", icon: Users, action: go("/users") },
    { id: "act-role", label: "Create role", group: "Actions", icon: ShieldCheck, action: go("/rbac/roles") },
    { id: "act-theme", label: "Toggle theme", group: "Actions", icon: SettingsIcon, action: () => { dispatch(toggleTheme()); close(); } },
  ], [dispatch, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(query) || c.group.toLowerCase().includes(query));
  }, [q, commands]);

  const grouped = filtered.reduce<Record<string, Cmd[]>>((acc, c) => {
    (acc[c.group] ||= []).push(c);
    return acc;
  }, {});

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          mt: 8,
          alignSelf: "flex-start",
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2, py: 1.5 }}>
        <Search size={18} color="rgb(148,163,184)" />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Search pages, actions, people…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ fontSize: 15 }}
        />
        <Box sx={{ fontSize: 10, px: 0.75, borderRadius: 1, border: "1px solid", borderColor: "divider", color: "text.secondary", fontFamily: "monospace" }}>ESC</Box>
      </Stack>
      <Divider />
      <Box sx={{ maxHeight: 420, overflowY: "auto", py: 1 }}>
        {Object.entries(grouped).map(([group, items]) => (
          <Box key={group} sx={{ mb: 1 }}>
            <Typography variant="overline" sx={{ px: 2, color: "text.secondary" }}>{group}</Typography>
            {items.map((c) => {
              const Icon = c.icon;
              return (
                <Stack
                  key={c.id}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  onClick={c.action}
                  sx={{ px: 2, py: 1, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
                >
                  <Icon size={16} />
                  <Box sx={{ flex: 1, fontSize: 14 }}>{c.label}</Box>
                  <ArrowRight size={14} style={{ opacity: 0.4 }} />
                </Stack>
              );
            })}
          </Box>
        ))}
        {filtered.length === 0 && (
          <Typography sx={{ p: 4, textAlign: "center" }} color="text.secondary">No matches</Typography>
        )}
      </Box>
    </Dialog>
  );
}
