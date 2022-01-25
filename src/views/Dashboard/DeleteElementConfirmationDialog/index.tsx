import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useCallback } from 'react';

import { DeleteElementConfirmationDialogProps } from './types';

const DeleteElementConfirmationDialog: React.FC<DeleteElementConfirmationDialogProps> = ({
  open,
  callback,
  multiple,
}) => {
  const onConfirm = useCallback((confirmed: boolean) => callback(confirmed), [callback]);

  return (
    <Dialog
      onClose={() => {
        onConfirm(false);
      }}
      aria-labelledby="delete-element-confirmation-dialog-title"
      aria-describedby="delete-element-confirmation-dialog-description"
      open={open}
    >
      <DialogTitle id="delete-element-confirmation-dialog-title">Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-element-confirmation-dialog-description">
          Are you sure want to delete {(multiple && 'these elements') || 'this element'}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onConfirm(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm(true);
          }}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DeleteElementConfirmationDialog);
