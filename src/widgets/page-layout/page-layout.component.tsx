import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "entities/index";

export const PageLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
