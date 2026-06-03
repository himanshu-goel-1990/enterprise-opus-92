import { Box, Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const TABS = [
  { v: "general", l: "General" },
  { v: "branding", l: "Branding" },
  { v: "email", l: "Email" },
  { v: "security", l: "Security" },
  { v: "api", l: "API" },
  { v: "webhooks", l: "Webhooks" },
  { v: "domains", l: "Domains" },
  { v: "smtp", l: "SMTP" },
  { v: "sso", l: "SSO" },
  { v: "mfa", l: "MFA" },
];

export function SettingsTabs({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const { pathname } = useLocation();
  const active = TABS.find((t) => pathname.endsWith(t.v))?.v ?? "general";
  return (
    <Box>
      <PageHeader title="Settings" subtitle={subtitle ?? "Configure your workspace"} />
      <Tabs value={active} variant="scrollable" sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        {TABS.map((t) => <Tab key={t.v} value={t.v} label={t.l} component={Link} to={`/settings/${t.v}`} />)}
      </Tabs>
      <Box>
        <Box sx={{ mb: 2 }}><strong>{title}</strong></Box>
        {children}
      </Box>
    </Box>
  );
}
