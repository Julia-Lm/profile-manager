import { CircularProgress, Box } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "rgba(244,244,244, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "3",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
