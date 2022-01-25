import { CanvasState } from './state';
import { CanvasActionTypes } from './types';
declare const canvasReducer: (state: CanvasState | undefined, action: CanvasActionTypes) => CanvasState;
export default canvasReducer;
