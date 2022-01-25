"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _clsx3 = _interopRequireDefault(require("clsx"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../redux/canvas/actions");

var _actions2 = require("../../../redux/stage/actions");

var _helpers = require("../../../redux/stage/helpers");

var _polygons = require("../../helpers/polygons.helper");

var _styles = _interopRequireDefault(require("./styles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawerListItem = function DrawerListItem(_ref) {
  var id = _ref.id,
      icon = _ref.icon,
      label = _ref.label,
      selected = _ref.selected,
      action = _ref.action,
      expanded = _ref.expanded,
      subItems = _ref.subItems,
      isSubItem = _ref.isSubItem,
      parentId = _ref.parentId,
      visible = _ref.visible,
      locked = _ref.locked;
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var selectedLayerName = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedLayerName;
  });
  var selectedShapeElementIds = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedShapeElementIds;
  });
  var onClick = (0, _react.useCallback)(function (e) {
    if (action) {
      action(id, parentId || '', e.ctrlKey || e.metaKey ? 'add' : 'reset');
    }
  }, [id, parentId, action]);
  var onVisibilityClick = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch((0, _actions2.toggleVisibility)({
      layer: parentId || '',
      id: id
    }));

    if (!!selected) {
      selectedShapeElementIds.forEach(function (elementId) {
        dispatch((0, _actions2.setSelectedElement)(selectedLayerName, elementId, false));
      });
      dispatch((0, _actions.selectShape)('', '', 'reset'));
    }
  }, [dispatch, id, parentId, selected, selectedLayerName, selectedShapeElementIds]);
  var onLockClick = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch((0, _actions2.toggleLock)({
      layer: parentId || '',
      id: id
    }));

    if (!!selected) {
      selectedShapeElementIds.forEach(function (elementId) {
        dispatch((0, _actions2.setSelectedElement)(selectedLayerName, elementId, false));
      });
      dispatch((0, _actions.selectShape)('', '', 'reset'));
    }
  }, [dispatch, id, parentId, selected, selectedLayerName, selectedShapeElementIds]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    button: true,
    onClick: onClick,
    selected: !!selected,
    className: (0, _clsx3.default)(_defineProperty({}, classes.subItem, isSubItem)),
    classes: {
      selected: (0, _clsx3.default)(_defineProperty({}, classes.selectedWithSubList, subItems && subItems.length))
    }
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemIcon, null, icon), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: label
  }), subItems && subItems.length ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, expanded ? /*#__PURE__*/_react.default.createElement(_icons.ExpandLess, null) : /*#__PURE__*/_react.default.createElement(_icons.ExpandMore, null)) : null, !(0, _lodash.isNil)(visible) ? /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    onClick: onVisibilityClick
  }, visible ? /*#__PURE__*/_react.default.createElement(_icons.Visibility, null) : /*#__PURE__*/_react.default.createElement(_icons.VisibilityOff, null)) : null, !(0, _lodash.isNil)(locked) ? /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    onClick: onLockClick,
    disabled: _polygons.lockedTypes.includes((0, _helpers.getRespectiveLayerSolarType)(parentId))
  }, !locked ? /*#__PURE__*/_react.default.createElement(_icons.LockOpen, null) : /*#__PURE__*/_react.default.createElement(_icons.Lock, null)) : null), subItems && subItems.length ? /*#__PURE__*/_react.default.createElement(_core.Collapse, {
    in: expanded,
    timeout: "auto",
    unmountOnExit: true,
    className: classes.subList
  }, /*#__PURE__*/_react.default.createElement(_core.List, {
    component: "div",
    disablePadding: true
  }, subItems.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(DrawerListItem, _extends({
      key: item.id
    }, item, {
      isSubItem: true,
      parentId: id
    }));
  }))) : null);
};

var _default = /*#__PURE__*/_react.default.memo(DrawerListItem);

exports.default = _default;