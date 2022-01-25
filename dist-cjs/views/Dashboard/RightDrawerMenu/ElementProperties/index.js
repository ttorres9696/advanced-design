"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AllowNegativeNumberFormatInput = exports.NumberFormatInput = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactNumberFormat = _interopRequireDefault(require("react-number-format"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../redux/canvas/actions");

var _actions2 = require("../../../../redux/core/actions");

var _actions3 = require("../../../../redux/stage/actions");

var _helpers = require("../../../../redux/stage/helpers");

var _polygons = require("../../../../shared/helpers/polygons.helper");

var _useDebounce2 = _interopRequireDefault(require("../../../../shared/hooks/useDebounce"));

var _CircleProperties = _interopRequireDefault(require("./CircleProperties"));

var _GeneralProperties = _interopRequireDefault(require("./GeneralProperties"));

var _PolygonProperties = _interopRequireDefault(require("./PolygonProperties"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NumberFormatInput = function NumberFormatInput(props) {
  var inputRef = props.inputRef,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["inputRef", "onChange"]);

  return /*#__PURE__*/_react.default.createElement(_reactNumberFormat.default, _extends({}, other, {
    getInputRef: inputRef,
    onValueChange: function onValueChange(values) {
      onChange({
        target: {
          value: values.value
        }
      });
    },
    allowNegative: false
  }));
};

exports.NumberFormatInput = NumberFormatInput;

var AllowNegativeNumberFormatInput = function AllowNegativeNumberFormatInput(props) {
  var inputRef = props.inputRef,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["inputRef", "onChange"]);

  return /*#__PURE__*/_react.default.createElement(_reactNumberFormat.default, _extends({}, other, {
    getInputRef: inputRef,
    onValueChange: function onValueChange(values) {
      onChange({
        target: {
          value: values.value
        }
      });
    },
    allowNegative: true
  }));
};

exports.AllowNegativeNumberFormatInput = AllowNegativeNumberFormatInput;

var ElementProperties = function ElementProperties(_ref) {
  var solarElement = _ref.solarElement;
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      editionVersion = _useState4[0],
      setEditionVersion = _useState4[1];

  var _useDebounce = (0, _useDebounce2.default)(500, function (elementIds, layer, dispatch, finishHistoryItem) {
    if (elementIds && layer && dispatch && finishHistoryItem) {
      dispatch(finishHistoryItem(elementIds, layer));
    }
  }),
      debouncedFinishHistoryItem = _useDebounce.execute;

  var onClickHeader = (0, _react.useCallback)(function () {
    if (!!solarElement) {
      setExpanded(!expanded);
    }
  }, [solarElement, setExpanded, expanded]);
  var updateProperty = (0, _react.useCallback)(function (attr, value) {
    if (!!editionVersion && !(0, _lodash.isEqual)(editionVersion[attr], value)) {
      var layer = (0, _helpers.getSolarTypeLayer)(editionVersion.type);
      setEditionVersion(_objectSpread(_objectSpread({}, editionVersion), {}, _defineProperty({}, attr, value)));
      dispatch((0, _actions3.startHistoryItem)([editionVersion.id], layer));
      dispatch((0, _actions3.updateShape)(_objectSpread(_objectSpread({}, editionVersion), {}, _defineProperty({}, attr, value))));
      debouncedFinishHistoryItem([editionVersion.id], layer, dispatch, _actions3.finishHistoryItem);
    }
  }, [editionVersion, setEditionVersion, dispatch, debouncedFinishHistoryItem]);
  var updateShapeProperty = (0, _react.useCallback)(function (attr, value) {
    if (!!editionVersion && !(0, _lodash.isEqual)(editionVersion.shape[attr], value)) {
      var layer = (0, _helpers.getSolarTypeLayer)(editionVersion.type);
      setEditionVersion(_objectSpread(_objectSpread({}, editionVersion), {}, {
        shape: _objectSpread(_objectSpread({}, editionVersion.shape), {}, _defineProperty({}, attr, value))
      }));
      dispatch((0, _actions3.startHistoryItem)([editionVersion.id], layer));
      dispatch((0, _actions3.updateShape)(_objectSpread(_objectSpread({}, editionVersion), {}, {
        shape: _objectSpread(_objectSpread({}, editionVersion.shape), {}, _defineProperty({}, attr, value))
      })));
      debouncedFinishHistoryItem([editionVersion.id], layer, dispatch, _actions3.finishHistoryItem);
    }
  }, [editionVersion, setEditionVersion, dispatch, debouncedFinishHistoryItem]);
  var deletePoint = (0, _react.useCallback)(function (pointIndex) {
    if (!!editionVersion) {
      var layer = (0, _helpers.getSolarTypeLayer)(editionVersion.type);

      if (editionVersion.shape.points.length > 3) {
        dispatch((0, _actions3.startHistoryItem)([editionVersion.id], layer));
        dispatch((0, _actions3.removeDraggablePoint)(layer, editionVersion.id, pointIndex));
        dispatch((0, _actions3.finishHistoryItem)([editionVersion.id], layer));
        dispatch((0, _actions.setNewDraggablePointMode)(false));
        dispatch((0, _actions.setDeleteDraggablePointMode)(false));
      } else {
        dispatch((0, _actions2.setDeleteDialogParams)({
          elementIds: [editionVersion.id],
          layer: layer,
          open: true
        }));
      }
    }
  }, [dispatch, editionVersion]);
  var deleteObject = (0, _react.useCallback)(function () {
    if (!!editionVersion) {
      dispatch((0, _actions2.setDeleteDialogParams)({
        elementIds: [editionVersion.id],
        layer: (0, _helpers.getSolarTypeLayer)(editionVersion.type),
        open: true
      }));
    }
  }, [dispatch, editionVersion]);
  (0, _react.useEffect)(function () {
    if (!!solarElement && !editionVersion || !!solarElement && !!editionVersion && solarElement.id !== editionVersion.id || !!solarElement && !!editionVersion && solarElement.shape.version !== editionVersion.shape.version) {
      setEditionVersion((0, _lodash.cloneDeep)(solarElement));
    }
  }, [solarElement, editionVersion, setEditionVersion]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    button: true,
    onClick: onClickHeader
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_icons.ListAlt, null)), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: "Properties"
  }), !!solarElement ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, expanded ? /*#__PURE__*/_react.default.createElement(_icons.ExpandLess, null) : /*#__PURE__*/_react.default.createElement(_icons.ExpandMore, null)) : null), /*#__PURE__*/_react.default.createElement(_core.Collapse, {
    in: expanded && !!solarElement && !!editionVersion,
    timeout: "auto",
    unmountOnExit: true,
    className: classes.propertiesList
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_GeneralProperties.default, {
    azimuth: editionVersion && editionVersion.azimuth,
    tilt: editionVersion && editionVersion.tilt,
    updateProperty: updateProperty,
    deleteObject: deleteObject
  }), !!solarElement && !!editionVersion && _polygons.availableTypesForEditing.includes(editionVersion.type) ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, editionVersion.shape.type === 'circle' ? /*#__PURE__*/_react.default.createElement(_CircleProperties.default, {
    x: editionVersion.shape.x,
    y: editionVersion.shape.y,
    radius: editionVersion.shape.radius,
    updateShapeProperty: updateShapeProperty
  }) : /*#__PURE__*/_react.default.createElement(_PolygonProperties.default, {
    points: editionVersion.shape.points,
    updateShapeProperty: updateShapeProperty,
    deletePoint: deletePoint
  })) : null)));
};

var _default = /*#__PURE__*/_react.default.memo(ElementProperties);

exports.default = _default;