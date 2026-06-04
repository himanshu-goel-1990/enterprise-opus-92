import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Upload, X, ImageIcon } from "lucide-react";
import { useSnackbar } from "notistack";
import api from "@/features/api/axios";

export interface ImageUploadProps {
  value?: string | null;
  onChange?: (url: string | null) => void;
  label?: string;
  helperText?: string;
  maxSizeMB?: number;
  accept?: string;
  uploadUrl?: string;
  fieldName?: string;
  shape?: "circle" | "square";
  size?: number;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload image",
  helperText = "PNG, JPG up to 5MB",
  maxSizeMB = 5,
  accept = "image/*",
  uploadUrl = "/upload/image",
  fieldName = "file",
  shape = "square",
  size = 128,
  disabled = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handlePick = () => inputRef.current?.click();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      enqueueSnackbar("Please select an image file", { variant: "error" });
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      enqueueSnackbar(`File must be under ${maxSizeMB}MB`, { variant: "error" });
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append(fieldName, file);
      const res = await api.post(uploadUrl, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url =
        res.data?.data?.url || res.data?.url || res.data?.data?.path || res.data?.path || null;

      if (res.data?.success === false) {
        throw new Error(res.data?.message || "Upload failed");
      }

      if (url) {
        setPreview(url);
        onChange?.(url);
        enqueueSnackbar("Image uploaded", { variant: "success" });
      } else {
        // Still report success but pass back local preview
        onChange?.(localUrl);
      }
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || "Upload failed", {
        variant: "error",
      });
      setPreview(value || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
  };

  const radius = shape === "circle" ? "50%" : 2;

  return (
    <Stack spacing={1}>
      {label && (
        <Typography variant="body2" fontWeight={500} color="text.secondary">
          {label}
        </Typography>
      )}
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: radius,
            border: "1px dashed",
            borderColor: "divider",
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onClick={() => !disabled && !uploading && handlePick()}
        >
          {preview ? (
            shape === "circle" ? (
              <Avatar src={preview} sx={{ width: size, height: size }} />
            ) : (
              <img
                src={preview}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )
          ) : (
            <ImageIcon size={32} opacity={0.4} />
          )}
          {uploading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={28} sx={{ color: "#fff" }} />
            </Box>
          )}
        </Box>

        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Upload size={14} />}
              onClick={handlePick}
              disabled={disabled || uploading}
            >
              {preview ? "Change" : "Upload"}
            </Button>
            {preview && (
              <IconButton size="small" onClick={handleRemove} disabled={uploading}>
                <X size={16} />
              </IconButton>
            )}
          </Stack>
          {helperText && (
            <Typography variant="caption" color="text.secondary">
              {helperText}
            </Typography>
          )}
        </Stack>
      </Stack>

      <input ref={inputRef} type="file" accept={accept} hidden onChange={handleFile} />
    </Stack>
  );
}
