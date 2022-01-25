import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { decrementTotalShapes, selectShape, setNewDraggablePointMode } from '../../redux/canvas/actions';
import { setDeleteDialogParams, setPreLoading } from '../../redux/core/actions';
import { finishHistoryItem, removeShapes, setSelectedElement, startHistoryItem } from '../../redux/stage/actions';
import useWindowResize from '../../shared/hooks/useWindowResize';

const useDashboard = () => {
  const dispatch = useDispatch();

  useWindowResize();

  const [isRightDrawerOpened, setRightDrawerOpened] = useState<boolean>(true);
  const [mockFinishLoading, setMockFinishLoading] = useState<any>();

  const deleteDialogParams = useSelector((state: RootState) => state.core.deleteDialogParams);

  const preLoading = useSelector((state: RootState) => state.core.preLoading);
  const canceledPreLoading = useSelector((state: RootState) => state.core.canceledPreLoading);

  const drawerToggleAction = useCallback(
    (side: 'right') => {
      setRightDrawerOpened(!isRightDrawerOpened);
    },
    [isRightDrawerOpened, setRightDrawerOpened],
  );

  const onDeleteConfirm = useCallback(
    (confirmed: boolean) => {
      if (confirmed) {
        deleteDialogParams.elementIds.forEach((elementId: string) => {
          dispatch(setSelectedElement(deleteDialogParams.layer, elementId, false));
        });

        dispatch(startHistoryItem(deleteDialogParams.elementIds, deleteDialogParams.layer));
        dispatch(removeShapes(deleteDialogParams.layer, deleteDialogParams.elementIds));
        dispatch(finishHistoryItem(deleteDialogParams.elementIds, deleteDialogParams.layer));
        dispatch(decrementTotalShapes(deleteDialogParams.elementIds.length));

        dispatch(selectShape('', '', 'reset'));
        dispatch(setNewDraggablePointMode(false));
      }

      dispatch(
        setDeleteDialogParams({
          elementIds: [],
          layer: '',
          open: false,
        }),
      );
    },
    [dispatch, deleteDialogParams],
  );

  useEffect(() => {
    if (preLoading && !mockFinishLoading) {
      setMockFinishLoading(
        setTimeout(() => {
          dispatch(setPreLoading(false));
        }, 5000),
      );
    } else if (canceledPreLoading && mockFinishLoading) {
      clearTimeout(mockFinishLoading);
    }
  }, [preLoading, dispatch, mockFinishLoading, setMockFinishLoading, canceledPreLoading]);

  return {
    isRightDrawerOpened,
    drawerToggleAction,
    isDeleteDialogOpen: deleteDialogParams.open,
    multiple: deleteDialogParams.elementIds && deleteDialogParams.elementIds.length > 0,
    onDeleteConfirm,
    preLoading,
  };
};

export default useDashboard;
