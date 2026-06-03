import { Box, Grid, Card, Stack, Typography, Button, Chip } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, CreditCard } from "lucide-react";

const methods = [
  { brand: "VISA", last4: "4242", exp: "12/27", primary: true },
  { brand: "Mastercard", last4: "8843", exp: "06/26", primary: false },
];

export default function PaymentMethodsPage() {
  return (
    <Box>
      <PageHeader title="Payment methods" subtitle="Cards and bank accounts on file" actions={<Button startIcon={<Plus size={16} />} variant="contained">Add payment method</Button>} />
      <Grid container spacing={2}>
        {methods.map((m) => (
          <Grid item xs={12} md={6} key={m.last4}>
            <Card sx={{ p: 3, background: m.primary ? "linear-gradient(135deg,#0a0e1a,#1e293b)" : undefined, color: m.primary ? "white" : undefined }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <CreditCard size={24} />
                <Stack direction="row" spacing={1}>
                  {m.primary && <Chip size="small" label="Primary" color="primary" />}
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>{m.brand}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h5" sx={{ fontFamily: "monospace", letterSpacing: 2, mb: 1 }}>•••• •••• •••• {m.last4}</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">Exp {m.exp}</Typography>
                <Stack direction="row" spacing={1}>
                  {!m.primary && <Button size="small" sx={{ color: m.primary ? "white" : undefined }}>Make primary</Button>}
                  <Button size="small" color="error">Remove</Button>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
