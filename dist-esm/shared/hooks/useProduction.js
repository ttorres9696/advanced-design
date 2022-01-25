"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _actions = require("../../redux/core/actions");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useProduction = function useProduction(_ref) {
  var onProductionChange = _ref.onProductionChange;
  var dispatch = (0, _reactRedux.useDispatch)();
  var selectedModuleSpec = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec;
  });
  var productionValue = (0, _reactRedux.useSelector)(function (state) {
    return state.core.totalProduction;
  });
  var activeModulesLength = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? Object.values(state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].layers.modules).filter(function (module) {
      return module.active;
    }).length : 0;
  });
  var history = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].history : [];
  });
  var historyActiveIndex = (0, _reactRedux.useSelector)(function (state) {
    return state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec.series].activeHistoryIndex : -1;
  });

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      historyLength = _useState2[0],
      setHistoryLength = _useState2[1];

  var _useState3 = (0, _react.useState)(-1),
      _useState4 = _slicedToArray(_useState3, 2),
      previousActiveIndex = _useState4[0],
      setPreviousActiveIndex = _useState4[1];

  var isElementFromModulesLayer = (0, _react.useCallback)(function (layerName) {
    return layerName === 'modules';
  }, []);
  var doesElementHaveProductionValue = (0, _react.useCallback)(function (oldVersion, newVersion) {
    return !!oldVersion && !!oldVersion.production || !!newVersion && !!newVersion.production;
  }, []);
  var checkActiveModules = (0, _react.useCallback)(function (elementId, previousVersion, currentVersion) {
    var previousActiveStatus = previousVersion && previousVersion.active;
    var currentActiveStatus = currentVersion && currentVersion.active;
    var currentProductionValue = currentVersion && currentVersion.production ? currentVersion.production : 0;

    if (!previousActiveStatus && currentActiveStatus) {
      // increase total production value
      dispatch((0, _actions.increaseProductionValue)(currentProductionValue));
    } else if (previousActiveStatus && !currentActiveStatus) {
      // decrease total production value
      dispatch((0, _actions.decreaseProductionValue)(currentProductionValue));
    }
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    if (historyActiveIndex === -1) {
      dispatch(_actions.resetProductionValue);
      setPreviousActiveIndex(historyActiveIndex);
      return;
    }

    if (history.length !== historyLength) {
      setHistoryLength(history.length);
    }

    var moduleChanges = historyActiveIndex >= 0 ? history[historyActiveIndex].filter(function (item) {
      return isElementFromModulesLayer(item.layer) && doesElementHaveProductionValue(item.oldElement, item.newElement);
    }) : [];

    if (moduleChanges.length > 0 && historyActiveIndex !== previousActiveIndex) {
      moduleChanges.forEach(function (item) {
        var _ref2 = previousActiveIndex < historyActiveIndex ? [item.oldElement, item.newElement] : [item.newElement, item.oldElement],
            _ref3 = _slicedToArray(_ref2, 2),
            previousVersion = _ref3[0],
            currentVersion = _ref3[1];

        checkActiveModules(item.elementId, previousVersion, currentVersion);
      });
    }

    setPreviousActiveIndex(historyActiveIndex);
  }, [dispatch, history, historyActiveIndex, historyLength, setHistoryLength, previousActiveIndex, setPreviousActiveIndex, isElementFromModulesLayer, doesElementHaveProductionValue, checkActiveModules]);
  var getSystemSize = (0, _react.useCallback)(function () {
    return selectedModuleSpec ? activeModulesLength * selectedModuleSpec.wattage : 0;
  }, [selectedModuleSpec, activeModulesLength]);
  (0, _react.useEffect)(function () {
    if (onProductionChange) {
      onProductionChange(productionValue, getSystemSize());
    }
  }, [productionValue, onProductionChange, getSystemSize]);
};

var _default = useProduction;
exports.default = _default;