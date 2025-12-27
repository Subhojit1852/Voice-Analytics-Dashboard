import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  onSubmit: (email: string) => void;
  onClose: () => void;
}

export default function EmailModal({ open, onSubmit, onClose }: Props) {
  const [email, setEmail] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter your email</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(email)}
          disabled={!email}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
