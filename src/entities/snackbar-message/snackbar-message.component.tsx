import { Alert, Snackbar } from "@mui/material";
import { SnackbarMessageProp } from "entities/snackbar-message/snackbar-message.type.ts";

export const SnackbarMessage = ({ open, onClose, severity, message }: SnackbarMessageProp) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
