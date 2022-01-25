import { Reducer, Store } from 'redux';
import { CanvasState } from './canvas/state';
import { CoreState } from './core/state';
import { StageState } from './stage/state';
export interface RootState {
    stage: StageState;
    canvas: CanvasState;
    core: CoreState;
}
export declare const rootReducer: Reducer<RootState>;
declare const store: Store;
export declare type AppDispatch = typeof store.dispatch;
export default store;
