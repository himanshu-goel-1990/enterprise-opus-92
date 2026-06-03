import { Stack, Card, Typography, Chip, Button } from "@mui/material";

const devices = [
  { name: "MacBook Pro 16\"", os: "macOS 15.1", ip: "73.142.88.21", at: "Active now", trusted: true },
  { name: "iPhone 15", os: "iOS 18.2", ip: "73.142.88.21", at: "2h ago", trusted: true },
  { name: "Chrome / Windows", os: "Windows 11", ip: "52.118.45.99", at: "3d ago", trusted: false },
];

export default function UserDevicesTab() {
  return (
    <Stack spacing={1.5}>
      {devices.map((d) => (
        <Card key={d.name} sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack sx={{ flex: 1 }}>
              <Typography fontWeight={700}>{d.name}</Typography>
              <Typography variant="caption" color="text.secondary">{d.os} · {d.ip} · {d.at}</Typography>
            </Stack>
            {d.trusted ? <Chip size="small" label="Trusted" color="success" /> : <Chip size="small" label="Unverified" color="warning" />}
            <Button size="small" color="error">Revoke</Button>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
