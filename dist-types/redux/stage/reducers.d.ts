import { StageState } from './state';
import { StageActionTypes } from './types';
declare const stageReducer: (state: StageState | undefined, action: StageActionTypes) => StageState;
export default stageReducer;
