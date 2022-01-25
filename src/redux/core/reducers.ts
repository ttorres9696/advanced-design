import initialState, { CoreState } from './state';
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

const canvasReducer = (state = initialState, action: CoreActionTypes): CoreState => {
  switch (action.type) {
    /**
     * STORE THE MODULE SPECS OPTIONS WHEN IT'S RETURNED BY API
     */
    case FETCHED_MODULE_SPECS:
      return {
        ...state,
        moduleSpecs: action.payload,
      };

    /**
     * DEFINE THE DELETE DIALOG PARAMS TO CONFIRM A SHAPE DELETION
     */
    case SET_DELETE_DIALOG_PARAMS:
      return {
        ...state,
        deleteDialogParams: {
          ...action.payload,
        },
      };

    /**
     * SET WINDOW DIMENSION THAT WILL BE USED FOR CANVAS' STAGE SIZE AND FOR RESPONSIVE ELEMENTS
     */
    case SET_WINDOW_DIMENSION:
      return {
        ...state,
        windowDimension: action.payload,
      };

    /**
     * SET APP PRE LOADING
     */
    case SET_PRE_LOADING:
      return {
        ...state,
        preLoading: action.payload,
      };

    /**
     * CANCEL APP PRE LOADING
     */
    case CANCEL_PRE_LOADING:
      return {
        ...state,
        canceledPreLoading: true,
      };

    /**
     * DECREASE PRODUCTION VALUE
     */
    case DECREASE_PRODUCTION_VALUE:
      let decreasedProductionValue = state.totalProduction - action.payload;

      if (decreasedProductionValue < 0) {
        decreasedProductionValue = 0;
      }

      return {
        ...state,
        totalProduction: decreasedProductionValue,
      };

    /**
     * INCREASE PRODUCTION VALUE
     */
    case INCREASE_PRODUCTION_VALUE:
      return {
        ...state,
        totalProduction: state.totalProduction + action.payload,
      };

    /**
     * RESET PRODUCTION VALUE
     */
    case RESET_PRODUCTION_VALUE:
      return {
        ...state,
        totalProduction: 0,
      };

    default:
      return state;
  }
};

export default canvasReducer;
