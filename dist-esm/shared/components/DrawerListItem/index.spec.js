"use strict";

var _icons = require("@material-ui/icons");

var _enzyme = require("enzyme");

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _state = _interopRequireDefault(require("../../../redux/specs/mocks/state.mock"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper;
beforeEach(function () {
  var props = {
    id: 'elements',
    parentId: '',
    icon: /*#__PURE__*/_react.default.createElement(_icons.Folder, null),
    label: 'Elements',
    action: function action() {},
    expanded: true,
    visible: true,
    locked: false,
    subItems: [{
      id: 'tree',
      icon: /*#__PURE__*/_react.default.createElement(_icons.Nature, null),
      parentId: 'elements',
      label: 'Tree',
      action: function action() {},
      visible: true,
      locked: false
    }]
  };
  wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _state.default
  }, /*#__PURE__*/_react.default.createElement(_.default, props)), {});
});
describe('DrawerListItem', function () {
  it('renders correctly', function () {
    return expect((0, _enzymeToJson.default)(wrapper)).toMatchSnapshot();
  });
});