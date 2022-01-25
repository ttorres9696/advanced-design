"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactKonva = require("react-konva");

var _redoBlack = require("../../../assets/redoBlack");

var _undoBlack = require("../../../assets/undoBlack");

var _types = require("./types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RotationArrowIconButton = function RotationArrowIconButton(_ref) {
  var x = _ref.x,
      y = _ref.y,
      position = _ref.position,
      onClick = _ref.onClick,
      type = _ref.type,
      rotation = _ref.rotation,
      invisible = _ref.invisible;
  var shapeRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      mouseOver = _useState2[0],
      setMouseOver = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      icon = _useState4[0],
      setIcon = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loadedIcon = _useState6[0],
      setLoadedIcon = _useState6[1];

  var onClickIcon = (0, _react.useCallback)(function (e) {
    return onClick(position);
  }, [onClick, position]);
  var onMouseOver = (0, _react.useCallback)(function (e) {
    setMouseOver(true);
  }, [setMouseOver]);
  var onMouseOut = (0, _react.useCallback)(function (e) {
    return setMouseOver(false);
  }, [setMouseOver]);
  var onMouseEnter = (0, _react.useCallback)(function () {
    if (shapeRef && shapeRef.current) {
      var node = shapeRef.current;
      var stage = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'pointer';
      }
    }
  }, [shapeRef]);
  var onMouseLeave = (0, _react.useCallback)(function () {
    if (shapeRef && shapeRef.current) {
      var node = shapeRef.current;
      var stage = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'default';
      }
    }
  }, [shapeRef]);
  var handleImageLoad = (0, _react.useCallback)(function () {
    setLoadedIcon(true);
  }, [setLoadedIcon]);
  (0, _react.useEffect)(function () {
    if (!icon) {
      var image = new window.Image();
      image.src = type === 'left' ? _undoBlack.undoBlack : _redoBlack.redoBlack;
      image.addEventListener('load', handleImageLoad);
      setIcon(image);
    }
  }, [icon, setIcon, _redoBlack.redoBlack, _undoBlack.undoBlack, handleImageLoad]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, loadedIcon ? /*#__PURE__*/_react.default.createElement(_reactKonva.Image, {
    ref: shapeRef,
    image: icon,
    x: x,
    y: y,
    width: _types.RotationIconSize,
    height: _types.RotationIconSize,
    tension: 0,
    opacity: mouseOver ? 1 : 0.5,
    draggable: false,
    rotation: rotation,
    onClick: onClickIcon,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    visible: !invisible
  }) : null);
};

var _default = /*#__PURE__*/_react.default.memo(RotationArrowIconButton);

exports.default = _default;