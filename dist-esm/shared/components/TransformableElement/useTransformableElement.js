"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _modules = require("../../helpers/modules.helper");

var _polygons = require("../../helpers/polygons.helper");

var _vectors = require("../../helpers/vectors.helper");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useTransformableElement = function useTransformableElement(_ref) {
  var id = _ref.id,
      layer = _ref.layer,
      onStartChange = _ref.onStartChange,
      onChange = _ref.onChange,
      onFinishChange = _ref.onFinishChange,
      onRotate = _ref.onRotate,
      setDragging = _ref.setDragging,
      version = _ref.version,
      deleteDraggablePointMode = _ref.deleteDraggablePointMode,
      onMoveStart = _ref.onMoveStart,
      onMove = _ref.onMove,
      onMoveEnd = _ref.onMoveEnd,
      onSelect = _ref.onSelect,
      visible = _ref.visible,
      locked = _ref.locked,
      selectMode = _ref.selectMode;
  var shapeRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      inDragMode = _useState2[0],
      setInDragMode = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      draggablePoints = _useState4[0],
      setDraggablePoints = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      previousVersion = _useState6[0],
      setPreviousVersion = _useState6[1];

  var defineDraggablePoints = (0, _react.useCallback)(function (shapePoints) {
    setDraggablePoints(shapePoints.reduce(function (draggablePoints, coord, index) {
      if (index % 2 === 0) {
        draggablePoints.push({
          x: coord,
          y: shapePoints[index + 1],
          position: index / 2
        });
      }

      return draggablePoints;
    }, []));
  }, [setDraggablePoints]);
  var onDragStart = (0, _react.useCallback)(function (e) {
    if (_typeof(e) === 'object' && e.type && e.type === 'dragstart') {
      var node = shapeRef.current;
      onMoveStart(layer, node);
      setInDragMode(true);
      setDragging(true);
    }
  }, [layer, onMoveStart, setInDragMode, setDragging]);
  var onDragMove = (0, _react.useCallback)(function (e) {
    if (_typeof(e) === 'object' && e.type && e.type.indexOf('drag') === 0) {
      onMove(id, layer, shapeRef.current, e);
    }
  }, [id, layer, onMove, shapeRef]);
  var onDragEnd = (0, _react.useCallback)(function (e) {
    var node = shapeRef.current;
    onMoveEnd(layer, node);
    setInDragMode(false);
    setDragging(false);
  }, [layer, shapeRef, setInDragMode, setDragging, onMoveEnd]);
  var onPolygonTransformStart = (0, _react.useCallback)(function () {
    return onStartChange(id, layer);
  }, [onStartChange, id, layer]);
  var onPolygonTransformEnd = (0, _react.useCallback)(function (e) {
    var node = shapeRef.current;
    var rotation = node.rotation();
    node.rotate(-1 * rotation);
    node.x(0);
    node.y(0);
    var rotatedPoints = (0, _polygons.getRotatedPoints)(rotation, draggablePoints.map(function (draggablePoint) {
      return (0, _vectors.convertVector2dToPoint)(draggablePoint);
    }));
    onRotate(id, layer, (0, _modules.getCurrentModulePointsRotation)(rotatedPoints), rotatedPoints);
    onFinishChange(id, layer);
  }, [shapeRef, id, layer, draggablePoints, onRotate, onFinishChange]);
  var onCircleTransformStart = (0, _react.useCallback)(function () {
    return onStartChange(id, layer);
  }, [onStartChange, id, layer]);
  var onCircleTransformEnd = (0, _react.useCallback)(function (e) {
    var node = shapeRef.current;
    var scaleX = node.scaleX();
    node.scaleX(1);
    node.scaleY(1);
    onChange(id, layer, {
      radius: node.radius() * scaleX
    });
    onFinishChange(id, layer);
  }, [onChange, onFinishChange, id, layer, shapeRef]);
  var onPolygonChangePointStart = (0, _react.useCallback)(function () {
    return onStartChange(id, layer);
  }, [onStartChange, id, layer]);
  var onPolygonChangePoint = (0, _react.useCallback)(function (x, y, position) {
    onChange(id, layer, {
      points: draggablePoints.map(function (draggablePoint, index) {
        return index === position ? [x, y] : [draggablePoint.x, draggablePoint.y];
      })
    });
  }, [onChange, id, layer, draggablePoints]);
  var onPolygonChangePointEnd = (0, _react.useCallback)(function (x, y, position) {
    setDraggablePoints(draggablePoints.map(function (draggablePoint, index) {
      return index === position ? {
        x: x,
        y: y,
        position: position
      } : draggablePoint;
    }));
    onFinishChange(id, layer);
  }, [onFinishChange, id, layer, draggablePoints, setDraggablePoints]);
  var onPolygonClickPoint = (0, _react.useCallback)(function (position) {
    if (deleteDraggablePointMode && shapeRef && shapeRef.current) {
      onStartChange(id, layer);
      var newDraggablePoints = Array.from(draggablePoints);
      newDraggablePoints.splice(position, 1);
      onChange(id, layer, {
        points: newDraggablePoints.map(function (draggablePoint) {
          return [draggablePoint.x, draggablePoint.y];
        })
      });
      setDraggablePoints(newDraggablePoints);
      onFinishChange(id, layer);
      var node = shapeRef.current;
      var stage = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'default';
      }
    }
  }, [onChange, id, layer, draggablePoints, setDraggablePoints, deleteDraggablePointMode, onStartChange, onFinishChange, shapeRef]);
  var onMouseEnter = (0, _react.useCallback)(function (e) {
    var container = e.target.getStage().container();
    container.style.cursor = layer === 'modules' && !selectMode ? 'pointer' : 'default';
  }, [layer, selectMode]);
  var onMouseLeave = (0, _react.useCallback)(function (e) {
    var container = e.target.getStage().container();
    container.style.cursor = 'default';
  }, []);
  var handleOnClickElement = (0, _react.useCallback)(function (e) {
    if (shapeRef && shapeRef.current && visible && !locked) {
      onDragStart(id);
      onSelect(id, layer, e.evt.ctrlKey || e.evt.metaKey ? 'add' : 'reset', shapeRef.current);
    }
  }, [id, layer, shapeRef, onDragStart, onSelect, visible, locked]);
  (0, _react.useEffect)(function () {
    if ((!draggablePoints.length || previousVersion !== version) && shapeRef && shapeRef.current && shapeRef.current.points) {
      defineDraggablePoints(shapeRef.current.points());
      setPreviousVersion(version);
    }
  }, [shapeRef, defineDraggablePoints, draggablePoints.length, previousVersion, setPreviousVersion, version]);
  return {
    shapeRef: shapeRef,
    onDragStart: onDragStart,
    onDragMove: onDragMove,
    onDragEnd: onDragEnd,
    onCircleTransformStart: onCircleTransformStart,
    onCircleTransformEnd: onCircleTransformEnd,
    onPolygonTransformStart: onPolygonTransformStart,
    onPolygonTransformEnd: onPolygonTransformEnd,
    onPolygonChangePointStart: onPolygonChangePointStart,
    onPolygonChangePoint: onPolygonChangePoint,
    onPolygonChangePointEnd: onPolygonChangePointEnd,
    onPolygonClickPoint: onPolygonClickPoint,
    draggablePoints: draggablePoints,
    inDragMode: inDragMode,
    handleOnClickElement: handleOnClickElement,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  };
};

var _default = useTransformableElement;
exports.default = _default;