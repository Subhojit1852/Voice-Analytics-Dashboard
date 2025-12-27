import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  previousData: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function OverwriteModal({
  open,
  previousData,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Overwrite existing data?</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>
          You previously saved:
        </Typography>
        <pre style={{ fontSize: 12 }}>
          {JSON.stringify(previousData, null, 2)}
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="warning" onClick={onConfirm}>
          Overwrite
        </Button>
      </DialogActions>
    </Dialog>
  );
}
