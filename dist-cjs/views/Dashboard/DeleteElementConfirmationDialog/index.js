"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DeleteElementConfirmationDialog = function DeleteElementConfirmationDialog(_ref) {
  var open = _ref.open,
      callback = _ref.callback,
      multiple = _ref.multiple;
  var onConfirm = (0, _react.useCallback)(function (confirmed) {
    return callback(confirmed);
  }, [callback]);
  return /*#__PURE__*/_react.default.createElement(_core.Dialog, {
    onClose: function onClose() {
      onConfirm(false);
    },
    "aria-labelledby": "delete-element-confirmation-dialog-title",
    "aria-describedby": "delete-element-confirmation-dialog-description",
    open: open
  }, /*#__PURE__*/_react.default.createElement(_core.DialogTitle, {
    id: "delete-element-confirmation-dialog-title"
  }, "Delete Confirmation"), /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, /*#__PURE__*/_react.default.createElement(_core.DialogContentText, {
    id: "delete-element-confirmation-dialog-description"
  }, "Are you sure want to delete ", multiple && 'these elements' || 'this element', "?")), /*#__PURE__*/_react.default.createElement(_core.DialogActions, null, /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: function onClick() {
      onConfirm(false);
    },
    color: "primary"
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: function onClick() {
      onConfirm(true);
    },
    color: "primary"
  }, "Confirm")));
};

var _default = /*#__PURE__*/_react.default.memo(DeleteElementConfirmationDialog);

exports.default = _default;