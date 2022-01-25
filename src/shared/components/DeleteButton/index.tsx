import { Button } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { setDeleteDialogParams } from '../../../redux/core/actions';
import { getRespectiveLayerSolarType } from '../../../redux/stage/helpers';
import { lockedTypes } from '../../helpers/polygons.helper';
import useStyles from './styles';

const DeleteButton: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const selectedElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds);
  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName);

  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(
      selectedElementIds.length === 0 || lockedTypes.includes(getRespectiveLayerSolarType(selectedLayerName)),
    );
  }, [setDisabled, selectedElementIds, selectedLayerName]);

  const onDelete = useCallback(
    () =>
      dispatch(
        setDeleteDialogParams({
          elementIds: selectedElementIds,
          layer: selectedLayerName,
          open: true,
        }),
      ),
    [dispatch, selectedElementIds, selectedLayerName],
  );

  return (
    <Button
      variant="outlined"
      fullWidth
      className={classes.deleteButton}
      onClick={onDelete}
      size="small"
      disabled={disabled}
    >
      Delete
    </Button>
  );
};

export default React.memo(DeleteButton);
