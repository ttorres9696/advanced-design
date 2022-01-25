import { AppDispatch } from '..';
import { ModuleSpec } from '../../shared/models/SolarDesign.interface';
import { fetchModules } from '../api/aux';
import { DeleteDialogParams, WindowDimension } from './state';
import {
  CANCEL_PRE_LOADING,
  CoreActionTypes,
  DECREASE_PRODUCTION_VALUE,
  FETCHED_MODULE_SPECS,
  INCREASE_PRODUCTION_VALUE,
  RESET_PRODUCTION_VALUE,
  SET_DELETE_DIALOG_PARAMS,
  SET_PRE_LOADING,
  SET_WINDOW_DIMENSION,
} from './types';

export const fetchedModuleSpecs = (moduleSpecs: ModuleSpec[]): CoreActionTypes => {
  return {
    type: FETCHED_MODULE_SPECS,
    payload: moduleSpecs,
  };
};

export const fetchModuleSpecs: Function = () => (dispatch: AppDispatch) =>
  fetchModules()
    .then(moduleSpecs => dispatch(fetchedModuleSpecs(moduleSpecs)))
    .catch(error => {
      dispatch(fetchedModuleSpecs([]));
      console.error(error);
    });

export const setDeleteDialogParams = (params: DeleteDialogParams): CoreActionTypes => {
  return {
    type: SET_DELETE_DIALOG_PARAMS,
    payload: params,
  };
};

export const setWindowDimension = (dimension: WindowDimension): CoreActionTypes => {
  return {
    type: SET_WINDOW_DIMENSION,
    payload: dimension,
  };
};

export const setPreLoading = (loading: boolean): CoreActionTypes => {
  return {
    type: SET_PRE_LOADING,
    payload: loading,
  };
};

export const cancelPreLoading = (): CoreActionTypes => {
  return {
    type: CANCEL_PRE_LOADING,
  };
};

export const decreaseProductionValue = (amount: number): CoreActionTypes => {
  return {
    type: DECREASE_PRODUCTION_VALUE,
    payload: amount,
  };
};

export const increaseProductionValue = (amount: number): CoreActionTypes => {
  return {
    type: INCREASE_PRODUCTION_VALUE,
    payload: amount,
  };
};

export const resetProductionValue = (): CoreActionTypes => {
  return {
    type: RESET_PRODUCTION_VALUE,
  };
};
