// api/axios.js
import axios from "axios";
import { enqueueSnackbar, useSnackbar } from "notistack";


const isLocal = window.location.hostname === "localhost";

const baseURL = isLocal
  ? import.meta.env.VITE_SERVER_LOCAL_URL
  : import.meta.env.VITE_SERVER_LIVE_URL;

const api = axios.create({
  baseURL: baseURL,
});




// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔴 Central logout trigger
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 403 && err.response?.data?.message === "Access denied") {
      alert("API Error: " + (err.response.message || "Access denied"));
    }

     
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;