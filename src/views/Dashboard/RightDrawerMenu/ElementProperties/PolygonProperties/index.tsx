import { Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { Cancel as CancelIcon, Delete as DeleteIcon, GpsFixed as PointIcon } from '@material-ui/icons';
import { Decimal } from 'decimal.js';
import { isArray } from 'lodash';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AllowNegativeNumberFormatInput } from '..';
import { RootState } from '../../../../../redux';
import { setDeleteDraggablePointMode, setNewDraggablePointMode } from '../../../../../redux/canvas/actions';
import { defaultMultiplierScale } from '../../../../../redux/stage/types';
import useStyles from './styles';
import { PolygonPropertiesProps } from './types';

const PolygonProperties: React.FC<PolygonPropertiesProps> = ({ points, updateShapeProperty, deletePoint }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const newDraggablePointMode = useSelector((state: RootState) => state.canvas.newDraggablePointMode);
  const deleteDraggablePointMode = useSelector((state: RootState) => state.canvas.deleteDraggablePointMode);

  const updatePoint = useCallback(
    (pointIndex: number, coordIndex: number, value: number) => {
      if (points && points[pointIndex][coordIndex] !== value) {
        const updatedPoints = Array.from(points);
        updatedPoints[pointIndex][coordIndex] = value;

        updateShapeProperty('points', updatedPoints);
      }
    },
    [points, updateShapeProperty],
  );

  const onDeleteClick = useCallback((pointIndex: number) => deletePoint(pointIndex), [deletePoint]);

  const onToggleNewDraggablePointMode = useCallback(() => {
    dispatch(setNewDraggablePointMode(!newDraggablePointMode));
    dispatch(setDeleteDraggablePointMode(false));
  }, [dispatch, newDraggablePointMode]);

  const onToggleDeleteDraggablePointMode = useCallback(() => {
    dispatch(setDeleteDraggablePointMode(!deleteDraggablePointMode));
    dispatch(setNewDraggablePointMode(false));
  }, [dispatch, deleteDraggablePointMode]);

  return (
    <Grid item container xs={12} spacing={2} direction="column">
      <Grid item xs={12} container direction="row" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="overline">Points</Typography>
        </Grid>

        <Grid item xs={12} sm={6} className={classes.paddingRight}>
          {newDraggablePointMode ? (
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              fullWidth
              className={classes.cancelButton}
              onClick={onToggleNewDraggablePointMode}
              size="small"
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PointIcon />}
              fullWidth
              onClick={onToggleNewDraggablePointMode}
              size="small"
            >
              Add
            </Button>
          )}
        </Grid>

        <Grid item xs={12} sm={6} className={classes.paddingLeft}>
          {deleteDraggablePointMode ? (
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              fullWidth
              className={classes.cancelButton}
              onClick={onToggleDeleteDraggablePointMode}
              size="small"
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PointIcon />}
              fullWidth
              onClick={onToggleDeleteDraggablePointMode}
              size="small"
            >
              Delete
            </Button>
          )}
        </Grid>
      </Grid>

      {points && isArray(points)
        ? points.map((point: number[], pointIndex: number) => (
            <Grid key={pointIndex} item container xs={12} spacing={1} direction="row" alignItems="center">
              <Grid item>
                <Typography variant="caption">{pointIndex + 1}</Typography>
              </Grid>

              <Grid item xs>
                <TextField
                  id={`point-x-${pointIndex}`}
                  label="X"
                  fullWidth
                  value={new Decimal(point[0]).dividedBy(defaultMultiplierScale).toNumber()}
                  type="tel"
                  onChange={(event: React.ChangeEvent<{ value: string }>) => {
                    updatePoint(pointIndex, 0, new Decimal(event.target.value).mul(defaultMultiplierScale).toNumber());
                  }}
                  InputProps={{
                    inputComponent: AllowNegativeNumberFormatInput,
                  }}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  id={`point-y-${pointIndex}`}
                  label="Y"
                  fullWidth
                  value={new Decimal(point[1]).dividedBy(defaultMultiplierScale).toNumber()}
                  type="tel"
                  onChange={(event: React.ChangeEvent<{ value: string }>) => {
                    updatePoint(pointIndex, 1, new Decimal(event.target.value).mul(defaultMultiplierScale).toNumber());
                  }}
                  InputProps={{
                    inputComponent: AllowNegativeNumberFormatInput,
                  }}
                />
              </Grid>

              <Grid item>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    onDeleteClick(pointIndex);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default React.memo(PolygonProperties);
