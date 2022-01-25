import { CoreState } from './state';
import { CoreActionTypes } from './types';
declare const canvasReducer: (state: CoreState | undefined, action: CoreActionTypes) => CoreState;
export default canvasReducer;
