import { Snackbar } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";

interface FilledAlerts {
  title: string;
  type: AlertColor | undefined;
  open: boolean;
  onClose: () => void;
}

export default function FilledAlerts({
  title,
  type,
  open,
  onClose,
}: FilledAlerts) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
    >
      <Alert
        sx={{ width: "100%", boxShadow: 3 }}
        variant='filled'
        severity={type}
      >
        {title}
      </Alert>
    </Snackbar>
  );
}
