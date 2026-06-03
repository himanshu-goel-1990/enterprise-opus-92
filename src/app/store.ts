import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

// --- UI Slice (theme, sidebar) ---
type ThemeMode = "light" | "dark";
interface UiState {
  themeMode: ThemeMode;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
}
const initialUi: UiState = {
  themeMode: (typeof window !== "undefined" && (localStorage.getItem("themeMode") as ThemeMode)) || "dark",
  sidebarCollapsed: false,
  commandPaletteOpen: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState: initialUi,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
      if (typeof window !== "undefined") localStorage.setItem("themeMode", action.payload);
    },
    toggleTheme(state) {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") localStorage.setItem("themeMode", state.themeMode);
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setCommandPaletteOpen(state, action: PayloadAction<boolean>) {
      state.commandPaletteOpen = action.payload;
    },
  },
});

// --- Auth Slice ---
interface AuthUser {
  id: string;
  email: string;
  name: string;
  //avatarUrl?: string;
  //role: "platform_admin" | "org_admin" | "member";
}
interface AuthState {
  user: AuthUser | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  initialized: boolean;
}
const initialAuth: AuthState = { user: null, status: "idle", initialized: false };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    initializeAuth(state) {
      state.initialized = true;
    },
    setAuthLoading(state) {
      state.status = "loading";
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    clearUser(state) {
      state.user = null;
      state.status = "unauthenticated";
    },
  },
});

// --- Org Slice ---
interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: "free" | "team" | "business" | "enterprise";
  logoColor: string;
}
interface OrgState {
  current: Organization | null;
  available: Organization[];
}
const seedOrgs: Organization[] = [
  { id: "org_1", name: "Acme Corp", slug: "acme", plan: "enterprise", logoColor: "#6366f1" },
  { id: "org_2", name: "Globex Industries", slug: "globex", plan: "business", logoColor: "#10b981" },
  { id: "org_3", name: "Initech", slug: "initech", plan: "team", logoColor: "#f59e0b" },
  { id: "org_4", name: "Umbrella Group", slug: "umbrella", plan: "enterprise", logoColor: "#ef4444" },
];
const initialOrg: OrgState = { current: seedOrgs[0], available: seedOrgs };
const orgSlice = createSlice({
  name: "org",
  initialState: initialOrg,
  reducers: {
    setCurrentOrg(state, action: PayloadAction<string>) {
      const found = state.available.find((o) => o.id === action.payload);
      if (found) state.current = found;
    },
  },
});

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    org: orgSlice.reducer,
  },
});

export const { setThemeMode, toggleTheme, toggleSidebar, setCommandPaletteOpen } = uiSlice.actions;
export const { setAuthLoading, setUser, clearUser, initializeAuth } = authSlice.actions;
export const { setCurrentOrg } = orgSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { Organization, AuthUser };
