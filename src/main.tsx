import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { AppThemeProvider } from "@/app/providers/ThemeProvider";
import { AbilityProvider } from "@/app/providers/AbilityProvider";
import { AuthBootstrapper } from "@/app/providers/AuthBootstrapper";
import { store } from "@/app/store";
import { router } from "@/app/router";
import { queryClient } from "@/lib/queryClient";
import "@/styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{
              "html, body, #root": { height: "100%" },
              body: { fontFeatureSettings: '"cv11","ss01","ss03"' },
              "::selection": { background: "rgba(99,102,241,0.25)" },
            }}
          />
          <SnackbarProvider
            maxSnack={4}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={3500}
          >
            <AuthBootstrapper>
              <AbilityProvider>
                <RouterProvider router={router} />
              </AbilityProvider>
            </AuthBootstrapper>
          </SnackbarProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
