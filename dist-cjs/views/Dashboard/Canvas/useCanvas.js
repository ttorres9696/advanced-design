"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _react = require("react");

var _reactRedux = require("react-redux");

var _actions = require("../../../redux/canvas/actions");

var _actions2 = require("../../../redux/core/actions");

var _actions3 = require("../../../redux/stage/actions");

var _SolarDesign = require("../../../shared/geometry/SolarDesign");

var _modules = require("../../../shared/helpers/modules.helper");

var _polygons = require("../../../shared/helpers/polygons.helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCanvas = function useCanvas(_ref) {
  var solarDesign = _ref.solarDesign,
      transformerSelectElement = _ref.transformerSelectElement,
      transformerHandleDragElement = _ref.transformerHandleDragElement,
      transformerOnDragEnd = _ref.transformerOnDragEnd;
  var dispatch = (0, _reactRedux.useDispatch)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dragging = _useState2[0],
      setDragging = _useState2[1];

  var layersOrder = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.layersOrder;
  });
  var layers = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec && state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].layers || {
      trees: {},
      roofs: {},
      setbacks: {},
      modules: {},
      obstructions: {}
    };
  });
  var selectMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectMode;
  });
  var selectedShapeElementIds = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedShapeElementIds || [];
  });
  var selectedLayerName = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedLayerName || '';
  });
  var magnetMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.magnetMode;
  });
  var newDraggablePointMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.newDraggablePointMode;
  });
  var mousePosition = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.mousePosition;
  });
  var deleteDraggablePointMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.deleteDraggablePointMode;
  });
  var canvasOrigin = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.canvasOrigin;
  });
  var scale = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.scale;
  });

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      stageRef = _useState4[0],
      setStageRef = _useState4[1];

  var onStartChange = (0, _react.useCallback)(function (id, layer) {
    return dispatch((0, _actions3.startHistoryItem)([id], layer));
  }, [dispatch]);
  var onFinishChange = (0, _react.useCallback)(function (id, layer) {
    return dispatch((0, _actions3.finishHistoryItem)([id], layer));
  }, [dispatch]);
  var selectElement = (0, _react.useCallback)(function (id, layer, selectionType, node) {
    if (selectMode && (layer !== 'modules' || layer === 'modules' && layers.modules[id].active)) {
      if (selectionType === 'reset') {
        selectedShapeElementIds.forEach(function (elementId) {
          dispatch((0, _actions3.setSelectedElement)(selectedLayerName, elementId, false));
        });
      }

      if (id.length > 0 && (selectionType === 'reset' || selectionType === 'add' && layer === selectedLayerName)) {
        dispatch((0, _actions3.setSelectedElement)(layer, id, true));
      }

      dispatch((0, _actions.selectShape)(id, layer, selectionType));
      dispatch((0, _actions.setNewDraggablePointMode)(false));
      dispatch((0, _actions.setDeleteDraggablePointMode)(false));
      transformerSelectElement(selectionType, node);
    } else if (!selectMode && layer === 'modules') {
      onStartChange(id, layer);
      dispatch((0, _actions3.toggleModule)(id));
      onFinishChange(id, layer);
    }
  }, [dispatch, transformerSelectElement, selectMode, selectedShapeElementIds, selectedLayerName, layers, onStartChange, onFinishChange]);
  var onRotateElement = (0, _react.useCallback)(function (id, layer, pointsRotationInRadians, points) {
    return dispatch((0, _actions3.updateShape)(_objectSpread(_objectSpread({}, layers[layer][id]), {}, {
      shape: _objectSpread(_objectSpread({}, layers[layer][id].shape), {}, {
        points: points,
        pointsRotationInRadians: pointsRotationInRadians
      })
    })));
  }, [dispatch, layers]);
  var onChangeElementParams = (0, _react.useCallback)(function (id, layer, params) {
    if (params && params.points && params.points.length <= 2) {
      dispatch((0, _actions2.setDeleteDialogParams)({
        elementIds: [id],
        layer: layer,
        open: true
      }));
    } else {
      dispatch((0, _actions3.updateShape)(_objectSpread(_objectSpread({}, layers[layer][id]), {}, {
        shape: _objectSpread(_objectSpread({}, layers[layer][id].shape), params)
      })));
    }
  }, [dispatch, layers]);
  var onMoveStart = (0, _react.useCallback)(function (layer, node) {
    var elementIds = selectedShapeElementIds.includes(node.id()) ? Array.from(selectedShapeElementIds) : [node.id()];
    dispatch((0, _actions3.startHistoryItem)(elementIds, layer));
    elementIds.forEach(function (elementId) {
      dispatch((0, _actions3.updateShape)(_objectSpread(_objectSpread({}, layers[layer][elementId]), {}, {
        shape: _objectSpread({}, layers[layer][elementId].shape)
      })));
    });
  }, [dispatch, selectedShapeElementIds, layers]);
  var onMoveElement = (0, _react.useCallback)(function (id, layer, node, e) {
    transformerHandleDragElement(node, e);

    if (magnetMode && selectedShapeElementIds.length <= 1) {
      if (layer === 'modules') {
        var line = node;
        var x = line.x();
        var y = line.y();
        var magnetAlignment = (0, _modules.getMagnetAlignment)(_objectSpread(_objectSpread({}, layers[layer][id]), {}, {
          shape: _objectSpread(_objectSpread({}, layers[layer][id].shape), {}, {
            points: (0, _polygons.convertLinePointsToShapePoints)(line.points().map(function (coord, index) {
              if (index % 2 === 0) {
                return coord + x;
              } else {
                return coord + y;
              }
            }))
          })
        }), Object.values(layers[layer]).filter(function (element) {
          return element.active;
        }), selectedShapeElementIds);

        if (magnetAlignment && (0, _lodash.difference)(magnetAlignment.pointsRotationInRadians, layers[layer][id].shape.pointsRotationInRadians).length > 0) {
          onChangeElementParams(id, layer, _objectSpread(_objectSpread({}, magnetAlignment), {}, {
            points: magnetAlignment.points.map(function (point) {
              return [point[0] - x, point[1] - y];
            })
          }));
        }
      }
    }
  }, [layers, onChangeElementParams, magnetMode, transformerHandleDragElement, selectedShapeElementIds]);
  var onMoveEnd = (0, _react.useCallback)(function (layer, node) {
    dispatch((0, _actions3.finishHistoryItem)(transformerOnDragEnd(layer, node), layer));
  }, [dispatch, transformerOnDragEnd]);
  var onMouseMove = (0, _react.useCallback)(function (event) {
    if (selectedLayerName.length && newDraggablePointMode) {
      var stage = event.currentTarget;
      var masterLayer = stage.getLayers().toArray().find(function (layer) {
        return layer.attrs['id'] === 'layers';
      });

      if (masterLayer) {
        var selectedLayer = masterLayer.findOne("#".concat(selectedLayerName));
        var transform = selectedLayer.getAbsoluteTransform().copy();
        transform.invert();
        var pointerPosition = stage.getPointerPosition();

        if (pointerPosition) {
          var relativePointerPosition = transform.point(pointerPosition);
          dispatch((0, _actions.setMousePosition)(relativePointerPosition));
        }
      }
    } else if (mousePosition) {
      dispatch((0, _actions.setMousePosition)(undefined));
    }
  }, [selectedLayerName, newDraggablePointMode, dispatch, mousePosition]);
  var onMouseClick = (0, _react.useCallback)(function (event) {
    if (newDraggablePointMode && mousePosition && selectedLayerName.length > 0 && selectedShapeElementIds.length === 1) {
      dispatch((0, _actions3.startHistoryItem)(selectedShapeElementIds, selectedLayerName));
      dispatch((0, _actions3.addNewDraggablePoint)(selectedLayerName, selectedShapeElementIds[0], mousePosition));
      dispatch((0, _actions3.finishHistoryItem)(selectedShapeElementIds, selectedLayerName));
    }
  }, [newDraggablePointMode, mousePosition, selectedLayerName, selectedShapeElementIds, dispatch]);
  (0, _react.useEffect)(function () {
    dispatch((0, _actions3.setSelectedModuleSpec)(solarDesign.modules_spec));
    var lowerCoords = (0, _SolarDesign.getLowerCoords)(solarDesign, {
      top: 0,
      left: 150
    });
    dispatch((0, _actions.setCanvasOrigin)(lowerCoords));
    Object.values(solarDesign.layers).reduce(function (allElements, layer) {
      return allElements.concat(layer);
    }, []).forEach(function (solarElement) {
      if (solarElement.type === 'module') {
        solarElement.shape.pointsRotationInRadians = (0, _modules.getCurrentModulePointsRotation)(solarElement.shape.points);
      }

      dispatch((0, _actions3.addShape)(solarDesign.modules_spec.series, solarElement));
      dispatch((0, _actions.incrementTotalShapes)());
    });
  }, [solarDesign, dispatch]);
  (0, _react.useEffect)(function () {
    if (stageRef) {
      var container = stageRef.container();
      container.tabIndex = 1;
      container.focus();
      container.addEventListener('keyup', function (e) {
        if (selectedShapeElementIds.length > 0 && (e.key === 'Backspace' || e.key === 'Delete')) {
          dispatch((0, _actions2.setDeleteDialogParams)({
            elementIds: selectedShapeElementIds,
            layer: selectedLayerName,
            open: true
          }));
        }
      }, false);
    }
  }, [dispatch, selectedShapeElementIds, selectedLayerName, stageRef]);
  (0, _react.useEffect)(function () {
    if (!selectMode && selectedShapeElementIds.length > 0) {
      selectedShapeElementIds.forEach(function (elementId) {
        dispatch((0, _actions3.setSelectedElement)(selectedLayerName, elementId, false));
      });
      dispatch((0, _actions.selectShape)('', '', 'reset'));
      dispatch((0, _actions.setNewDraggablePointMode)(false));
      dispatch((0, _actions.setDeleteDraggablePointMode)(false));
      transformerSelectElement('reset');
    }
  }, [dispatch, transformerSelectElement, selectMode, selectedShapeElementIds, selectedLayerName]);
  return {
    selectElement: selectElement,
    selectedElementIds: selectedShapeElementIds,
    selectedLayerName: selectedLayerName,
    scale: scale,
    canvasOrigin: canvasOrigin,
    onStartChange: onStartChange,
    onChangeElementParams: onChangeElementParams,
    onRotateElement: onRotateElement,
    onFinishChange: onFinishChange,
    onMoveStart: onMoveStart,
    onMoveElement: onMoveElement,
    onMoveEnd: onMoveEnd,
    layersOrder: layersOrder,
    layers: layers,
    newDraggablePointMode: newDraggablePointMode,
    deleteDraggablePointMode: deleteDraggablePointMode,
    mousePosition: mousePosition,
    selectMode: selectMode,
    onMouseMove: onMouseMove,
    onMouseClick: onMouseClick,
    setDragging: setDragging,
    dragging: dragging,
    stageRef: stageRef,
    setStageRef: setStageRef
  };
};

var _default = useCanvas;
exports.default = _default;