import { concat, isArray } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { incrementTotalShapes, selectShape } from '../../../redux/canvas/actions';
import { fetchModuleSpecs } from '../../../redux/core/actions';
import { addShape, setSelectedElement } from '../../../redux/stage/actions';
import { getSolarTypeLayer } from '../../../redux/stage/helpers';
import { DrawerListItemProps } from '../../../shared/components/DrawerListItem/types';
import { getCurrentModulePointsRotation, getModuleDesignPoints } from '../../../shared/helpers/modules.helper';
import {
  AddIcon,
  CircularObstructionsIcon,
  LoadingIcon,
  ModulesIcon,
  ObstructionsIcon,
  RoofsIcon,
  SetbacksIcon,
} from '../../../shared/icons';
import { SolarElement } from '../../../shared/models/SolarElement.interface';

const loadingOption: DrawerListItemProps = {
  id: 'loading',
  icon: <LoadingIcon />,
  label: 'Loading',
  action: () => {},
};

const defaultOptions: DrawerListItemProps[] = [
  {
    id: 'roof-plane',
    icon: <RoofsIcon />,
    label: 'Roof Plane',
  },
  {
    id: 'setback',
    icon: <SetbacksIcon />,
    label: 'Setback',
  },
  {
    id: 'circular-obstruction',
    icon: <CircularObstructionsIcon />,
    label: 'Circular Obstruction',
  },
  {
    id: 'rectangular-obstruction',
    icon: <ObstructionsIcon />,
    label: 'Rectangular Obstruction',
  },
];

const useLeftDrawerMenu = () => {
  const dispatch = useDispatch();

  const totalShapes = useSelector((state: RootState) => state.canvas.totalShapes);
  const moduleSpecs = useSelector((state: RootState) => state.core.moduleSpecs);
  const selectedModuleSpec = useSelector((state: RootState) => state.stage.selectedModuleSpec);
  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName);
  const selectedShapeElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds);

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const onToggleExpandItem = useCallback(
    (id: string) => {
      if (!expandedItems.includes(id)) {
        setExpandedItems(concat(expandedItems, [id]));
      } else {
        setExpandedItems(Array.from(expandedItems).splice(expandedItems.indexOf(id), -1));
      }
    },
    [expandedItems, setExpandedItems],
  );

  const onClickListItem = useCallback(
    (id: string) => {
      let newShape: SolarElement | undefined = undefined;

      switch (id) {
        case 'circular-obstruction':
          newShape = {
            id: `O${totalShapes + 1}`,
            shape: {
              center: [0, 0],
              radius: 1,
              type: 'circle',
            },
            type: 'obstruction',
          };
          break;

        case 'rectangular-obstruction':
          newShape = {
            id: `O${totalShapes + 1}`,
            shape: {
              points: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
              ],
              type: 'polygon',
            },
            type: 'obstruction',
          };
          break;

        case 'roof-plane':
          newShape = {
            id: `R${totalShapes + 1}`,
            shape: {
              points: [
                [0, 0],
                [0, 4],
                [2, 4],
                [2, 0],
              ],
              type: 'polygon',
            },
            type: 'roof_plane',
          };
          break;

        case 'setback':
          newShape = {
            id: `S${totalShapes + 1}`,
            shape: {
              points: [
                [0, 0],
                [0, 4],
                [2, 4],
                [2, 0],
              ],
              type: 'polygon',
            },
            type: 'setback',
          };
          break;

        case 'module':
          if (selectedModuleSpec) {
            const points = getModuleDesignPoints(selectedModuleSpec);

            newShape = {
              id: `M${totalShapes + 1}`,
              shape: {
                points,
                pointsRotationInRadians: getCurrentModulePointsRotation(points),
                type: 'polygon',
              },
              type: 'module',
            };
          }
          break;

        default:
          break;
      }

      if (selectedModuleSpec && newShape) {
        dispatch(addShape(selectedModuleSpec.series, newShape));
        dispatch(incrementTotalShapes());

        selectedShapeElementIds.forEach((elementId: string) => {
          dispatch(setSelectedElement(selectedLayerName, elementId, false));
        });

        dispatch(setSelectedElement(getSolarTypeLayer(newShape.type), newShape.id, true));

        dispatch(selectShape(newShape.id, getSolarTypeLayer(newShape.type), 'reset'));
      }
    },
    [dispatch, totalShapes, selectedModuleSpec, selectedLayerName, selectedShapeElementIds],
  );

  const [listItems, setListItems] = useState<DrawerListItemProps[]>([
    {
      id: 'add-elements',
      icon: <AddIcon />,
      label: 'Add Element',
      action: onToggleExpandItem,
      subItems: [loadingOption],
    },
  ]);

  useEffect(() => {
    const moduleSpecsOptions: DrawerListItemProps[] | null =
      moduleSpecs && isArray(moduleSpecs)
        ? moduleSpecs.map(moduleSpec => {
            return {
              id: moduleSpec.name,
              icon: <ModulesIcon />,
              label: moduleSpec.name,
              action: onClickListItem,
            };
          })
        : null;

    setListItems([
      {
        id: 'add-elements',
        icon: <AddIcon />,
        label: 'Add Element',
        action: onToggleExpandItem,
        subItems:
          selectedModuleSpec === null || selectedModuleSpec || moduleSpecsOptions
            ? selectedModuleSpec !== null
              ? concat(
                  [
                    {
                      id: 'module',
                      icon: <ModulesIcon />,
                      label: selectedModuleSpec!.series,
                      action: onClickListItem,
                    },
                  ],
                  defaultOptions.map(option => {
                    return {
                      ...option,
                      action: onClickListItem,
                    };
                  }),
                )
              : concat(
                  moduleSpecsOptions!,
                  defaultOptions.map(option => {
                    return {
                      ...option,
                      action: onClickListItem,
                    };
                  }),
                )
            : [loadingOption],
      },
    ]);
  }, [setListItems, moduleSpecs, selectedModuleSpec, onClickListItem, onToggleExpandItem]);

  useEffect(() => {
    dispatch(fetchModuleSpecs());
  }, [dispatch]);

  return {
    listItems,
    expandedItems,
  };
};

export default useLeftDrawerMenu;
