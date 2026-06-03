import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

const sharedComponents: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: { fontFamily: tokens.font.sans },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true, size: "medium" },
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 600,
        borderRadius: tokens.radius.md,
        letterSpacing: "-0.005em",
      },
      sizeSmall: { padding: "4px 10px", fontSize: 13 },
      sizeMedium: { padding: "6px 14px", fontSize: 14 },
      sizeLarge: { padding: "10px 18px", fontSize: 15 },
    },
  },
  MuiIconButton: { styleOverrides: { root: { borderRadius: tokens.radius.sm } } },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: { backgroundImage: "none", borderRadius: tokens.radius.lg },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: { borderRadius: tokens.radius.lg, border: "1px solid", borderColor: "var(--mui-border)" },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { fontWeight: 500, borderRadius: 999, height: 22 },
      label: { paddingLeft: 8, paddingRight: 8, fontSize: 12 },
    },
  },
  MuiTextField: { defaultProps: { size: "small", variant: "outlined" } },
  MuiOutlinedInput: { styleOverrides: { root: { borderRadius: tokens.radius.md } } },
  MuiSelect: { defaultProps: { size: "small" } },
  MuiTooltip: {
    styleOverrides: {
      tooltip: { fontSize: 12, fontWeight: 500, padding: "6px 10px", borderRadius: 6 },
    },
  },
  MuiTableCell: { styleOverrides: { root: { borderColor: "var(--mui-border)" } } },
  MuiDivider: { styleOverrides: { root: { borderColor: "var(--mui-border)" } } },
  MuiTab: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, minHeight: 40 } } },
  MuiAppBar: { defaultProps: { elevation: 0, color: "transparent" } },
  MuiDrawer: { styleOverrides: { paper: { backgroundImage: "none" } } },
};

const typography: ThemeOptions["typography"] = {
  fontFamily: tokens.font.sans,
  fontSize: 14,
  h1: { fontWeight: 800, letterSpacing: "-0.03em", fontSize: "2.25rem" },
  h2: { fontWeight: 800, letterSpacing: "-0.025em", fontSize: "1.875rem" },
  h3: { fontWeight: 700, letterSpacing: "-0.02em", fontSize: "1.5rem" },
  h4: { fontWeight: 700, letterSpacing: "-0.015em", fontSize: "1.25rem" },
  h5: { fontWeight: 700, letterSpacing: "-0.01em", fontSize: "1.05rem" },
  h6: { fontWeight: 600, letterSpacing: "-0.005em", fontSize: ".95rem" },
  subtitle1: { fontWeight: 600, fontSize: ".95rem" },
  subtitle2: { fontWeight: 600, fontSize: ".825rem" },
  body1: { fontSize: ".925rem" },
  body2: { fontSize: ".825rem" },
  button: { fontWeight: 600, letterSpacing: "-0.005em" },
  caption: { fontSize: ".75rem" },
  overline: { fontWeight: 600, letterSpacing: "0.08em" },
};

export const lightTheme = createTheme({
  cssVariables: { cssVarPrefix: "mui" },
  palette: {
    mode: "light",
    primary: { main: tokens.brand[600], light: tokens.brand[400], dark: tokens.brand[800], contrastText: "#fff" },
    secondary: { main: tokens.accent[600], contrastText: "#fff" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
    divider: "#e2e8f0",
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    info: { main: "#3b82f6" },
  },
  shape: { borderRadius: tokens.radius.md },
  typography,
  components: {
    ...sharedComponents,
    MuiCssBaseline: {
      styleOverrides: {
        ":root": { "--mui-border": "#e2e8f0", "--mui-surface-2": "#f1f5f9" },
        body: { backgroundColor: "#f8fafc" },
      },
    },
  },
});

export const darkTheme = createTheme({
  cssVariables: { cssVarPrefix: "mui" },
  palette: {
    mode: "dark",
    primary: { main: tokens.brand[400], light: tokens.brand[300], dark: tokens.brand[600], contrastText: "#0b0f1a" },
    secondary: { main: tokens.accent[500], contrastText: "#0b0f1a" },
    background: { default: "#0a0e1a", paper: "#0f1525" },
    text: { primary: "#e2e8f0", secondary: "#94a3b8" },
    divider: "rgba(148,163,184,0.14)",
    success: { main: "#34d399" },
    warning: { main: "#fbbf24" },
    error: { main: "#f87171" },
    info: { main: "#60a5fa" },
  },
  shape: { borderRadius: tokens.radius.md },
  typography,
  components: {
    ...sharedComponents,
    MuiCssBaseline: {
      styleOverrides: {
        ":root": { "--mui-border": "rgba(148,163,184,0.14)", "--mui-surface-2": "#131a2e" },
        body: { backgroundColor: "#0a0e1a" },
      },
    },
  },
});
