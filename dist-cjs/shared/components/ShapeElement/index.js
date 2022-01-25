"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactKonva = require("react-konva");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LineShape = /*#__PURE__*/_react.default.forwardRef(function (params, ref) {
  return /*#__PURE__*/_react.default.createElement(_reactKonva.Line, {
    ref: ref,
    id: params.id,
    name: params.name,
    x: params.x,
    y: params.y,
    strokeWidth: 0.5,
    points: (0, _lodash.flattenDeep)(params.points),
    tension: 0,
    closed: true,
    stroke: params.solarType === 'module' ? 'white' : 'black',
    fill: params.solarType === 'module' ? 'black' : 'lightgray',
    opacity: !(0, _lodash.isNil)(params.opacity) && !(0, _lodash.isNaN)(params.opacity) ? params.opacity : 1,
    draggable: params.draggable,
    onClick: params.onClick,
    onDragEnd: params.onDragEnd,
    onDragMove: params.onDragMove,
    onDragStart: params.onDragStart,
    onTransformStart: params.onPolygonTransformStart,
    onTransformEnd: params.onPolygonTransformEnd,
    onMouseEnter: params.onMouseEnter,
    onMouseLeave: params.onMouseLeave
  });
});

var CircularShape = /*#__PURE__*/_react.default.forwardRef(function (params, ref) {
  return /*#__PURE__*/_react.default.createElement(_reactKonva.Circle, {
    ref: ref,
    id: params.id,
    name: params.name,
    x: params.x,
    y: params.y,
    radius: params.radius,
    strokeWidth: 0.5,
    tension: 0,
    stroke: params.solarType === 'module' ? 'white' : 'black',
    fill: params.solarType === 'module' ? 'black' : 'lightgray',
    opacity: !(0, _lodash.isNil)(params.opacity) && !(0, _lodash.isNaN)(params.opacity) ? params.opacity : 1,
    draggable: params.draggable,
    onClick: params.onClick,
    onDragEnd: params.onDragEnd,
    onDragMove: params.onDragMove,
    onDragStart: params.onDragStart,
    onTransformStart: params.onCircleTransformStart,
    onTransformEnd: params.onCircleTransformEnd,
    onMouseEnter: params.onMouseEnter,
    onMouseLeave: params.onMouseLeave
  });
});

var ShapeElement = /*#__PURE__*/_react.default.forwardRef(function (params, ref) {
  switch (params.type) {
    case 'circle':
      return /*#__PURE__*/_react.default.createElement(CircularShape, _extends({}, params, {
        ref: ref
      }));

    default:
      return /*#__PURE__*/_react.default.createElement(LineShape, _extends({}, params, {
        ref: ref
      }));
  }
});

var _default = ShapeElement;
exports.default = _default;