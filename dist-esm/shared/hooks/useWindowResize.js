"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _actions = require("../../redux/core/actions");

var _useDebounce2 = _interopRequireDefault(require("./useDebounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useWindowResize = function useWindowResize() {
  var dispatch = (0, _reactRedux.useDispatch)();

  var _useDebounce = (0, _useDebounce2.default)(500, function (dispatch, setWindowDimension) {
    if (dispatch && setWindowDimension) {
      dispatch(setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight
      }));
    }
  }),
      onWindowResize = _useDebounce.execute;

  (0, _react.useEffect)(function () {
    onWindowResize(dispatch, _actions.setWindowDimension);
    window.addEventListener('resize', function () {
      onWindowResize(dispatch, _actions.setWindowDimension);
    }); // eslint-disable-next-line
  }, [dispatch]);
};

var _default = useWindowResize;
exports.default = _default;