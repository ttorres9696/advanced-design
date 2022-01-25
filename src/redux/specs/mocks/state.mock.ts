import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SolarElement } from '../../../shared/models/SolarElement.interface';
import { CanvasState } from '../../canvas/state';
import { CoreState } from '../../core/state';
import { StageState } from '../../stage/state';

export const mockSolarElement: SolarElement = {
  id: 'solar-module-1',
  roof_id: 'roof-1',
  type: 'module',
  shape: {
    points: [
      [71.4996, 57.8602],
      [64.2361, 50.3333],
      [54.0292, 60.183],
      [61.2926, 67.7099],
    ],
    type: 'polygon',
    x: 20,
    y: 20,
  },
};

const mockStore = configureStore([thunk])({
  core: {
    moduleSpecs: [
      {
        name: 'X22-370-D-AC',
        series: 'E/X',
        size: [3.34838448, 5.1114864],
        spacing: [0.08333232, 0.04166616],
        wattage: 370,
      },
    ],
    deleteDialogParams: {
      elementIds: [],
      layer: '',
      open: false,
    },
    windowDimension: {
      width: 400,
      height: 400,
    },
    preLoading: false,
    canceledPreLoading: false,
    totalProduction: 0,
  } as CoreState,
  canvas: {
    selectedShapeElementIds: [mockSolarElement.id],
    scale: 1,
    canvasOrigin: { x: 0, y: 0 },
    selectedLayerName: 'modules',
    totalShapes: 1,
    magnetMode: true,
    selectMode: false,
  } as CanvasState,
  stage: {
    selectedModuleSpec: {
      name: 'X22-370-D-AC',
      series: 'E/X',
      size: [3.34838448, 5.1114864],
      spacing: [0.08333232, 0.04166616],
      wattage: 370,
    },
    moduleSpecsStages: {
      'E/X': {
        layers: {
          trees: {},
          roofs: {},
          setbacks: {},
          obstructions: {},
          modules: {
            [mockSolarElement.id]: mockSolarElement,
          },
        },
        pendingHistoryBatch: [],
        history: [],
        activeHistoryIndex: -1,
      },
    },
    layersOrder: ['trees', 'roofs', 'setbacks', 'modules', 'obstructions'],
  } as StageState,
});

export default mockStore;
