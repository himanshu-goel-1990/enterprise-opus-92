import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/theme";
import { useAppSelector } from "@/app/store";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((s) => s.ui.themeMode);

  const baseTheme = mode === "dark" ? darkTheme : lightTheme;

  const theme = createTheme(baseTheme, {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "2px 12px",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}