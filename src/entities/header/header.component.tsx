import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", width: "100%", pl: "24px", pr: "24px" }}>
          <Typography variant="h5">Profile Manager</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
