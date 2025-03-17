import { ModalProps } from "./modal.type.ts";
import { DialogContent, DialogTitle, Dialog } from "@mui/material";

export const Modal = ({
  open,
  onClose,
  children,
  title,
  maxWidth = "md",
  fullWidth = true,
  ...prop
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth} {...prop}>
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent sx={{ overflow: "visible" }}>{children}</DialogContent>
    </Dialog>
  );
};
