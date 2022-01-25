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
    x: 100,
    y: 100,
    position: 0,
    onClick: function onClick(position) {},
    type: 'left',
    rotation: 0
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactKonva.Stage, null, /*#__PURE__*/_react.default.createElement(_reactKonva.Layer, null, /*#__PURE__*/_react.default.createElement(_.default, props))), {});
});
describe('RotationArrowIconButton', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});