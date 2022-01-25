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

var _actions2 = require("../../../redux/stage/actions");

var _icons = require("../../../shared/icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useRightDrawerMenu = function useRightDrawerMenu() {
  var dispatch = (0, _reactRedux.useDispatch)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      expandedItems = _useState2[0],
      setExpandedItems = _useState2[1];

  var layersOrder = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.layersOrder;
  });
  var layers = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec && state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].layers || {};
  });
  var selectedElementIds = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedShapeElementIds;
  });
  var selectedLayerName = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedLayerName;
  });
  var selectMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectMode;
  });
  var onToggleExpandItem = (0, _react.useCallback)(function (id) {
    if (!expandedItems.includes(id)) {
      setExpandedItems((0, _lodash.concat)(expandedItems, [id]));
    } else {
      var updatedExpandedItems = Array.from(expandedItems);
      updatedExpandedItems.splice(expandedItems.indexOf(id), 1);
      setExpandedItems(updatedExpandedItems);
    }
  }, [expandedItems, setExpandedItems]);
  var onSelectShapeElement = (0, _react.useCallback)(function (shapeElementId, parentId, selectionType) {
    if (selectMode) {
      if (selectionType === 'reset') {
        selectedElementIds.forEach(function (elementId) {
          dispatch((0, _actions2.setSelectedElement)(selectedLayerName, elementId, false));
        });
      }

      if (shapeElementId.length > 0 && (selectionType === 'reset' || selectionType === 'add' && parentId === selectedLayerName)) {
        dispatch((0, _actions2.setSelectedElement)(parentId, shapeElementId, true));
      }

      dispatch((0, _actions.selectShape)(shapeElementId, parentId, selectionType));
      dispatch((0, _actions.setNewDraggablePointMode)(false));
      dispatch((0, _actions.setDeleteDraggablePointMode)(false));
    }
  }, [dispatch, selectedElementIds, selectedLayerName, selectMode]);
  var listItems = [{
    id: 'layers',
    icon: /*#__PURE__*/_react.default.createElement(_icons.LayersIcon, null),
    label: 'Layers',
    action: onToggleExpandItem,
    expanded: expandedItems.includes('layers'),
    subItems: layersOrder.map(function (layer) {
      var LayerIcon = (0, _icons.getLayerIcon)(layer);
      var subItemsIds = layers && layers[layer] && Object.keys(layers[layer]) || [];
      return {
        id: layer,
        icon: /*#__PURE__*/_react.default.createElement(LayerIcon, null),
        label: "".concat(layer.charAt(0).toUpperCase()).concat(layer.slice(1)),
        action: onToggleExpandItem,
        selected: layer === selectedLayerName,
        expanded: expandedItems.includes(layer),
        subItems: subItemsIds && subItemsIds.length ? subItemsIds.map(function (id) {
          var shape = layers[layer][id].shape;
          var ShapeIcon = (0, _icons.getLayerIcon)(layer, shape.type);
          return {
            id: id,
            icon: /*#__PURE__*/_react.default.createElement(ShapeIcon, null),
            label: id,
            selected: selectedElementIds.includes(id),
            action: onSelectShapeElement,
            visible: shape.visible,
            locked: shape.locked
          };
        }) : []
      };
    })
  }];
  return {
    listItems: listItems
  };
};

var _default = useRightDrawerMenu;
exports.default = _default;