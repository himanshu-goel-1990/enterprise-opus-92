import { Box, Grid, Card, Stack, Typography, Chip, Button } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Book, Terminal, Code2, ArrowUpRight } from "lucide-react";

const sdks = [
  { name: "JavaScript / TypeScript", install: "npm install @northstar/node", version: "v3.4.1" },
  { name: "Python", install: "pip install northstar-py", version: "v2.8.0" },
  { name: "Go", install: "go get github.com/northstar/go-sdk", version: "v1.12.3" },
  { name: "Ruby", install: "gem install northstar", version: "v1.4.6" },
];

export default function ApiDocsPage() {
  return (
    <Box>
      <PageHeader title="API documentation & SDKs" subtitle="Reference, guides, and official client libraries" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Book size={24} />
            <Typography variant="h6" sx={{ mt: 1 }}>API reference</Typography>
            <Typography variant="body2" color="text.secondary">REST endpoints, parameters, and example responses.</Typography>
            <Button sx={{ mt: 2 }} endIcon={<ArrowUpRight size={14} />}>Open reference</Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Code2 size={24} />
            <Typography variant="h6" sx={{ mt: 1 }}>Guides</Typography>
            <Typography variant="body2" color="text.secondary">Step-by-step tutorials for common integrations.</Typography>
            <Button sx={{ mt: 2 }} endIcon={<ArrowUpRight size={14} />}>Browse guides</Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Terminal size={24} />
            <Typography variant="h6" sx={{ mt: 1 }}>CLI</Typography>
            <Typography variant="body2" color="text.secondary">Manage your workspace from the command line.</Typography>
            <Button sx={{ mt: 2 }} endIcon={<ArrowUpRight size={14} />}>Install CLI</Button>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Official SDKs</Typography>
            <Stack spacing={1.5}>
              {sdks.map((s) => (
                <Stack key={s.name} direction="row" alignItems="center" spacing={2} sx={{ p: 1.5, border: 1, borderColor: "divider", borderRadius: 1.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600}>{s.name}</Typography>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary" }}>{s.install}</Typography>
                  </Box>
                  <Chip size="small" label={s.version} variant="outlined" />
                  <Button size="small">Docs</Button>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
