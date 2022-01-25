"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _design = _interopRequireDefault(require("../../../redux/api/design"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DxfUpload = function DxfUpload() {
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var moduleSpecs = (0, _reactRedux.useSelector)(function (state) {
    return state.core.moduleSpecs;
  });

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      selectedModuleSpec = _useState2[0],
      setSelectedModuleSpec = _useState2[1];

  var upload = (0, _react.useCallback)(function (e) {
    return dispatch((0, _design.default)(e.target.files[0]));
  }, [dispatch]);

  var inputLabel = _react.default.useRef(null);

  var _React$useState = _react.default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      labelWidth = _React$useState2[0],
      setLabelWidth = _React$useState2[1];

  _react.default.useEffect(function () {
    if (inputLabel && inputLabel.current) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, [inputLabel]);

  var handleChange = (0, _react.useCallback)(function (event) {
    setSelectedModuleSpec(event.target.value);
  }, []);

  if (!moduleSpecs) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("form", {
    className: classes.form
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "dxf-upload-input",
    type: "file",
    onChange: upload,
    className: classes.uploadInput
  }), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement(_core.InputLabel, {
    ref: inputLabel,
    htmlFor: "module-spec-select"
  }, "Module Spec"), /*#__PURE__*/_react.default.createElement(_core.Select, {
    native: true,
    value: selectedModuleSpec,
    onChange: handleChange,
    labelWidth: labelWidth,
    inputProps: {
      name: 'module-spec',
      id: 'module-spec-select'
    },
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }), moduleSpecs ? moduleSpecs.map(function (moduleSpec) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: moduleSpec.name,
      value: moduleSpec.name
    }, moduleSpec.name);
  }) : null))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "dxf-upload-input"
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    component: "span",
    color: "primary",
    startIcon: /*#__PURE__*/_react.default.createElement(_icons.CloudUpload, null),
    fullWidth: true
  }, "DXF Upload")))));
};

var _default = /*#__PURE__*/_react.default.memo(DxfUpload);

exports.default = _default;