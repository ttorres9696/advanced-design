"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _konva = _interopRequireDefault(require("konva"));

var _react = require("react");

var _reactRedux = require("react-redux");

var _helpers = require("../../redux/stage/helpers");

var _polygons = require("../helpers/polygons.helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useRectSelection = function useRectSelection(selectElement) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      initialized = _useState2[0],
      setInitialized = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      rectSelectionRef = _useState4[0],
      setRectSelectionRef = _useState4[1];

  var _useState5 = (0, _react.useState)([{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }]),
      _useState6 = _slicedToArray(_useState5, 2),
      coords = _useState6[0],
      setCoords = _useState6[1];

  var selectMode = (0, _reactRedux.useSelector)(function (state) {
    return state.canvas.selectMode;
  });
  var handleTouchStart = (0, _react.useCallback)(function (e) {
    var _rectSelectionRef$get;

    if (!rectSelectionRef || e.target !== rectSelectionRef.getStage() || !selectMode || rectSelectionRef.visible()) {
      return;
    }

    var stage = rectSelectionRef.getStage();
    var paddingX = stage.x() >= 0 ? -stage.x() : stage.x();
    var paddingY = stage.y() >= 0 ? -stage.y() : stage.y();
    var origin = {
      x: stage.getPointerPosition().x + paddingX,
      y: stage.getPointerPosition().y + paddingY
    };
    rectSelectionRef.visible(true);
    rectSelectionRef.width(0);
    rectSelectionRef.height(0);
    rectSelectionRef.setAttrs(origin);
    setCoords([origin, origin]);
    (_rectSelectionRef$get = rectSelectionRef.getLayer()) === null || _rectSelectionRef$get === void 0 ? void 0 : _rectSelectionRef$get.draw();
  }, [rectSelectionRef, selectMode, setCoords]);
  var handleTouchMove = (0, _react.useCallback)(function (e) {
    var _rectSelectionRef$get2;

    if (!rectSelectionRef || !rectSelectionRef.visible() || !selectMode || e.evt.buttons === 0 && e.evt.which === 0) {
      return;
    }

    var stage = rectSelectionRef.getStage();
    var origin = coords[0];
    var paddingX = stage.x() >= 0 ? -stage.x() : stage.x();
    var paddingY = stage.y() >= 0 ? -stage.y() : stage.y();
    var actualCoords = {
      x: stage.getPointerPosition().x + paddingX,
      y: stage.getPointerPosition().y + paddingY
    };
    rectSelectionRef.setAttrs({
      x: Math.min(origin.x, actualCoords.x),
      y: Math.min(origin.y, actualCoords.y),
      width: Math.abs(actualCoords.x - origin.x),
      height: Math.abs(actualCoords.y - origin.y)
    });
    setCoords([origin, actualCoords]);
    (_rectSelectionRef$get2 = rectSelectionRef.getLayer()) === null || _rectSelectionRef$get2 === void 0 ? void 0 : _rectSelectionRef$get2.batchDraw();
  }, [rectSelectionRef, selectMode, coords, setCoords]);
  var handleTouchEnd = (0, _react.useCallback)(function () {
    var _rectSelectionRef$get4;

    if (!rectSelectionRef || !rectSelectionRef.visible() || !selectMode) {
      return;
    }

    var stage = rectSelectionRef.getStage(); // update visibility in timeout, to check it in click event

    setTimeout(function () {
      var _rectSelectionRef$get3;

      rectSelectionRef.visible(false);
      (_rectSelectionRef$get3 = rectSelectionRef.getLayer()) === null || _rectSelectionRef$get3 === void 0 ? void 0 : _rectSelectionRef$get3.batchDraw();
    });
    var selectionBox = rectSelectionRef.getClientRect();
    var mainLayer = stage.find('#layers').toArray()[0];
    var groups = mainLayer.find('Group').toArray();
    groups.forEach(function (group) {
      var elementType = (0, _helpers.getRespectiveLayerSolarType)(group.id());

      if (elementType && elementType.length > 0 && !_polygons.lockedTypes.includes(elementType)) {
        group.getChildren().toArray().forEach(function (node) {
          var isIntoSelectionRange = _konva.default.Util.haveIntersection(selectionBox, node.getClientRect());

          if (isIntoSelectionRange && node.draggable()) {
            selectElement(node.id(), group.id(), 'add', node);
          }
        });
      }
    });
    (_rectSelectionRef$get4 = rectSelectionRef.getLayer()) === null || _rectSelectionRef$get4 === void 0 ? void 0 : _rectSelectionRef$get4.batchDraw();
  }, [rectSelectionRef, selectMode, selectElement]);
  (0, _react.useEffect)(function () {
    if (rectSelectionRef && !initialized) {
      var _rectSelectionRef$get5;

      setInitialized(true);
      rectSelectionRef.visible(false);
      (_rectSelectionRef$get5 = rectSelectionRef.getLayer()) === null || _rectSelectionRef$get5 === void 0 ? void 0 : _rectSelectionRef$get5.draw();
    }
  }, [rectSelectionRef, handleTouchStart, handleTouchMove, handleTouchEnd, initialized, setInitialized]);
  return {
    setRectSelectionRef: setRectSelectionRef,
    rectSelectionHandleTouchStart: handleTouchStart,
    rectSelectionHandleTouchMove: handleTouchMove,
    rectSelectionHandleTouchEnd: handleTouchEnd
  };
};

var _default = useRectSelection;
exports.default = _default;