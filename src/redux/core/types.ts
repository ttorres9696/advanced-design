import { ModuleSpec } from '../../shared/models/SolarDesign.interface';
import { DeleteDialogParams, WindowDimension } from './state';

export const FETCHED_MODULE_SPECS = 'FETCHED_MODULE_SPECS';
export const SET_DELETE_DIALOG_PARAMS = 'SET_DELETE_DIALOG_PARAMS';
export const SET_WINDOW_DIMENSION = 'SET_WINDOW_DIMENSION';
export const SET_PRE_LOADING = 'SET_PRE_LOADING';
export const CANCEL_PRE_LOADING = 'CANCEL_PRE_LOADING';
export const DECREASE_PRODUCTION_VALUE = 'DECREASE_PRODUCTION_VALUE';
export const INCREASE_PRODUCTION_VALUE = 'INCREASE_PRODUCTION_VALUE';
export const RESET_PRODUCTION_VALUE = 'RESET_PRODUCTION_VALUE';

interface FetchedModuleSpecsAction {
  type: typeof FETCHED_MODULE_SPECS;
  payload: ModuleSpec[];
}

interface SetDeleteDialogParamsAction {
  type: typeof SET_DELETE_DIALOG_PARAMS;
  payload: DeleteDialogParams;
}

interface SetWindowDimensionAction {
  type: typeof SET_WINDOW_DIMENSION;
  payload: WindowDimension;
}

interface SetPreLoadingAction {
  type: typeof SET_PRE_LOADING;
  payload: boolean;
}

interface CancelPreLoading {
  type: typeof CANCEL_PRE_LOADING;
}

interface DecreaseProductionValue {
  type: typeof DECREASE_PRODUCTION_VALUE;
  payload: number;
}

interface IncreaseProductionValue {
  type: typeof INCREASE_PRODUCTION_VALUE;
  payload: number;
}

interface ResetProductionValue {
  type: typeof RESET_PRODUCTION_VALUE;
}

export type CoreActionTypes =
  | FetchedModuleSpecsAction
  | SetDeleteDialogParamsAction
  | SetWindowDimensionAction
  | SetPreLoadingAction
  | CancelPreLoading
  | DecreaseProductionValue
  | IncreaseProductionValue
  | ResetProductionValue;
