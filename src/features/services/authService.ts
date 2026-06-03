// src/services/authService.js

import axios from "axios";
import api from "@/api/axios"

/**
 * Centralized API service for Auth related APIs
 * You can add multiple APIs for Login/Register pages here
 */

const isLocal = window.location.hostname === "localhost";

const baseURL = isLocal
  ? import.meta.env.VITE_SERVER_LOCAL_URL
  : import.meta.env.VITE_SERVER_LIVE_URL;


const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Common error handler
 */
const handleError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || "Something went wrong",
      data: error.response.data,
    };
  }

  return {
    success: false,
    message: error.message || "Network Error",
  };
};

/* =========================================================
   LOGIN PAGE APIs
========================================================= */

/**
 * Login User
 */
export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", {
      email,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Verify OTP
 */
export const verifyOtp = async (payload) => {
  try {
    const response = await api.post("/auth/verify-otp", payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/* =========================================================
   REGISTER PAGE APIs
========================================================= */

/**
 * Register User
 */
export const registerUser = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Check Email Exists
 */
export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`/auth/check-email?email=${email}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Send Registration OTP
 */
export const sendRegisterOtp = async (payload) => {
  try {
    const response = await api.post("/auth/send-register-otp", payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/* =========================================================
   COMMON APIs
========================================================= */

/**
 * Logout User
 */
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Refresh Token
 */
export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh-token");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};