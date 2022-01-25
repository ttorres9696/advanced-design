"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteObjectButton = function DeleteObjectButton(_ref) {
  var onDelete = _ref.onDelete,
      disabled = _ref.disabled,
      multiple = _ref.multiple;
  var classes = (0, _styles.default)();
  return /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_icons.Delete, null),
    fullWidth: true,
    className: classes.deleteButton,
    onClick: onDelete,
    size: "small",
    disabled: disabled
  }, "Delete Object", multiple && 's' || '');
};

var _default = /*#__PURE__*/_react.default.memo(DeleteObjectButton);

exports.default = _default;