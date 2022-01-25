"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _clsx3 = _interopRequireDefault(require("clsx"));

var _react = _interopRequireDefault(require("react"));

var _DrawerListItem = _interopRequireDefault(require("../../../shared/components/DrawerListItem"));

var _DxfUpload = _interopRequireDefault(require("../../../shared/components/DxfUpload"));

var _styles = _interopRequireDefault(require("./styles"));

var _useLeftDrawerMenu2 = _interopRequireDefault(require("./useLeftDrawerMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LeftDrawerMenu = function LeftDrawerMenu(_ref) {
  var _clsx, _clsx2;

  var opened = _ref.opened;
  var classes = (0, _styles.default)();

  var _useLeftDrawerMenu = (0, _useLeftDrawerMenu2.default)(),
      listItems = _useLeftDrawerMenu.listItems,
      expandedItems = _useLeftDrawerMenu.expandedItems;

  return /*#__PURE__*/_react.default.createElement(_core.Drawer, {
    variant: "permanent",
    className: (0, _clsx3.default)(classes.drawer, (_clsx = {}, _defineProperty(_clsx, classes.drawerOpened, opened), _defineProperty(_clsx, classes.drawerClosed, !opened), _clsx)),
    classes: {
      paper: (0, _clsx3.default)((_clsx2 = {}, _defineProperty(_clsx2, classes.drawerOpened, opened), _defineProperty(_clsx2, classes.drawerClosed, !opened), _clsx2))
    },
    open: opened,
    anchor: "left"
  }, /*#__PURE__*/_react.default.createElement(_core.List, null, listItems.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_DrawerListItem.default, _extends({
      key: item.id,
      expanded: expandedItems.includes(item.id)
    }, item));
  })), opened ? /*#__PURE__*/_react.default.createElement(_DxfUpload.default, null) : null);
};

var _default = /*#__PURE__*/_react.default.memo(LeftDrawerMenu);

exports.default = _default;