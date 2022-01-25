"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _actions = require("../../redux/canvas/actions");

var _actions2 = require("../../redux/core/actions");

var _actions3 = require("../../redux/stage/actions");

var _useWindowResize = _interopRequireDefault(require("../../shared/hooks/useWindowResize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useDashboard = function useDashboard() {
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _useWindowResize.default)();

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isRightDrawerOpened = _useState2[0],
      setRightDrawerOpened = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      mockFinishLoading = _useState4[0],
      setMockFinishLoading = _useState4[1];

  var deleteDialogParams = (0, _reactRedux.useSelector)(function (state) {
    return state.core.deleteDialogParams;
  });
  var preLoading = (0, _reactRedux.useSelector)(function (state) {
    return state.core.preLoading;
  });
  var canceledPreLoading = (0, _reactRedux.useSelector)(function (state) {
    return state.core.canceledPreLoading;
  });
  var drawerToggleAction = (0, _react.useCallback)(function (side) {
    setRightDrawerOpened(!isRightDrawerOpened);
  }, [isRightDrawerOpened, setRightDrawerOpened]);
  var onDeleteConfirm = (0, _react.useCallback)(function (confirmed) {
    if (confirmed) {
      deleteDialogParams.elementIds.forEach(function (elementId) {
        dispatch((0, _actions3.setSelectedElement)(deleteDialogParams.layer, elementId, false));
      });
      dispatch((0, _actions3.startHistoryItem)(deleteDialogParams.elementIds, deleteDialogParams.layer));
      dispatch((0, _actions3.removeShapes)(deleteDialogParams.layer, deleteDialogParams.elementIds));
      dispatch((0, _actions3.finishHistoryItem)(deleteDialogParams.elementIds, deleteDialogParams.layer));
      dispatch((0, _actions.decrementTotalShapes)(deleteDialogParams.elementIds.length));
      dispatch((0, _actions.selectShape)('', '', 'reset'));
      dispatch((0, _actions.setNewDraggablePointMode)(false));
    }

    dispatch((0, _actions2.setDeleteDialogParams)({
      elementIds: [],
      layer: '',
      open: false
    }));
  }, [dispatch, deleteDialogParams]);
  (0, _react.useEffect)(function () {
    if (preLoading && !mockFinishLoading) {
      setMockFinishLoading(setTimeout(function () {
        dispatch((0, _actions2.setPreLoading)(false));
      }, 5000));
    } else if (canceledPreLoading && mockFinishLoading) {
      clearTimeout(mockFinishLoading);
    }
  }, [preLoading, dispatch, mockFinishLoading, setMockFinishLoading, canceledPreLoading]);
  return {
    isRightDrawerOpened: isRightDrawerOpened,
    drawerToggleAction: drawerToggleAction,
    isDeleteDialogOpen: deleteDialogParams.open,
    multiple: deleteDialogParams.elementIds && deleteDialogParams.elementIds.length > 0,
    onDeleteConfirm: onDeleteConfirm,
    preLoading: preLoading
  };
};

var _default = useDashboard;
exports.default = _default;