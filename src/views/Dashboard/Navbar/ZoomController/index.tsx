import { Box, IconButton } from '@material-ui/core';
import { AddCircleOutline as IncreaseZoomIcon, RemoveCircleOutline as DecreaseZoomIcon } from '@material-ui/icons';
import Decimal from 'decimal.js';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux';
import { decreaseZoom, increaseZoom } from '../../../../redux/canvas/actions';
import useStyles from './styles';

const ZoomController: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const scale = useSelector((state: RootState) => state.canvas.scale);

  const onZoomInClick = useCallback(() => dispatch(increaseZoom()), [dispatch]);
  const onZoomOutClick = useCallback(() => dispatch(decreaseZoom()), [dispatch]);

  return (
    <Box className={classes.controller}>
      <IconButton color="inherit" aria-label="decrease-zoom" onClick={onZoomOutClick}>
        <DecreaseZoomIcon />
      </IconButton>
      <Box className={classes.value}>{new Decimal(scale).mul(100).toFixed(0)}%</Box>
      <IconButton color="inherit" aria-label="increase-zoom" onClick={onZoomInClick}>
        <IncreaseZoomIcon />
      </IconButton>
    </Box>
  );
};

export default React.memo(ZoomController);
