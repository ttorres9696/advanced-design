"use strict";

var _enzyme = require("enzyme");

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _solarDesign = _interopRequireDefault(require("../../../redux/specs/mocks/solarDesign.mock"));

var _state = _interopRequireDefault(require("../../../redux/specs/mocks/state.mock"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper;
beforeEach(function () {
  var props = {
    solarDesign: _solarDesign.default,
    canvasDimension: {
      width: 333,
      height: 222
    }
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _state.default
  }, /*#__PURE__*/_react.default.createElement(_.default, props)), {});
});
describe('Canvas', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});