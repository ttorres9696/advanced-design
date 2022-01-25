"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _useProduction = _interopRequireDefault(require("../../shared/hooks/useProduction"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _DeleteElementConfirmationDialog = _interopRequireDefault(require("./DeleteElementConfirmationDialog"));

var _FloatMenu = _interopRequireDefault(require("./FloatMenu"));

var _PreLoading = _interopRequireDefault(require("./PreLoading"));

var _styles = _interopRequireDefault(require("./styles"));

var _useDashboard2 = _interopRequireDefault(require("./useDashboard"));

var _ZoomController = _interopRequireDefault(require("./ZoomController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Dashboard = function Dashboard(_ref) {
  var solarDesign = _ref.solarDesign,
      onProductionChange = _ref.onProductionChange;
  var classes = (0, _styles.default)();

  var parentBoxRef = _react.default.useRef();

  var windowDimension = (0, _reactRedux.useSelector)(function (state) {
    return state.core.windowDimension;
  });

  var _useState = (0, _react.useState)({
    width: 0,
    height: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimension = _useState2[0],
      setDimension = _useState2[1];

  var _useDashboard = (0, _useDashboard2.default)(),
      isDeleteDialogOpen = _useDashboard.isDeleteDialogOpen,
      onDeleteConfirm = _useDashboard.onDeleteConfirm,
      multiple = _useDashboard.multiple,
      preLoading = _useDashboard.preLoading;

  (0, _useProduction.default)({
    onProductionChange: onProductionChange
  });
  var onWindowResize = (0, _react.useCallback)(function () {
    if (parentBoxRef === undefined || parentBoxRef.current === undefined) {
      return;
    } // @ts-ignore


    var rect = parentBoxRef.current.getBoundingClientRect();
    var newWidth = rect.width;
    var newHeight = rect.height;

    if (dimension.width !== newWidth || dimension.height !== newHeight) {
      setDimension({
        width: newWidth,
        height: newHeight
      });
    }
  }, [dimension, parentBoxRef, windowDimension]);
  (0, _react.useEffect)(function () {
    if (windowDimension) {
      onWindowResize();
    }
  }, [parentBoxRef, windowDimension, onWindowResize, preLoading]);

  if (preLoading) {
    return /*#__PURE__*/_react.default.createElement(_PreLoading.default, null);
  }

  return (
    /*#__PURE__*/
    // @ts-ignore
    _react.default.createElement(_core.Box, {
      className: classes.root,
      ref: parentBoxRef
    }, /*#__PURE__*/_react.default.createElement(_Canvas.default, {
      solarDesign: solarDesign,
      canvasDimension: dimension
    }), /*#__PURE__*/_react.default.createElement(_FloatMenu.default, null), /*#__PURE__*/_react.default.createElement(_ZoomController.default, null), /*#__PURE__*/_react.default.createElement(_DeleteElementConfirmationDialog.default, {
      open: isDeleteDialogOpen,
      callback: onDeleteConfirm,
      multiple: multiple
    }))
  );
};

var _default = Dashboard;
exports.default = _default;