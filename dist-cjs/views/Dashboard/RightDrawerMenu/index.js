"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _clsx3 = _interopRequireDefault(require("clsx"));

var _react = _interopRequireDefault(require("react"));

var _DeleteButton = _interopRequireDefault(require("../../../shared/components/DeleteButton"));

var _DrawerListItem = _interopRequireDefault(require("../../../shared/components/DrawerListItem"));

var _MagnetModeCheckbox = _interopRequireDefault(require("./MagnetModeCheckbox"));

var _styles = _interopRequireDefault(require("./styles"));

var _useRightDrawerMenu2 = _interopRequireDefault(require("./useRightDrawerMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RightDrawerMenu = function RightDrawerMenu(_ref) {
  var _clsx, _clsx2;

  var opened = _ref.opened;
  var classes = (0, _styles.default)();

  var _useRightDrawerMenu = (0, _useRightDrawerMenu2.default)(),
      listItems = _useRightDrawerMenu.listItems;

  return /*#__PURE__*/_react.default.createElement(_core.Drawer, {
    variant: "permanent",
    className: (0, _clsx3.default)(classes.drawer, (_clsx = {}, _defineProperty(_clsx, classes.drawerOpened, opened), _defineProperty(_clsx, classes.drawerClosed, !opened), _clsx)),
    classes: {
      paper: (0, _clsx3.default)((_clsx2 = {}, _defineProperty(_clsx2, classes.drawerOpened, opened), _defineProperty(_clsx2, classes.drawerClosed, !opened), _clsx2))
    },
    open: opened,
    anchor: "right"
  }, /*#__PURE__*/_react.default.createElement(_core.List, null, /*#__PURE__*/_react.default.createElement(_MagnetModeCheckbox.default, {
    mode: opened ? 'full' : 'only-button'
  }), /*#__PURE__*/_react.default.createElement(_core.ListItem, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, null)))), listItems.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_DrawerListItem.default, _extends({
      key: item.id
    }, item));
  })));
};

var _default = /*#__PURE__*/_react.default.memo(RightDrawerMenu);

exports.default = _default;