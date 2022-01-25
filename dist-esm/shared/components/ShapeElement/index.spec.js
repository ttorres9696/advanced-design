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
    id: 'id',
    x: 0,
    y: 0,
    points: [[0, 0], [100, 0], [100, 100]],
    type: 'polygon',
    visible: true,
    locked: false,
    draggable: true,
    onClick: function onClick() {},
    onDragEnd: function onDragEnd(e) {},
    onDragStart: function onDragStart(e) {},
    opacity: 1,
    solarType: 'module'
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactKonva.Stage, null, /*#__PURE__*/_react.default.createElement(_reactKonva.Layer, null, /*#__PURE__*/_react.default.createElement(_.default, props))), {});
});
describe('ShapeElement', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});