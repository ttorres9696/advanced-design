"use strict";

var _enzyme = require("enzyme");

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _react = _interopRequireDefault(require("react"));

var _reactKonva = require("react-konva");

var _reactRedux = require("react-redux");

var _state = _interopRequireDefault(require("../../../redux/specs/mocks/state.mock"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper;
beforeEach(function () {
  var props = {
    mousePosition: {
      x: 0,
      y: 0
    },
    newDraggablePointMode: true
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _state.default
  }, /*#__PURE__*/_react.default.createElement(_reactKonva.Stage, null, /*#__PURE__*/_react.default.createElement(_reactKonva.Layer, null, /*#__PURE__*/_react.default.createElement(_.default, props)))), {});
});
describe('NewDraggablePoint', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});