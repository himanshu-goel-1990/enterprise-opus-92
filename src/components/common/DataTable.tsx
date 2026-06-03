import { DataGrid, type DataGridProps } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export function DataTable(props: DataGridProps) {
  return (
    <Box
      sx={{
        "& .MuiDataGrid-root": {
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          "--DataGrid-containerBackground": "transparent",
        },
        "& .MuiDataGrid-columnHeaders": { bgcolor: "var(--mui-surface-2)" },
        "& .MuiDataGrid-columnHeader": { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "text.secondary" },
        "& .MuiDataGrid-cell": { fontSize: 13.5, alignItems: "center", display: "flex" },
        "& .MuiDataGrid-row:hover": { bgcolor: "action.hover" },
        "& .MuiDataGrid-footerContainer": { borderTop: "1px solid", borderColor: "divider" },
      }}
    >
      <DataGrid
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        density="standard"
        {...props}
      />
    </Box>
  );
}
