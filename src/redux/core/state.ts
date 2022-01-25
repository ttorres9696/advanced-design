import { ModuleSpec } from '../../shared/models/SolarDesign.interface';

export interface DeleteDialogParams {
  elementIds: string[];
  layer: string;
  open: boolean;
}

export interface WindowDimension {
  width: number;
  height: number;
}

export interface CoreState {
  moduleSpecs?: ModuleSpec[];
  deleteDialogParams: DeleteDialogParams;
  windowDimension?: WindowDimension;
  preLoading: boolean;
  canceledPreLoading: boolean;
  totalProduction: number;
}

const initialState: CoreState = {
  moduleSpecs: undefined,
  deleteDialogParams: {
    elementIds: [],
    layer: '',
    open: false,
  },
  windowDimension: undefined,
  preLoading: true,
  canceledPreLoading: false,
  totalProduction: 0,
};

export default initialState;
