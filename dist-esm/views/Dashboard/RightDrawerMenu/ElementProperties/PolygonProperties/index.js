"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _decimal = require("decimal.js");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _ = require("..");

var _actions = require("../../../../../redux/canvas/actions");

var _types = require("../../../../../redux/stage/types");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PolygonProperties = function PolygonProperties(_ref) {
  var points = _ref.points,
      updateShapeProperty = _ref.updateShapeProperty,
      deletePoint = _ref.deletePoint;
  var classes = (0, _styles.default)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var newDraggablePointMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.newDraggablePointMode;
  });
  var deleteDraggablePointMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.deleteDraggablePointMode;
  });
  var updatePoint = (0, _react.useCallback)(function (pointIndex, coordIndex, value) {
    if (points && points[pointIndex][coordIndex] !== value) {
      var updatedPoints = Array.from(points);
      updatedPoints[pointIndex][coordIndex] = value;
      updateShapeProperty('points', updatedPoints);
    }
  }, [points, updateShapeProperty]);
  var onDeleteClick = (0, _react.useCallback)(function (pointIndex) {
    return deletePoint(pointIndex);
  }, [deletePoint]);
  var onToggleNewDraggablePointMode = (0, _react.useCallback)(function () {
    dispatch((0, _actions.setNewDraggablePointMode)(!newDraggablePointMode));
    dispatch((0, _actions.setDeleteDraggablePointMode)(false));
  }, [dispatch, newDraggablePointMode]);
  var onToggleDeleteDraggablePointMode = (0, _react.useCallback)(function () {
    dispatch((0, _actions.setDeleteDraggablePointMode)(!deleteDraggablePointMode));
    dispatch((0, _actions.setNewDraggablePointMode)(false));
  }, [dispatch, deleteDraggablePointMode]);
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    container: true,
    xs: 12,
    spacing: 2,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    direction: "row",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline"
  }, "Points")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6,
    className: classes.paddingRight
  }, newDraggablePointMode ? /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_icons.Cancel, null),
    fullWidth: true,
    className: classes.cancelButton,
    onClick: onToggleNewDraggablePointMode,
    size: "small"
  }, "Cancel") : /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "outlined",
    color: "primary",
    startIcon: /*#__PURE__*/_react.default.createElement(_icons.GpsFixed, null),
    fullWidth: true,
    onClick: onToggleNewDraggablePointMode,
    size: "small"
  }, "Add")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6,
    className: classes.paddingLeft
  }, deleteDraggablePointMode ? /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_icons.Cancel, null),
    fullWidth: true,
    className: classes.cancelButton,
    onClick: onToggleDeleteDraggablePointMode,
    size: "small"
  }, "Cancel") : /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "outlined",
    color: "secondary",
    startIcon: /*#__PURE__*/_react.default.createElement(_icons.GpsFixed, null),
    fullWidth: true,
    onClick: onToggleDeleteDraggablePointMode,
    size: "small"
  }, "Delete"))), points && (0, _lodash.isArray)(points) ? points.map(function (point, pointIndex) {
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      key: pointIndex,
      item: true,
      container: true,
      xs: 12,
      spacing: 1,
      direction: "row",
      alignItems: "center"
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true
    }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
      variant: "caption"
    }, pointIndex + 1)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: true
    }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
      id: "point-x-".concat(pointIndex),
      label: "X",
      fullWidth: true,
      value: new _decimal.Decimal(point[0]).dividedBy(_types.defaultMultiplierScale).toNumber(),
      type: "tel",
      onChange: function onChange(event) {
        updatePoint(pointIndex, 0, new _decimal.Decimal(event.target.value).mul(_types.defaultMultiplierScale).toNumber());
      },
      InputProps: {
        inputComponent: _.AllowNegativeNumberFormatInput
      }
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: true
    }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
      id: "point-y-".concat(pointIndex),
      label: "Y",
      fullWidth: true,
      value: new _decimal.Decimal(point[1]).dividedBy(_types.defaultMultiplierScale).toNumber(),
      type: "tel",
      onChange: function onChange(event) {
        updatePoint(pointIndex, 1, new _decimal.Decimal(event.target.value).mul(_types.defaultMultiplierScale).toNumber());
      },
      InputProps: {
        inputComponent: _.AllowNegativeNumberFormatInput
      }
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true
    }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      "aria-label": "delete",
      size: "small",
      onClick: function onClick() {
        onDeleteClick(pointIndex);
      }
    }, /*#__PURE__*/_react.default.createElement(_icons.Delete, {
      fontSize: "small"
    }))));
  }) : null);
};

var _default = /*#__PURE__*/_react.default.memo(PolygonProperties);

exports.default = _default;