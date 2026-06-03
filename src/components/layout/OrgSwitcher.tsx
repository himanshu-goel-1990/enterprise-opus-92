import { useState } from "react";
import { Avatar, Box, Menu, MenuItem, Stack, Typography, Chip, Divider } from "@mui/material";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAppDispatch, useAppSelector, setCurrentOrg } from "@/app/store";

export function OrgSwitcher({ collapsed }: { collapsed: boolean }) {
  const dispatch = useAppDispatch();
  const { current, available } = useAppSelector((s) => s.org);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  if (!current) return null;

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.25}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          p: 1,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          cursor: "pointer",
          "&:hover": { bgcolor: "action.hover" },
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <Avatar sx={{ width: 28, height: 28, bgcolor: current.logoColor, fontSize: 13, fontWeight: 700 }}>
          {current.name[0]}
        </Avatar>
        {!collapsed && (
          <>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {current.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                {current.plan} plan
              </Typography>
            </Box>
            <ChevronsUpDown size={14} />
          </>
        )}
      </Stack>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{ sx: { width: 280, mt: 1, border: "1px solid", borderColor: "divider" } }}
      >
        <Typography variant="overline" sx={{ px: 2, color: "text.secondary" }}>
          Organizations
        </Typography>
        {available.map((org) => (
          <MenuItem
            key={org.id}
            onClick={() => {
              dispatch(setCurrentOrg(org.id));
              setAnchor(null);
            }}
          >
            <Avatar sx={{ width: 24, height: 24, bgcolor: org.logoColor, fontSize: 11, mr: 1.5 }}>{org.name[0]}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>{org.name}</Typography>
              <Chip size="small" label={org.plan} sx={{ textTransform: "capitalize", height: 16, fontSize: 10 }} />
            </Box>
            {current.id === org.id && <Check size={16} />}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem sx={{ color: "primary.main", fontWeight: 600 }}>+ Create organization</MenuItem>
      </Menu>
    </>
  );
}
