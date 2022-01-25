"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _actions = require("../../redux/canvas/actions");

var _actions2 = require("../../redux/stage/actions");

var _types = require("../components/TransformableElement/RotationArrowIconButton/types");

var _modules = require("../helpers/modules.helper");

var _polygons = require("../helpers/polygons.helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useTransformer = function useTransformer() {
  var dispatch = (0, _reactRedux.useDispatch)();
  var selectedShapeElementIds = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedShapeElementIds || [];
  });
  var selectedLayerName = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectedLayerName || '';
  });
  var layers = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec && state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].layers || {};
  });
  var transformerNodes = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.transformerNodes;
  });
  var transformerRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedElements = _useState2[0],
      setSelectedElements = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      rotationIcons = _useState4[0],
      setRotationIcons = _useState4[1];

  var _useState5 = (0, _react.useState)({
    width: 0,
    height: 0
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      transformerDimensions = _useState6[0],
      setTransformerDimensions = _useState6[1];

  var saveChangeOnState = (0, _react.useCallback)(function (id, layer, params) {
    dispatch((0, _actions2.updateShape)(_objectSpread(_objectSpread({}, layers[layer][id]), {}, {
      shape: _objectSpread(_objectSpread({}, layers[layer][id].shape), params)
    })));
  }, [dispatch, layers]);
  var handleDragElement = (0, _react.useCallback)(function (node, e) {
    if (selectedShapeElementIds.includes(node.id())) {
      selectedElements.forEach(function (element) {
        if (element._id !== node._id) {
          element.position(node.position());
        }
      });
    }
  }, [selectedElements, selectedShapeElementIds]);
  var onDragEnd = (0, _react.useCallback)(function (layer, node) {
    var draggedElements = selectedShapeElementIds.includes(node.id()) ? Array.from(selectedElements) : [node];
    return draggedElements.map(function (draggedNode) {
      if (draggedNode.radius) {
        // CIRCLE
        saveChangeOnState(draggedNode.id(), layer, {
          x: draggedNode.x(),
          y: draggedNode.y()
        });
      } else {
        // POLYGON
        var x = draggedNode.x();
        var y = draggedNode.y();
        var points = draggedNode.points().map(function (coord, index) {
          if (index % 2 === 0) {
            return coord + x;
          } else {
            return coord + y;
          }
        });
        draggedNode.x(0);
        draggedNode.y(0);
        saveChangeOnState(draggedNode.id(), layer, {
          points: points.reduce(function (result, coord, index) {
            if (index % 2 === 0) {
              result.push([coord, points[index + 1]]);
            }

            return result;
          }, [])
        });
      }

      return draggedNode.id();
    });
  }, [saveChangeOnState, selectedShapeElementIds, selectedElements]);
  var selectElement = (0, _react.useCallback)(function (selectionType, node) {
    if (transformerRef && transformerRef.current) {
      var _transformer$getLayer;

      var transformer = transformerRef.current;
      var nodeArray = node && [node] || [];
      var newSelectedElements = selectionType === 'add' ? Array.from(transformer.nodes()).concat(nodeArray) : nodeArray;
      transformer.nodes(newSelectedElements);
      (_transformer$getLayer = transformer.getLayer()) === null || _transformer$getLayer === void 0 ? void 0 : _transformer$getLayer.batchDraw();
      setSelectedElements(newSelectedElements);
      setRotationIcons([]);
      setTransformerDimensions({
        width: 0,
        height: 0
      });
    }
  }, [transformerRef, setSelectedElements, setRotationIcons, setTransformerDimensions]);
  var addRotationIconsToTransformer = (0, _react.useCallback)(function (transformer) {
    var halfSize = _types.RotationIconSize / 2;
    setRotationIcons([{
      x: -(_types.RotationIconSize + 2),
      y: -(halfSize - 2),
      type: 'left',
      rotation: -40,
      onClick: function onClick() {},
      position: 0
    }, {
      x: transformer.getWidth() + 4,
      y: -_types.RotationIconSize,
      type: 'right',
      rotation: 40,
      onClick: function onClick() {},
      position: 1
    }, {
      x: transformer.getWidth() + _types.RotationIconSize + 1,
      y: transformer.getHeight() + halfSize - 2,
      type: 'left',
      rotation: 135,
      onClick: function onClick() {},
      position: 2
    }, {
      x: -halfSize,
      y: transformer.getHeight() + _types.RotationIconSize,
      type: 'right',
      rotation: -135,
      onClick: function onClick() {
        return function () {};
      },
      position: 3
    }]);
    setTransformerDimensions({
      width: transformer.getWidth(),
      height: transformer.getHeight()
    });
  }, [setRotationIcons, setTransformerDimensions]);
  var rotateElements90Degrees = (0, _react.useCallback)(function (position) {
    dispatch((0, _actions2.startHistoryItem)(selectedShapeElementIds, selectedLayerName));
    selectedShapeElementIds.forEach(function (elementId) {
      var shapeElement = selectedElements.find(function (node) {
        return node.id() === elementId;
      });

      if (shapeElement && shapeElement.points) {
        var rotatedPoints = (0, _polygons.getRotatedPoints)(position % 2 === 0 ? -90 : 90, (0, _polygons.convertLinePointsToShapePoints)(shapeElement.points()));
        dispatch((0, _actions2.updateShape)(_objectSpread(_objectSpread({}, layers[selectedLayerName][elementId]), {}, {
          shape: _objectSpread(_objectSpread({}, layers[selectedLayerName][elementId].shape), {}, {
            points: rotatedPoints,
            pointsRotationInRadians: (0, _modules.getCurrentModulePointsRotation)(rotatedPoints)
          })
        })));
      }
    });
    dispatch((0, _actions2.finishHistoryItem)(selectedShapeElementIds, selectedLayerName));
  }, [dispatch, selectedLayerName, selectedShapeElementIds, layers, selectedElements]);
  var checkTransformerDimensions = (0, _react.useCallback)(function () {
    if (transformerRef && transformerRef.current) {
      var transformer = transformerRef.current;

      if (transformer.getWidth() !== transformerDimensions.width || transformer.getHeight() !== transformerDimensions.height) {
        addRotationIconsToTransformer(transformer);
      }
    }
  }, [transformerRef, transformerDimensions, addRotationIconsToTransformer]);
  (0, _react.useEffect)(function () {
    if (selectedShapeElementIds.length === 0 && selectedElements.length > 0) {
      selectElement('reset');
    }
  }, [selectedShapeElementIds, selectElement, selectedElements]);
  (0, _react.useEffect)(function () {
    if (transformerNodes && transformerRef.current) {
      var transformer = transformerRef.current;
      var stage = transformer.getStage();

      if (stage) {
        transformerNodes.elementIds.forEach(function (elementId, index) {
          var node = stage.findOne("#".concat(elementId));

          if (node) {
            selectElement(index === 0 ? transformerNodes.selectionType : 'add', node);
          }
        });
        dispatch((0, _actions2.clearTransformerNodesState)());
      }
    }
  }, [dispatch, transformerNodes, transformerRef.current, selectElement]);
  (0, _react.useEffect)(function () {
    if (selectedElements.length > 0 && transformerRef && transformerRef.current && selectedLayerName) {
      var transformer = transformerRef.current;
      var deletedElementIds = selectedElements.reduce(function (result, node) {
        if (!layers[selectedLayerName][node.id()]) {
          result.delete.push(node.id()); // deselect from state

          dispatch((0, _actions.deselectShape)(node.id()));
        } else {
          result.keepNodes.push(node);
        }

        return result;
      }, {
        delete: [],
        keepNodes: []
      });

      if (deletedElementIds.delete.length > 0) {
        var _transformer$getLayer2;

        transformer.nodes(deletedElementIds.keepNodes);
        (_transformer$getLayer2 = transformer.getLayer()) === null || _transformer$getLayer2 === void 0 ? void 0 : _transformer$getLayer2.batchDraw(); // remove nodes from selectedElements

        setSelectedElements(deletedElementIds.keepNodes);
      }
    }
  }, [layers, selectedElements, dispatch, selectedLayerName, setSelectedElements, transformerRef]);
  checkTransformerDimensions();
  return {
    transformerRef: transformerRef,
    transformerSelectElement: selectElement,
    transformerRotationIcons: rotationIcons,
    transformerHandleDragElement: handleDragElement,
    transformerRotateElements90Degrees: rotateElements90Degrees,
    transformerOnDragEnd: onDragEnd
  };
};

var _default = useTransformer;
exports.default = _default;