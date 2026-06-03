import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function SsoPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3">Enterprise SSO</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Enter your work email to find your identity provider.
        </Typography>
      </Box>
      <TextField label="Work email" type="email" size="medium" />
      <Button variant="contained" size="large">Continue with SSO</Button>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ color: "text.secondary", fontSize: 13 }}>
        <span>Supports:</span><strong>Okta</strong><span>·</span><strong>Auth0</strong><span>·</span><strong>Azure AD</strong><span>·</span><strong>OneLogin</strong><span>·</span><strong>SAML 2.0</strong>
      </Stack>
      <Typography variant="body2" align="center">
        <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 600 }}>← Back to sign in</Box>
      </Typography>
    </Stack>
  );
}
