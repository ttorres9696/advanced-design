// eslint-disable-next-line
import Konva from 'konva';
import React from 'react';
import { Layer, Stage, Group, Transformer, Rect } from 'react-konva';

import { CanvasProps } from './types';
import useStyles from './styles';
import useCanvas from './useCanvas';
import { SolarElement } from '../../../shared/models/SolarElement.interface';
import TransformableElement from '../../../shared/components/TransformableElement';
import ShapeElement from '../../../shared/components/ShapeElement';
import NewDraggablePoint from '../../../shared/components/NewDraggablePoint';
import { availableTypesForResizing } from '../../../shared/helpers/polygons.helper';
import useTransformer from '../../../shared/hooks/useTransformer';
import { RotationArrowIconButtonProps } from '../../../shared/components/TransformableElement/RotationArrowIconButton/types';
import RotationArrowIconButton from '../../../shared/components/TransformableElement/RotationArrowIconButton';
import useRectSelection from '../../../shared/hooks/useRectSelection';

const Canvas: React.FC<CanvasProps> = ({ solarDesign, canvasDimension }) => {
  const classes = useStyles();

  const {
    transformerRef,
    transformerSelectElement,
    transformerRotationIcons,
    transformerHandleDragElement,
    transformerRotateElements90Degrees,
    transformerOnDragEnd,
  } = useTransformer();

  const {
    selectElement,
    selectedElementIds,
    selectedLayerName,
    onStartChange,
    onChangeElementParams,
    onRotateElement,
    onFinishChange,
    onMoveElement,
    onMoveStart,
    onMoveEnd,
    setStageRef,
    layersOrder,
    layers,
    scale,
    canvasOrigin,
    newDraggablePointMode,
    deleteDraggablePointMode,
    mousePosition,
    onMouseMove,
    onMouseClick,
    setDragging,
    dragging,
    selectMode,
  } = useCanvas({
    solarDesign,
    transformerSelectElement,
    transformerHandleDragElement,
    transformerOnDragEnd,
  });

  const {
    setRectSelectionRef,
    rectSelectionHandleTouchStart,
    rectSelectionHandleTouchMove,
    rectSelectionHandleTouchEnd,
  } = useRectSelection(selectElement);

  let activeLayersOrder: string[] = Array.from(layersOrder);
  if (selectedLayerName && selectedLayerName.length) {
    activeLayersOrder.splice(activeLayersOrder.indexOf(selectedLayerName), 1);
    activeLayersOrder.push(selectedLayerName);
  }

  if (!canvasDimension || !canvasDimension.width || !canvasDimension.height) {
    return null;
  }

  return (
    <Stage
      ref={ref => setStageRef(ref as any)}
      width={canvasDimension.width}
      height={canvasDimension.height}
      onClick={onMouseClick}
      className={classes.content}
      onMouseDown={e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectElement('', '', 'reset');
        }

        rectSelectionHandleTouchStart(e);
      }}
      onMouseMove={e => {
        onMouseMove(e);
        rectSelectionHandleTouchMove(e);
      }}
      onMouseUp={e => {
        rectSelectionHandleTouchEnd();
      }}
      onTouchStart={e => {
        console.log(`onTouchStart`);
        rectSelectionHandleTouchStart(e);
      }}
      onTouchMove={e => {
        console.log(`onTouchMove`);
        rectSelectionHandleTouchMove(e);
      }}
      onTouchEnd={e => {
        console.log(`onTouchEnd`);
        rectSelectionHandleTouchEnd();
      }}
      draggable={!selectMode}
      scaleX={scale}
      scaleY={scale}
      x={canvasOrigin.x}
      y={canvasOrigin.y}
    >
      <Layer id="layers">
        {layers
          ? activeLayersOrder.map(layerName => (
              <Group key={layerName} id={layerName}>
                {Object.keys(layers[layerName]).map(index => {
                  const solarElement: SolarElement = layers[layerName][index];

                  return (
                    <TransformableElement
                      key={solarElement.id}
                      id={solarElement.id}
                      layer={layerName}
                      shapeType={solarElement.shape.type}
                      version={solarElement.shape.version!}
                      isSelected={selectedElementIds.includes(solarElement.id)}
                      onSelect={selectElement}
                      onStartChange={onStartChange}
                      onChange={onChangeElementParams}
                      onRotate={onRotateElement}
                      onFinishChange={onFinishChange}
                      onMoveStart={onMoveStart}
                      onMove={onMoveElement}
                      onMoveEnd={onMoveEnd}
                      visible={solarElement.shape.visible!}
                      locked={solarElement.shape.locked!}
                      deleteDraggablePointMode={deleteDraggablePointMode}
                      resizeEnabled={availableTypesForResizing.includes(solarElement.type)}
                      setDragging={setDragging}
                      multiple={selectedElementIds.length > 1}
                      active={!!solarElement.active}
                      selectMode={selectMode}
                    >
                      <ShapeElement id={solarElement.id} {...solarElement.shape} solarType={solarElement.type} />
                    </TransformableElement>
                  );
                })}
              </Group>
            ))
          : null}

        <Transformer
          ref={transformerRef}
          resizeEnabled={false}
          rotateEnabled={selectedElementIds.length === 1}
          ignoreStroke={true}
          borderEnabled={true}
          borderDash={[5, 2]}
        >
          {selectedElementIds.length === 1
            ? transformerRotationIcons.map((icon: RotationArrowIconButtonProps) => (
                <RotationArrowIconButton
                  key={icon.position}
                  x={icon.x}
                  y={icon.y}
                  type={icon.type}
                  rotation={icon.rotation}
                  position={icon.position}
                  onClick={transformerRotateElements90Degrees}
                  invisible={dragging}
                />
              ))
            : null}
        </Transformer>

        <Rect ref={ref => setRectSelectionRef(ref)} fill="rgba(5, 102, 173, 0.5)" draggable={false} />
      </Layer>

      {newDraggablePointMode && mousePosition ? (
        <Layer id="new-draggable-point-mode">
          <NewDraggablePoint newDraggablePointMode={newDraggablePointMode} mousePosition={mousePosition} />
        </Layer>
      ) : null}
    </Stage>
  );
};

export default React.memo(Canvas);
