"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactKonva = require("react-konva");

var _styles = _interopRequireDefault(require("./styles"));

var _useCanvas2 = _interopRequireDefault(require("./useCanvas"));

var _TransformableElement = _interopRequireDefault(require("../../../shared/components/TransformableElement"));

var _ShapeElement = _interopRequireDefault(require("../../../shared/components/ShapeElement"));

var _NewDraggablePoint = _interopRequireDefault(require("../../../shared/components/NewDraggablePoint"));

var _polygons = require("../../../shared/helpers/polygons.helper");

var _useTransformer2 = _interopRequireDefault(require("../../../shared/hooks/useTransformer"));

var _RotationArrowIconButton = _interopRequireDefault(require("../../../shared/components/TransformableElement/RotationArrowIconButton"));

var _useRectSelection2 = _interopRequireDefault(require("../../../shared/hooks/useRectSelection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Canvas = function Canvas(_ref) {
  var solarDesign = _ref.solarDesign,
      canvasDimension = _ref.canvasDimension;
  var classes = (0, _styles.default)();

  var _useTransformer = (0, _useTransformer2.default)(),
      transformerRef = _useTransformer.transformerRef,
      transformerSelectElement = _useTransformer.transformerSelectElement,
      transformerRotationIcons = _useTransformer.transformerRotationIcons,
      transformerHandleDragElement = _useTransformer.transformerHandleDragElement,
      transformerRotateElements90Degrees = _useTransformer.transformerRotateElements90Degrees,
      transformerOnDragEnd = _useTransformer.transformerOnDragEnd;

  var _useCanvas = (0, _useCanvas2.default)({
    solarDesign: solarDesign,
    transformerSelectElement: transformerSelectElement,
    transformerHandleDragElement: transformerHandleDragElement,
    transformerOnDragEnd: transformerOnDragEnd
  }),
      selectElement = _useCanvas.selectElement,
      selectedElementIds = _useCanvas.selectedElementIds,
      selectedLayerName = _useCanvas.selectedLayerName,
      onStartChange = _useCanvas.onStartChange,
      onChangeElementParams = _useCanvas.onChangeElementParams,
      onRotateElement = _useCanvas.onRotateElement,
      onFinishChange = _useCanvas.onFinishChange,
      onMoveElement = _useCanvas.onMoveElement,
      onMoveStart = _useCanvas.onMoveStart,
      onMoveEnd = _useCanvas.onMoveEnd,
      setStageRef = _useCanvas.setStageRef,
      layersOrder = _useCanvas.layersOrder,
      layers = _useCanvas.layers,
      scale = _useCanvas.scale,
      canvasOrigin = _useCanvas.canvasOrigin,
      newDraggablePointMode = _useCanvas.newDraggablePointMode,
      deleteDraggablePointMode = _useCanvas.deleteDraggablePointMode,
      mousePosition = _useCanvas.mousePosition,
      _onMouseMove = _useCanvas.onMouseMove,
      onMouseClick = _useCanvas.onMouseClick,
      setDragging = _useCanvas.setDragging,
      dragging = _useCanvas.dragging,
      selectMode = _useCanvas.selectMode;

  var _useRectSelection = (0, _useRectSelection2.default)(selectElement),
      setRectSelectionRef = _useRectSelection.setRectSelectionRef,
      rectSelectionHandleTouchStart = _useRectSelection.rectSelectionHandleTouchStart,
      rectSelectionHandleTouchMove = _useRectSelection.rectSelectionHandleTouchMove,
      rectSelectionHandleTouchEnd = _useRectSelection.rectSelectionHandleTouchEnd;

  var activeLayersOrder = Array.from(layersOrder);

  if (selectedLayerName && selectedLayerName.length) {
    activeLayersOrder.splice(activeLayersOrder.indexOf(selectedLayerName), 1);
    activeLayersOrder.push(selectedLayerName);
  }

  if (!canvasDimension || !canvasDimension.width || !canvasDimension.height) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactKonva.Stage, {
    ref: function ref(_ref3) {
      return setStageRef(_ref3);
    },
    width: canvasDimension.width,
    height: canvasDimension.height,
    onClick: onMouseClick,
    className: classes.content,
    onMouseDown: function onMouseDown(e) {
      // deselect when clicked on empty area
      var clickedOnEmpty = e.target === e.target.getStage();

      if (clickedOnEmpty) {
        selectElement('', '', 'reset');
      }

      rectSelectionHandleTouchStart(e);
    },
    onMouseMove: function onMouseMove(e) {
      _onMouseMove(e);

      rectSelectionHandleTouchMove(e);
    },
    onMouseUp: function onMouseUp(e) {
      rectSelectionHandleTouchEnd();
    },
    onTouchStart: function onTouchStart(e) {
      console.log("onTouchStart");
      rectSelectionHandleTouchStart(e);
    },
    onTouchMove: function onTouchMove(e) {
      console.log("onTouchMove");
      rectSelectionHandleTouchMove(e);
    },
    onTouchEnd: function onTouchEnd(e) {
      console.log("onTouchEnd");
      rectSelectionHandleTouchEnd();
    },
    draggable: !selectMode,
    scaleX: scale,
    scaleY: scale,
    x: canvasOrigin.x,
    y: canvasOrigin.y
  }, /*#__PURE__*/_react.default.createElement(_reactKonva.Layer, {
    id: "layers"
  }, layers ? activeLayersOrder.map(function (layerName) {
    return /*#__PURE__*/_react.default.createElement(_reactKonva.Group, {
      key: layerName,
      id: layerName
    }, Object.keys(layers[layerName]).map(function (index) {
      var solarElement = layers[layerName][index];
      return /*#__PURE__*/_react.default.createElement(_TransformableElement.default, {
        key: solarElement.id,
        id: solarElement.id,
        layer: layerName,
        shapeType: solarElement.shape.type,
        version: solarElement.shape.version,
        isSelected: selectedElementIds.includes(solarElement.id),
        onSelect: selectElement,
        onStartChange: onStartChange,
        onChange: onChangeElementParams,
        onRotate: onRotateElement,
        onFinishChange: onFinishChange,
        onMoveStart: onMoveStart,
        onMove: onMoveElement,
        onMoveEnd: onMoveEnd,
        visible: solarElement.shape.visible,
        locked: solarElement.shape.locked,
        deleteDraggablePointMode: deleteDraggablePointMode,
        resizeEnabled: _polygons.availableTypesForResizing.includes(solarElement.type),
        setDragging: setDragging,
        multiple: selectedElementIds.length > 1,
        active: !!solarElement.active,
        selectMode: selectMode
      }, /*#__PURE__*/_react.default.createElement(_ShapeElement.default, _extends({
        id: solarElement.id
      }, solarElement.shape, {
        solarType: solarElement.type
      })));
    }));
  }) : null, /*#__PURE__*/_react.default.createElement(_reactKonva.Transformer, {
    ref: transformerRef,
    resizeEnabled: false,
    rotateEnabled: selectedElementIds.length === 1,
    ignoreStroke: true,
    borderEnabled: true,
    borderDash: [5, 2]
  }, selectedElementIds.length === 1 ? transformerRotationIcons.map(function (icon) {
    return /*#__PURE__*/_react.default.createElement(_RotationArrowIconButton.default, {
      key: icon.position,
      x: icon.x,
      y: icon.y,
      type: icon.type,
      rotation: icon.rotation,
      position: icon.position,
      onClick: transformerRotateElements90Degrees,
      invisible: dragging
    });
  }) : null), /*#__PURE__*/_react.default.createElement(_reactKonva.Rect, {
    ref: function ref(_ref2) {
      return setRectSelectionRef(_ref2);
    },
    fill: "rgba(5, 102, 173, 0.5)",
    draggable: false
  })), newDraggablePointMode && mousePosition ? /*#__PURE__*/_react.default.createElement(_reactKonva.Layer, {
    id: "new-draggable-point-mode"
  }, /*#__PURE__*/_react.default.createElement(_NewDraggablePoint.default, {
    newDraggablePointMode: newDraggablePointMode,
    mousePosition: mousePosition
  })) : null);
};

var _default = /*#__PURE__*/_react.default.memo(Canvas);

exports.default = _default;