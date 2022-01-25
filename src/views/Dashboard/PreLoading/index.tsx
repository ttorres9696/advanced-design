import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { cancelPreLoading } from '../../../redux/core/actions';
import useStyles from './styles';

const PreLoading: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cancelledPreLoading = useSelector((state: RootState) => state.core.canceledPreLoading);

  const [message, setMessage] = useState<string>(`LOADING INSTANT DESIGN...`);

  const handleClickCancelButton = useCallback(() => {
    setMessage('INSTANT DESIGN CANCELLED');
    dispatch(cancelPreLoading());
  }, [dispatch, setMessage]);

  return (
    <Box className={classes.root}>
      <i
        className={clsx(classes.img, {
          [classes.loadingImg]: !cancelledPreLoading,
          [classes.cancelImg]: cancelledPreLoading,
        })}
      />

      <Typography variant="overline" gutterBottom className={classes.loadingSubtitle}>
        {message}
      </Typography>

      {!cancelledPreLoading ? (
        <Typography variant="overline" className={classes.cancelButton} onClick={handleClickCancelButton}>
          CANCEL
        </Typography>
      ) : null}
    </Box>
  );
};

export default React.memo(PreLoading);
