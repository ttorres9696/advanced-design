import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';

import canvasReducer from './canvas/reducers';
import { CanvasState } from './canvas/state';
import coreReducer from './core/reducers';
import { CoreState } from './core/state';
import stageReducer from './stage/reducers';
import { StageState } from './stage/state';

export interface RootState {
  stage: StageState;
  canvas: CanvasState;
  core: CoreState;
}

export const rootReducer: Reducer<RootState> = combineReducers({
  stage: stageReducer,
  canvas: canvasReducer,
  core: coreReducer,
});

const store: Store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;

export default store;
