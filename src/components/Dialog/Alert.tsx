import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface ModalAlertProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ModalAlert: React.FC<ModalAlertProps> = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.2rem' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: '16px', textAlign: 'center', fontSize: '1rem' }}>
        {message}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
        <Button onClick={onClose} color="primary" variant="text" sx={{ width: '100%' }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAlert;
