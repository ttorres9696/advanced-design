import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux';
import { incrementTotalShapes, selectShape, setSelectMode } from '../../../../redux/canvas/actions';
import {
  addShape,
  finishHistoryItem,
  setSelectedElement,
  setTransformerNodes,
  startHistoryItem,
} from '../../../../redux/stage/actions';
import { getCurrentModulePointsRotation, getModuleDesignPoints } from '../../../../shared/helpers/modules.helper';
import { SolarElement } from '../../../../shared/models/SolarElement.interface';
import useStyles from './styles';

const AddPanelButton: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const totalShapes = useSelector((state: RootState) => state.canvas.totalShapes);
  const selectedModuleSpec = useSelector((state: RootState) => state.stage.selectedModuleSpec);
  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName);
  const selectedShapeElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds);

  const handleOnClick = useCallback(() => {
    if (selectedModuleSpec) {
      const layer = 'modules';

      const points = getModuleDesignPoints(selectedModuleSpec);

      const newShape: SolarElement = {
        id: `M${totalShapes + 1}`,
        shape: {
          points,
          pointsRotationInRadians: getCurrentModulePointsRotation(points),
          type: 'polygon',
        },
        type: 'module',
        active: true,
      };

      dispatch(startHistoryItem([newShape.id], layer));

      dispatch(addShape(selectedModuleSpec.series, newShape));
      dispatch(incrementTotalShapes());

      dispatch(setSelectMode(true));

      selectedShapeElementIds.forEach((elementId: string) => {
        dispatch(setSelectedElement(selectedLayerName, elementId, false));
      });

      dispatch(setSelectedElement(layer, newShape.id, true));

      dispatch(selectShape(newShape.id, layer, 'reset'));

      dispatch(setTransformerNodes('reset', [newShape.id]));

      dispatch(finishHistoryItem([newShape.id], layer));
    }
  }, [dispatch, totalShapes, selectedModuleSpec, selectedLayerName, selectedShapeElementIds]);

  return (
    <button type="button" className={classes.button} onClick={handleOnClick}>
      <i className={classes.icon} />
      ADD PANEL
    </button>
  );
};

export default React.memo(AddPanelButton);
