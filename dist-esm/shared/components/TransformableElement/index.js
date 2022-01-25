"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _DraggablePoint = _interopRequireDefault(require("./DraggablePoint"));

var _useTransformableElement = _interopRequireDefault(require("./useTransformableElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var OPACITY_SELECTED = 0.7;
var OPACITY_NOT_SELECTED = 0.5;
var OPACITY_NOT_VISIBLE = 0;
var OPACITY_INACTIVE_MODULE = 0.3;
var OPACITY_INACTIVE_MODULE_IN_SELECT_MODE = 0.1;

var TransformableElement = function TransformableElement(_ref) {
  var id = _ref.id,
      layer = _ref.layer,
      children = _ref.children,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect,
      onStartChange = _ref.onStartChange,
      onChange = _ref.onChange,
      onRotate = _ref.onRotate,
      onFinishChange = _ref.onFinishChange,
      onMoveStart = _ref.onMoveStart,
      onMove = _ref.onMove,
      onMoveEnd = _ref.onMoveEnd,
      visible = _ref.visible,
      locked = _ref.locked,
      resizeEnabled = _ref.resizeEnabled,
      shapeType = _ref.shapeType,
      version = _ref.version,
      deleteDraggablePointMode = _ref.deleteDraggablePointMode,
      setDragging = _ref.setDragging,
      multiple = _ref.multiple,
      active = _ref.active,
      selectMode = _ref.selectMode;

  var _useTransformableElem = (0, _useTransformableElement.default)({
    id: id,
    layer: layer,
    onStartChange: onStartChange,
    onChange: onChange,
    onFinishChange: onFinishChange,
    onRotate: onRotate,
    setDragging: setDragging,
    version: version,
    deleteDraggablePointMode: deleteDraggablePointMode,
    onMoveStart: onMoveStart,
    onMove: onMove,
    onMoveEnd: onMoveEnd,
    onSelect: onSelect,
    visible: visible,
    locked: locked,
    multiple: multiple,
    selectMode: selectMode
  }),
      shapeRef = _useTransformableElem.shapeRef,
      onDragStart = _useTransformableElem.onDragStart,
      onDragMove = _useTransformableElem.onDragMove,
      onDragEnd = _useTransformableElem.onDragEnd,
      onCircleTransformStart = _useTransformableElem.onCircleTransformStart,
      onCircleTransformEnd = _useTransformableElem.onCircleTransformEnd,
      onPolygonTransformStart = _useTransformableElem.onPolygonTransformStart,
      onPolygonTransformEnd = _useTransformableElem.onPolygonTransformEnd,
      onPolygonChangePointStart = _useTransformableElem.onPolygonChangePointStart,
      onPolygonChangePoint = _useTransformableElem.onPolygonChangePoint,
      onPolygonChangePointEnd = _useTransformableElem.onPolygonChangePointEnd,
      onPolygonClickPoint = _useTransformableElem.onPolygonClickPoint,
      draggablePoints = _useTransformableElem.draggablePoints,
      inDragMode = _useTransformableElem.inDragMode,
      handleOnClickElement = _useTransformableElem.handleOnClickElement,
      onMouseEnter = _useTransformableElem.onMouseEnter,
      onMouseLeave = _useTransformableElem.onMouseLeave;

  var draggable = visible && !locked;
  var transformable = isSelected && visible && !locked;
  var opacity = isSelected && visible ? OPACITY_SELECTED : !visible ? OPACITY_NOT_VISIBLE : OPACITY_NOT_SELECTED;

  if (layer === 'modules' && !active) {
    draggable = false;
    transformable = false;
    opacity = selectMode ? OPACITY_INACTIVE_MODULE_IN_SELECT_MODE : OPACITY_INACTIVE_MODULE;
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _react.Children.map(children, function (child) {
    return /*#__PURE__*/(0, _react.cloneElement)(child, {
      ref: shapeRef,
      draggable: draggable,
      onClick: handleOnClickElement,
      onDragStart: onDragStart,
      onDragMove: onDragMove,
      onDragEnd: onDragEnd,
      onCircleTransformStart: onCircleTransformStart,
      onCircleTransformEnd: onCircleTransformEnd,
      onPolygonTransformStart: onPolygonTransformStart,
      onPolygonTransformEnd: onPolygonTransformEnd,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      opacity: opacity
    });
  }), transformable ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, resizeEnabled && shapeType !== 'circle' && shapeRef && shapeRef.current ? draggablePoints.map(function (draggablePoint) {
    return /*#__PURE__*/_react.default.createElement(_DraggablePoint.default, {
      key: draggablePoint.position,
      x: draggablePoint.x,
      y: draggablePoint.y,
      position: draggablePoint.position,
      onStart: onPolygonChangePointStart,
      onChange: onPolygonChangePoint,
      onEnd: onPolygonChangePointEnd,
      onClick: onPolygonClickPoint,
      deleteDraggablePointMode: deleteDraggablePointMode,
      invisible: inDragMode
    });
  }) : null) : null);
};

var _default = /*#__PURE__*/_react.default.memo(TransformableElement);

exports.default = _default;