"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _enzyme = require("enzyme");

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _state = _interopRequireWildcard(require("../../../../../redux/specs/mocks/state.mock"));

var _ = _interopRequireDefault(require("."));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper;
beforeEach(function () {
  var props = {
    points: _state.mockSolarElement.shape.points,
    updateShapeProperty: function updateShapeProperty(attr, value) {},
    deletePoint: function deletePoint(index) {}
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _state.default
  }, /*#__PURE__*/_react.default.createElement(_.default, props)), {});
});
describe('PolygonProperties', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});