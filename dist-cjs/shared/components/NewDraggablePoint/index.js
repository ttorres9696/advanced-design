"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactKonva = require("react-konva");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var NewDraggablePoint = function NewDraggablePoint(_ref) {
  var newDraggablePointMode = _ref.newDraggablePointMode,
      mousePosition = _ref.mousePosition;
  var shapeRef = (0, _react.useRef)();

  if (!newDraggablePointMode || !mousePosition) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactKonva.Circle, {
    ref: shapeRef,
    x: mousePosition.x,
    y: mousePosition.y,
    radius: 5,
    strokeWidth: 0.5,
    tension: 0,
    stroke: "#2db1ff",
    fill: "#fff",
    opacity: 1,
    draggable: true
  });
};

var _default = /*#__PURE__*/_react.default.memo(NewDraggablePoint);

exports.default = _default;