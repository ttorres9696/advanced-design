"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _clsx2 = _interopRequireDefault(require("clsx"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../redux/core/actions");

var _styles = _interopRequireDefault(require("./styles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PreLoading = function PreLoading() {
  var _clsx;

  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var cancelledPreLoading = (0, _reactRedux.useSelector)(function (state) {
    return state.core.canceledPreLoading;
  });

  var _useState = (0, _react.useState)("LOADING INSTANT DESIGN..."),
      _useState2 = _slicedToArray(_useState, 2),
      message = _useState2[0],
      setMessage = _useState2[1];

  var handleClickCancelButton = (0, _react.useCallback)(function () {
    setMessage('INSTANT DESIGN CANCELLED');
    dispatch((0, _actions.cancelPreLoading)());
  }, [dispatch, setMessage]);
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: (0, _clsx2.default)(classes.img, (_clsx = {}, _defineProperty(_clsx, classes.loadingImg, !cancelledPreLoading), _defineProperty(_clsx, classes.cancelImg, cancelledPreLoading), _clsx))
  }), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline",
    gutterBottom: true,
    className: classes.loadingSubtitle
  }, message), !cancelledPreLoading ? /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline",
    className: classes.cancelButton,
    onClick: handleClickCancelButton
  }, "CANCEL") : null);
};

var _default = /*#__PURE__*/_react.default.memo(PreLoading);

exports.default = _default;