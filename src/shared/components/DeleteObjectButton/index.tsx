import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';

import useStyles from './styles';
import { DeleteObjectButtonProps } from './types';

const DeleteObjectButton: React.FC<DeleteObjectButtonProps> = ({ onDelete, disabled, multiple }) => {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      fullWidth
      className={classes.deleteButton}
      onClick={onDelete}
      size="small"
      disabled={disabled}
    >
      Delete Object{(multiple && 's') || ''}
    </Button>
  );
};

export default React.memo(DeleteObjectButton);
