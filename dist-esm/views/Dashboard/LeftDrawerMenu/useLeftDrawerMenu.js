"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../redux/canvas/actions");

var _actions2 = require("../../../redux/core/actions");

var _actions3 = require("../../../redux/stage/actions");

var _helpers = require("../../../redux/stage/helpers");

var _modules = require("../../../shared/helpers/modules.helper");

var _icons = require("../../../shared/icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var loadingOption = {
  id: 'loading',
  icon: /*#__PURE__*/_react.default.createElement(_icons.LoadingIcon, null),
  label: 'Loading',
  action: function action() {}
};
var defaultOptions = [{
  id: 'roof-plane',
  icon: /*#__PURE__*/_react.default.createElement(_icons.RoofsIcon, null),
  label: 'Roof Plane'
}, {
  id: 'setback',
  icon: /*#__PURE__*/_react.default.createElement(_icons.SetbacksIcon, null),
  label: 'Setback'
}, {
  id: 'circular-obstruction',
  icon: /*#__PURE__*/_react.default.createElement(_icons.CircularObstructionsIcon, null),
  label: 'Circular Obstruction'
}, {
  id: 'rectangular-obstruction',
  icon: /*#__PURE__*/_react.default.createElement(_icons.ObstructionsIcon, null),
  label: 'Rectangular Obstruction'
}];

var useLeftDrawerMenu = function useLeftDrawerMenu() {
  var dispatch = (0, _reactRedux.useDispatch)();
  var totalShapes = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.totalShapes;
  });
  var moduleSpecs = (0, _reactRedux.useSelector)(function (state) {
    return state.core.moduleSpecs;
  });
  var selectedModuleSpec = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec;
  });
  var selectedLayerName = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedLayerName;
  });
  var selectedShapeElementIds = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedShapeElementIds;
  });

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      expandedItems = _useState2[0],
      setExpandedItems = _useState2[1];

  var onToggleExpandItem = (0, _react.useCallback)(function (id) {
    if (!expandedItems.includes(id)) {
      setExpandedItems((0, _lodash.concat)(expandedItems, [id]));
    } else {
      setExpandedItems(Array.from(expandedItems).splice(expandedItems.indexOf(id), -1));
    }
  }, [expandedItems, setExpandedItems]);
  var onClickListItem = (0, _react.useCallback)(function (id) {
    var newShape = undefined;

    switch (id) {
      case 'circular-obstruction':
        newShape = {
          id: "O".concat(totalShapes + 1),
          shape: {
            center: [0, 0],
            radius: 1,
            type: 'circle'
          },
          type: 'obstruction'
        };
        break;

      case 'rectangular-obstruction':
        newShape = {
          id: "O".concat(totalShapes + 1),
          shape: {
            points: [[0, 0], [0, 2], [2, 2], [2, 0]],
            type: 'polygon'
          },
          type: 'obstruction'
        };
        break;

      case 'roof-plane':
        newShape = {
          id: "R".concat(totalShapes + 1),
          shape: {
            points: [[0, 0], [0, 4], [2, 4], [2, 0]],
            type: 'polygon'
          },
          type: 'roof_plane'
        };
        break;

      case 'setback':
        newShape = {
          id: "S".concat(totalShapes + 1),
          shape: {
            points: [[0, 0], [0, 4], [2, 4], [2, 0]],
            type: 'polygon'
          },
          type: 'setback'
        };
        break;

      case 'module':
        if (selectedModuleSpec) {
          var points = (0, _modules.getModuleDesignPoints)(selectedModuleSpec);
          newShape = {
            id: "M".concat(totalShapes + 1),
            shape: {
              points: points,
              pointsRotationInRadians: (0, _modules.getCurrentModulePointsRotation)(points),
              type: 'polygon'
            },
            type: 'module'
          };
        }

        break;

      default:
        break;
    }

    if (selectedModuleSpec && newShape) {
      dispatch((0, _actions3.addShape)(selectedModuleSpec.series, newShape));
      dispatch((0, _actions.incrementTotalShapes)());
      selectedShapeElementIds.forEach(function (elementId) {
        dispatch((0, _actions3.setSelectedElement)(selectedLayerName, elementId, false));
      });
      dispatch((0, _actions3.setSelectedElement)((0, _helpers.getSolarTypeLayer)(newShape.type), newShape.id, true));
      dispatch((0, _actions.selectShape)(newShape.id, (0, _helpers.getSolarTypeLayer)(newShape.type), 'reset'));
    }
  }, [dispatch, totalShapes, selectedModuleSpec, selectedLayerName, selectedShapeElementIds]);

  var _useState3 = (0, _react.useState)([{
    id: 'add-elements',
    icon: /*#__PURE__*/_react.default.createElement(_icons.AddIcon, null),
    label: 'Add Element',
    action: onToggleExpandItem,
    subItems: [loadingOption]
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      listItems = _useState4[0],
      setListItems = _useState4[1];

  (0, _react.useEffect)(function () {
    var moduleSpecsOptions = moduleSpecs && (0, _lodash.isArray)(moduleSpecs) ? moduleSpecs.map(function (moduleSpec) {
      return {
        id: moduleSpec.name,
        icon: /*#__PURE__*/_react.default.createElement(_icons.ModulesIcon, null),
        label: moduleSpec.name,
        action: onClickListItem
      };
    }) : null;
    setListItems([{
      id: 'add-elements',
      icon: /*#__PURE__*/_react.default.createElement(_icons.AddIcon, null),
      label: 'Add Element',
      action: onToggleExpandItem,
      subItems: selectedModuleSpec === null || selectedModuleSpec || moduleSpecsOptions ? selectedModuleSpec !== null ? (0, _lodash.concat)([{
        id: 'module',
        icon: /*#__PURE__*/_react.default.createElement(_icons.ModulesIcon, null),
        label: selectedModuleSpec.series,
        action: onClickListItem
      }], defaultOptions.map(function (option) {
        return _objectSpread(_objectSpread({}, option), {}, {
          action: onClickListItem
        });
      })) : (0, _lodash.concat)(moduleSpecsOptions, defaultOptions.map(function (option) {
        return _objectSpread(_objectSpread({}, option), {}, {
          action: onClickListItem
        });
      })) : [loadingOption]
    }]);
  }, [setListItems, moduleSpecs, selectedModuleSpec, onClickListItem, onToggleExpandItem]);
  (0, _react.useEffect)(function () {
    dispatch((0, _actions2.fetchModuleSpecs)());
  }, [dispatch]);
  return {
    listItems: listItems,
    expandedItems: expandedItems
  };
};

var _default = useLeftDrawerMenu;
exports.default = _default;