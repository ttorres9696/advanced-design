import { Box } from '@material-ui/core';
import { Add as IncreaseZoomIcon, Remove as DecreaseZoomIcon } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { decreaseZoom, increaseZoom } from '../../../redux/canvas/actions';
import useStyles from './styles';

const ZoomController: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onZoomInClick = useCallback(() => dispatch(increaseZoom()), [dispatch]);
  const onZoomOutClick = useCallback(() => dispatch(decreaseZoom()), [dispatch]);

  return (
    <Box className={classes.controller}>
      <button className={[classes.zoomButton, classes.zoomInButton].join(' ')} onClick={onZoomInClick}>
        <IncreaseZoomIcon />
      </button>
      <button className={[classes.zoomButton, classes.zoomOutButton].join(' ')} onClick={onZoomOutClick}>
        <DecreaseZoomIcon />
      </button>
    </Box>
  );
};

export default React.memo(ZoomController);
