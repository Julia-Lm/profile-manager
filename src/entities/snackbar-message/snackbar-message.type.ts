import { OverridableStringUnion } from "@mui/types";
import { AlertColor, AlertPropsColorOverrides } from "@mui/material/Alert/Alert";

export interface SnackbarMessageProp {
  open: boolean;
  onClose: () => void;
  message: string | null;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
}
