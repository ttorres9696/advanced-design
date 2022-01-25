"use strict";

var _enzyme = require("enzyme");

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _react = _interopRequireDefault(require("react"));

var _reactKonva = require("react-konva");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper;
beforeEach(function () {
  var props = {
    id: 'transformable-element-id',
    shapeType: 'polygon',
    layer: 'modules',
    version: 1,
    visible: true,
    locked: false,
    onSelect: function onSelect(id) {},
    isSelected: true,
    onChange: function onChange(id, layer, params) {},
    onStartChange: function onStartChange(id, layer) {},
    onRotate: function onRotate(id, layer, pointsRotationInRadians, points) {},
    onMove: function onMove(id, layer, node) {},
    onMoveStart: function onMoveStart(layer, node) {},
    onMoveEnd: function onMoveEnd(layer, node) {},
    onFinishChange: function onFinishChange(id, layer) {},
    deleteDraggablePointMode: false,
    multiple: false,
    setDragging: function setDragging(dragging) {},
    active: true,
    selectMode: true
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactKonva.Stage, null, /*#__PURE__*/_react.default.createElement(_reactKonva.Layer, null, /*#__PURE__*/_react.default.createElement(_.default, props, /*#__PURE__*/_react.default.createElement(_reactKonva.Line, {
    x: 20,
    y: 20,
    points: [0, 0, 100, 0, 100, 100],
    tension: 0,
    closed: true,
    stroke: "black",
    fill: "lightgray"
  })))), {});
});
describe('TransformableElement', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});