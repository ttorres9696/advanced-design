import { concat } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { selectShape, setDeleteDraggablePointMode, setNewDraggablePointMode } from '../../../redux/canvas/actions';
import { SelectionType } from '../../../redux/canvas/types';
import { setSelectedElement } from '../../../redux/stage/actions';
import { DrawerListItemProps } from '../../../shared/components/DrawerListItem/types';
import { getLayerIcon, LayersIcon } from '../../../shared/icons';

const useRightDrawerMenu = () => {
  const dispatch = useDispatch();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const layersOrder = useSelector((state: RootState) => state.stage.layersOrder);
  const layers = useSelector(
    (state: RootState) =>
      (state.stage.selectedModuleSpec &&
        state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].layers) ||
      {},
  );
  const selectedElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds);
  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName);
  const selectMode = useSelector((state: RootState) => state.canvas.selectMode);

  const onToggleExpandItem = useCallback(
    (id: string) => {
      if (!expandedItems.includes(id)) {
        setExpandedItems(concat(expandedItems, [id]));
      } else {
        const updatedExpandedItems = Array.from(expandedItems);
        updatedExpandedItems.splice(expandedItems.indexOf(id), 1);
        setExpandedItems(updatedExpandedItems);
      }
    },
    [expandedItems, setExpandedItems],
  );

  const onSelectShapeElement = useCallback(
    (shapeElementId: string, parentId: string, selectionType: SelectionType) => {
      if (selectMode) {
        if (selectionType === 'reset') {
          selectedElementIds.forEach((elementId: string) => {
            dispatch(setSelectedElement(selectedLayerName, elementId, false));
          });
        }

        if (
          shapeElementId.length > 0 &&
          (selectionType === 'reset' || (selectionType === 'add' && parentId === selectedLayerName))
        ) {
          dispatch(setSelectedElement(parentId, shapeElementId, true));
        }

        dispatch(selectShape(shapeElementId, parentId, selectionType));
        dispatch(setNewDraggablePointMode(false));
        dispatch(setDeleteDraggablePointMode(false));
      }
    },
    [dispatch, selectedElementIds, selectedLayerName, selectMode],
  );

  const listItems: DrawerListItemProps[] = [
    {
      id: 'layers',
      icon: <LayersIcon />,
      label: 'Layers',
      action: onToggleExpandItem,
      expanded: expandedItems.includes('layers'),
      subItems: layersOrder.map((layer: string) => {
        const LayerIcon = getLayerIcon(layer);
        const subItemsIds = (layers && layers[layer] && Object.keys(layers[layer])) || [];
        return {
          id: layer,
          icon: <LayerIcon />,
          label: `${layer.charAt(0).toUpperCase()}${layer.slice(1)}`,
          action: onToggleExpandItem,
          selected: layer === selectedLayerName,
          expanded: expandedItems.includes(layer),
          subItems:
            subItemsIds && subItemsIds.length
              ? subItemsIds.map((id: string) => {
                  const shape = layers[layer][id].shape;
                  const ShapeIcon = getLayerIcon(layer, shape.type);

                  return {
                    id,
                    icon: <ShapeIcon />,
                    label: id,
                    selected: selectedElementIds.includes(id),
                    action: onSelectShapeElement,
                    visible: shape.visible,
                    locked: shape.locked,
                  };
                })
              : [],
        };
      }),
    },
  ];

  return {
    listItems,
  };
};

export default useRightDrawerMenu;
