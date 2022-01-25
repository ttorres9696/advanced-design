"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _state = _interopRequireDefault(require("./state"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var canvasReducer = function canvasReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _state.default;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    /**
     * STORE THE MODULE SPECS OPTIONS WHEN IT'S RETURNED BY API
     */
    case _types.FETCHED_MODULE_SPECS:
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecs: action.payload
      });

    /**
     * DEFINE THE DELETE DIALOG PARAMS TO CONFIRM A SHAPE DELETION
     */

    case _types.SET_DELETE_DIALOG_PARAMS:
      return _objectSpread(_objectSpread({}, state), {}, {
        deleteDialogParams: _objectSpread({}, action.payload)
      });

    /**
     * SET WINDOW DIMENSION THAT WILL BE USED FOR CANVAS' STAGE SIZE AND FOR RESPONSIVE ELEMENTS
     */

    case _types.SET_WINDOW_DIMENSION:
      return _objectSpread(_objectSpread({}, state), {}, {
        windowDimension: action.payload
      });

    /**
     * SET APP PRE LOADING
     */

    case _types.SET_PRE_LOADING:
      return _objectSpread(_objectSpread({}, state), {}, {
        preLoading: action.payload
      });

    /**
     * CANCEL APP PRE LOADING
     */

    case _types.CANCEL_PRE_LOADING:
      return _objectSpread(_objectSpread({}, state), {}, {
        canceledPreLoading: true
      });

    /**
     * DECREASE PRODUCTION VALUE
     */

    case _types.DECREASE_PRODUCTION_VALUE:
      var decreasedProductionValue = state.totalProduction - action.payload;

      if (decreasedProductionValue < 0) {
        decreasedProductionValue = 0;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        totalProduction: decreasedProductionValue
      });

    /**
     * INCREASE PRODUCTION VALUE
     */

    case _types.INCREASE_PRODUCTION_VALUE:
      return _objectSpread(_objectSpread({}, state), {}, {
        totalProduction: state.totalProduction + action.payload
      });

    /**
     * RESET PRODUCTION VALUE
     */

    case _types.RESET_PRODUCTION_VALUE:
      return _objectSpread(_objectSpread({}, state), {}, {
        totalProduction: 0
      });

    default:
      return state;
  }
};

var _default = canvasReducer;
exports.default = _default;