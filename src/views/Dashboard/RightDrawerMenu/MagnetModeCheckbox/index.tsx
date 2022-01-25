import { Checkbox, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux';
import { toggleMagnetMode } from '../../../../redux/canvas/actions';
import useStyles from './styles';
import { MagnetModeCheckboxProps } from './types';

const MagnetModeCheckbox: React.FC<MagnetModeCheckboxProps> = ({ mode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const magnetMode = useSelector((state: RootState) => state.canvas.magnetMode);

  const onChange = useCallback(() => dispatch(toggleMagnetMode()), [dispatch]);

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" justify="center" alignItems="center" wrap="nowrap">
        <Grid
          item
          className={clsx(classes.checkboxContainer, {
            [classes.checkboxContainerBorderRight]: mode === 'full',
          })}
        >
          <Checkbox checked={magnetMode} onChange={onChange} color="default" className={classes.checkbox} />
        </Grid>
        {mode === 'full' ? (
          <Grid item xs className={classes.labelContainer} onClick={onChange}>
            <Typography variant="overline">Magnet Mode</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
};

export default React.memo(MagnetModeCheckbox);
