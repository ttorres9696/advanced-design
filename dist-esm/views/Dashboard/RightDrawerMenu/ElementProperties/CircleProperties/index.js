"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _decimal = require("decimal.js");

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

var _types = require("../../../../../redux/stage/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CircleProperties = function CircleProperties(_ref) {
  var x = _ref.x,
      y = _ref.y,
      radius = _ref.radius,
      updateShapeProperty = _ref.updateShapeProperty;
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    container: true,
    xs: 12,
    spacing: 2,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline"
  }, "Center")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    container: true,
    xs: 12,
    spacing: 2,
    direction: "row"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    id: "center-x-edit",
    label: "X",
    fullWidth: true,
    value: x ? new _decimal.Decimal(x).dividedBy(_types.defaultMultiplierScale).toNumber() : '',
    type: "tel",
    onChange: function onChange(event) {
      updateShapeProperty('x', new _decimal.Decimal(event.target.value).mul(_types.defaultMultiplierScale).toNumber());
    },
    InputProps: {
      inputComponent: _.AllowNegativeNumberFormatInput
    }
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    id: "center-y-edit",
    label: "Y",
    fullWidth: true,
    value: y ? new _decimal.Decimal(y).dividedBy(_types.defaultMultiplierScale).toNumber() : '',
    type: "tel",
    onChange: function onChange(event) {
      updateShapeProperty('y', new _decimal.Decimal(event.target.value).mul(_types.defaultMultiplierScale).toNumber());
    },
    InputProps: {
      inputComponent: _.AllowNegativeNumberFormatInput
    }
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    id: "radius-edit",
    label: "Radius",
    fullWidth: true,
    value: radius || '',
    type: "tel",
    onChange: function onChange(event) {
      updateShapeProperty('radius', parseFloat(event.target.value));
    },
    InputProps: {
      inputComponent: _.NumberFormatInput
    }
  })));
};

var _default = /*#__PURE__*/_react.default.memo(CircleProperties);

exports.default = _default;