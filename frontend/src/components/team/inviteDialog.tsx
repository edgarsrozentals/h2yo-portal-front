import React, { useState } from 'react';
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InviteContainer from '../../features/invite/container';

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const theme = useTheme();
  return (
    <DialogTitle color={theme.palette.primary.dark} sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[600],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface DialogTitleProps {
  open: boolean,
  children?: React.ReactNode;
  onClose: () => void;
}

export default function InviteDialog({ open, onClose }: DialogTitleProps) {

  const theme = useTheme();

  return <Dialog
    sx={{ minWidth: '400px' }}
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <BootstrapDialogTitle open={open} onClose={onClose}>
      Invite new member
    </BootstrapDialogTitle>
    <DialogContent sx={{ padding: theme.spacing(0, 2) }}>
      <Box sx={{ padding: theme.spacing(2, 0), borderTop: '1px solid ' + theme.palette.primary.dark }}>
        <InviteContainer />
      </Box>
      
    </DialogContent>
  </Dialog>;
}