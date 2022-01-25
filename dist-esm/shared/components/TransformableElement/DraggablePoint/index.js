"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _red = _interopRequireDefault(require("@material-ui/core/colors/red"));

var _react = _interopRequireWildcard(require("react"));

var _reactKonva = require("react-konva");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DraggablePoint = function DraggablePoint(_ref) {
  var x = _ref.x,
      y = _ref.y,
      position = _ref.position,
      onStart = _ref.onStart,
      onChange = _ref.onChange,
      onEnd = _ref.onEnd,
      onClick = _ref.onClick,
      deleteDraggablePointMode = _ref.deleteDraggablePointMode,
      invisible = _ref.invisible;
  var shapeRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      mouseOver = _useState2[0],
      setMouseOver = _useState2[1];

  var onDragStart = (0, _react.useCallback)(function (e) {
    return onStart();
  }, [onStart]);
  var onDragMove = (0, _react.useCallback)(function (e) {
    var node = shapeRef.current;
    onChange(node.x(), node.y(), position);
  }, [onChange, shapeRef, position]);
  var onDragEnd = (0, _react.useCallback)(function (e) {
    var node = shapeRef.current;
    onEnd(node.x(), node.y(), position);
  }, [onEnd, shapeRef, position]);
  var onClickPoint = (0, _react.useCallback)(function (e) {
    return onClick(position);
  }, [onClick, position]);
  var onMouseOver = (0, _react.useCallback)(function (e) {
    if (deleteDraggablePointMode) {
      setMouseOver(true);
    }
  }, [deleteDraggablePointMode, setMouseOver]);
  var onMouseOut = (0, _react.useCallback)(function (e) {
    return setMouseOver(false);
  }, [setMouseOver]);
  var onMouseEnter = (0, _react.useCallback)(function () {
    if (shapeRef && shapeRef.current) {
      var node = shapeRef.current;
      var stage = node.getStage();

      if (stage) {
        stage.container().style.cursor = deleteDraggablePointMode ? 'pointer' : 'move';
      }
    }
  }, [shapeRef, deleteDraggablePointMode]);
  var onMouseLeave = (0, _react.useCallback)(function () {
    if (shapeRef && shapeRef.current) {
      var node = shapeRef.current;
      var stage = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'default';
      }
    }
  }, [shapeRef]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactKonva.Circle, {
    ref: shapeRef,
    x: x,
    y: y,
    radius: deleteDraggablePointMode && mouseOver ? 7 : 5,
    strokeWidth: 0.5,
    tension: 0,
    stroke: deleteDraggablePointMode && mouseOver ? _red.default[500] : '#2db1ff',
    fill: deleteDraggablePointMode && mouseOver ? _red.default[50] : '#fff',
    opacity: 1,
    draggable: !deleteDraggablePointMode,
    onDragStart: onDragStart,
    onDragMove: onDragMove,
    onDragEnd: onDragEnd,
    onClick: onClickPoint,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    visible: !invisible
  }));
};

var _default = /*#__PURE__*/_react.default.memo(DraggablePoint);

exports.default = _default;