import { Box } from "@mui/system";
import ToolBarLayout from "./layoutsComponents/LayoutToolBar";

export default function Layout({ children }) {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F4F4F7" }}>
      <Box sx={{ backgroundColor: "#ffffff" }}>
        <ToolBarLayout />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, margin: "11px 15px 15px 15px" }}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "14px",
            flexGrow: 1,
            borderRadius: "5px",
            border: "1px solid #e0e0e0",
            transition: "border 0.1s ease-in-out",
            "&:hover": {
              border: "1px solid #797979",
            },
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
