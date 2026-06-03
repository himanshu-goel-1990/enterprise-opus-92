import { Card, CardHeader, CardContent, Typography, Stack } from "@mui/material";

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  padded = true,
}: {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      {(title || action) && (
        <CardHeader
          sx={{ px: 2.5, py: 2, "& .MuiCardHeader-action": { m: 0, alignSelf: "center" } }}
          title={title && <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>}
          subheader={subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
          action={action && <Stack direction="row" spacing={1}>{action}</Stack>}
        />
      )}
      <CardContent sx={{ p: padded ? 2.5 : 0, pt: title ? 0 : padded ? 2.5 : 0, "&:last-child": { pb: padded ? 2.5 : 0 } }}>
        {children}
      </CardContent>
    </Card>
  );
}
