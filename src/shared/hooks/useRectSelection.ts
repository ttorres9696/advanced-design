import Konva from 'konva';
import { Group } from 'konva/types/Group';
import { Layer } from 'konva/types/Layer';
import { KonvaEventObject, Node } from 'konva/types/Node';
import { Rect } from 'konva/types/shapes/Rect';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { SelectionType } from '../../redux/canvas/types';
import { getRespectiveLayerSolarType } from '../../redux/stage/helpers';
import { ShapeCoords } from '../components/ShapeElement/types';
import { lockedTypes } from '../helpers/polygons.helper';
import { SolarType } from '../models/Solar.type';

const useRectSelection = (
  selectElement: (id: string, layer: string, selectionType: SelectionType, node?: Node) => void,
) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [rectSelectionRef, setRectSelectionRef] = useState<Rect | null>();
  const [coords, setCoords] = useState<ShapeCoords[]>([
    {
      x: 0,
      y: 0,
    },
    {
      x: 0,
      y: 0,
    },
  ]);

  const selectMode = useSelector((state: RootState) => state.canvas.selectMode);

  const handleTouchStart = useCallback(
    (e: KonvaEventObject<any>) => {
      if (!rectSelectionRef || e.target !== rectSelectionRef.getStage() || !selectMode || rectSelectionRef.visible()) {
        return;
      }

      const stage = rectSelectionRef.getStage()!;

      const paddingX = stage.x() >= 0 ? -stage.x() : stage.x();
      const paddingY = stage.y() >= 0 ? -stage.y() : stage.y();

      const origin: ShapeCoords = {
        x: stage.getPointerPosition()!.x + paddingX,
        y: stage.getPointerPosition()!.y + paddingY,
      };

      rectSelectionRef.visible(true);
      rectSelectionRef.width(0);
      rectSelectionRef.height(0);
      rectSelectionRef.setAttrs(origin);

      setCoords([origin, origin]);

      rectSelectionRef.getLayer()?.draw();
    },
    [rectSelectionRef, selectMode, setCoords],
  );

  const handleTouchMove = useCallback(
    (e: KonvaEventObject<any>) => {
      if (
        !rectSelectionRef ||
        !rectSelectionRef.visible() ||
        !selectMode ||
        (e.evt.buttons === 0 && e.evt.which === 0)
      ) {
        return;
      }

      const stage = rectSelectionRef.getStage()!;

      const origin: ShapeCoords = coords[0];

      const paddingX = stage.x() >= 0 ? -stage.x() : stage.x();
      const paddingY = stage.y() >= 0 ? -stage.y() : stage.y();

      const actualCoords: ShapeCoords = {
        x: stage.getPointerPosition()!.x + paddingX,
        y: stage.getPointerPosition()!.y + paddingY,
      };

      rectSelectionRef.setAttrs({
        x: Math.min(origin.x!, actualCoords.x!),
        y: Math.min(origin.y!, actualCoords.y!),
        width: Math.abs(actualCoords.x! - origin.x!),
        height: Math.abs(actualCoords.y! - origin.y!),
      });

      setCoords([origin, actualCoords]);

      rectSelectionRef.getLayer()?.batchDraw();
    },
    [rectSelectionRef, selectMode, coords, setCoords],
  );

  const handleTouchEnd = useCallback(() => {
    if (!rectSelectionRef || !rectSelectionRef.visible() || !selectMode) {
      return;
    }

    const stage = rectSelectionRef.getStage()!;

    // update visibility in timeout, to check it in click event
    setTimeout(() => {
      rectSelectionRef.visible(false);
      rectSelectionRef.getLayer()?.batchDraw();
    });

    var selectionBox = rectSelectionRef.getClientRect();
    const mainLayer: Layer = stage.find('#layers').toArray()[0] as Layer;
    const groups = mainLayer.find('Group').toArray() as Group[];
    groups.forEach(group => {
      const elementType: SolarType = getRespectiveLayerSolarType(group.id());

      if (elementType && elementType.length > 0 && !lockedTypes.includes(elementType)) {
        group
          .getChildren()
          .toArray()
          .forEach(node => {
            const isIntoSelectionRange = Konva.Util.haveIntersection(selectionBox, node.getClientRect());

            if (isIntoSelectionRange && node.draggable()) {
              selectElement(node.id(), group.id(), 'add', node);
            }
          });
      }
    });

    rectSelectionRef.getLayer()?.batchDraw();
  }, [rectSelectionRef, selectMode, selectElement]);

  useEffect(() => {
    if (rectSelectionRef && !initialized) {
      setInitialized(true);

      rectSelectionRef.visible(false);
      rectSelectionRef.getLayer()?.draw();
    }
  }, [rectSelectionRef, handleTouchStart, handleTouchMove, handleTouchEnd, initialized, setInitialized]);

  return {
    setRectSelectionRef,
    rectSelectionHandleTouchStart: handleTouchStart,
    rectSelectionHandleTouchMove: handleTouchMove,
    rectSelectionHandleTouchEnd: handleTouchEnd,
  };
};

export default useRectSelection;
