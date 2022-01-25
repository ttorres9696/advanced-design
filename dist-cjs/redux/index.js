"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.rootReducer = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("./canvas/reducers"));

var _reducers2 = _interopRequireDefault(require("./core/reducers"));

var _reducers3 = _interopRequireDefault(require("./stage/reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  stage: _reducers3.default,
  canvas: _reducers.default,
  core: _reducers2.default
});
exports.rootReducer = rootReducer;
var store = (0, _redux.createStore)(rootReducer, (0, _redux.applyMiddleware)(_reduxThunk.default));
var _default = store;
exports.default = _default;