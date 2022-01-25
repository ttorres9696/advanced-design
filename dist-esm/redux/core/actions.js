"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetProductionValue = exports.increaseProductionValue = exports.decreaseProductionValue = exports.cancelPreLoading = exports.setPreLoading = exports.setWindowDimension = exports.setDeleteDialogParams = exports.fetchModuleSpecs = exports.fetchedModuleSpecs = void 0;

var _aux = require("../api/aux");

var _types = require("./types");

var fetchedModuleSpecs = function fetchedModuleSpecs(moduleSpecs) {
  return {
    type: _types.FETCHED_MODULE_SPECS,
    payload: moduleSpecs
  };
};

exports.fetchedModuleSpecs = fetchedModuleSpecs;

var fetchModuleSpecs = function fetchModuleSpecs() {
  return function (dispatch) {
    return (0, _aux.fetchModules)().then(function (moduleSpecs) {
      return dispatch(fetchedModuleSpecs(moduleSpecs));
    }).catch(function (error) {
      dispatch(fetchedModuleSpecs([]));
      console.error(error);
    });
  };
};

exports.fetchModuleSpecs = fetchModuleSpecs;

var setDeleteDialogParams = function setDeleteDialogParams(params) {
  return {
    type: _types.SET_DELETE_DIALOG_PARAMS,
    payload: params
  };
};

exports.setDeleteDialogParams = setDeleteDialogParams;

var setWindowDimension = function setWindowDimension(dimension) {
  return {
    type: _types.SET_WINDOW_DIMENSION,
    payload: dimension
  };
};

exports.setWindowDimension = setWindowDimension;

var setPreLoading = function setPreLoading(loading) {
  return {
    type: _types.SET_PRE_LOADING,
    payload: loading
  };
};

exports.setPreLoading = setPreLoading;

var cancelPreLoading = function cancelPreLoading() {
  return {
    type: _types.CANCEL_PRE_LOADING
  };
};

exports.cancelPreLoading = cancelPreLoading;

var decreaseProductionValue = function decreaseProductionValue(amount) {
  return {
    type: _types.DECREASE_PRODUCTION_VALUE,
    payload: amount
  };
};

exports.decreaseProductionValue = decreaseProductionValue;

var increaseProductionValue = function increaseProductionValue(amount) {
  return {
    type: _types.INCREASE_PRODUCTION_VALUE,
    payload: amount
  };
};

exports.increaseProductionValue = increaseProductionValue;

var resetProductionValue = function resetProductionValue() {
  return {
    type: _types.RESET_PRODUCTION_VALUE
  };
};

exports.resetProductionValue = resetProductionValue;