import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSnackbar } from "notistack";
import { loginUser } from "@/features/services/authService";
import { showSuccess, showError, showLoading } from "@/lib/toast";
import { useAppSelector } from "@/app/store";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setUser, setAuthLoading, clearUser, initializeAuth } from "@/app/store";

export default function LoginPage() {
  const { status } = useAppSelector((s) => s.auth);
  const toastId = showLoading("Logging in...");
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("12345678");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const initialized =
    useAppSelector(
      (s) => s.auth.initialized
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await loginUser({ email, password });
    console.log(res.data.accessToken);

    setLoading(false);
    if (!res.success) {
      enqueueSnackbar("Invalid Credentials !", { variant: "error" });
      return;
    }

    // UPDATE REDUX STATE
    dispatch(setUser(res.data.user));

    localStorage.setItem("token", res.data.accessToken);
    console.log(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user, null, 2));
    localStorage.setItem("permissions", JSON.stringify(res.data.permissions, null, 2));
    enqueueSnackbar("Welcome back!", { variant: "success" });
    navigate("/dashboard");
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Welcome back
        </Typography>
        <Typography color="text.secondary">Sign in to your Northstar workspace</Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" size="large" startIcon={<GoogleIcon />}>
          Continue with Google
        </Button>
        <Button variant="outlined" size="large" sx={{ minWidth: 56 }} component={Link} to="/sso">
          SSO
        </Button>
      </Stack>

      <Divider sx={{ "&::before, &::after": { borderColor: "divider" } }}>
        <Typography variant="caption" color="text.secondary">
          or with email
        </Typography>
      </Divider>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {err && (
            <Alert severity="error" variant="outlined">
              {err}
            </Alert>
          )}
          <TextField
            label="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
            size="medium"
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            required
            size="medium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPw((v) => !v)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" component={Link} to="/forgot-password">
              Forgot password?
            </Button>
          </Stack>
          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={loading}
            endIcon={<ChevronRight size={16} />}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </Stack>
      </form>

      <Typography variant="body2" color="text.secondary" align="center">
        Don&apos;t have an account?{" "}
        <Box component={Link} to="/register" sx={{ color: "primary.main", fontWeight: 600 }}>
          Start a free trial
        </Box>
      </Typography>
    </Stack>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.1l6.6 4.8C14.7 15.2 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.1z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41 36 44 30.5 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
