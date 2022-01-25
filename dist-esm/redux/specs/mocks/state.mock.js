"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mockSolarElement = void 0;

var _reduxMockStore = _interopRequireDefault(require("redux-mock-store"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockSolarElement = {
  id: 'solar-module-1',
  roof_id: 'roof-1',
  type: 'module',
  shape: {
    points: [[71.4996, 57.8602], [64.2361, 50.3333], [54.0292, 60.183], [61.2926, 67.7099]],
    type: 'polygon',
    x: 20,
    y: 20
  }
};
exports.mockSolarElement = mockSolarElement;
var mockStore = (0, _reduxMockStore.default)([_reduxThunk.default])({
  core: {
    moduleSpecs: [{
      name: 'X22-370-D-AC',
      series: 'E/X',
      size: [3.34838448, 5.1114864],
      spacing: [0.08333232, 0.04166616],
      wattage: 370
    }],
    deleteDialogParams: {
      elementIds: [],
      layer: '',
      open: false
    },
    windowDimension: {
      width: 400,
      height: 400
    },
    preLoading: false,
    canceledPreLoading: false,
    totalProduction: 0
  },
  canvas: {
    selectedShapeElementIds: [mockSolarElement.id],
    scale: 1,
    canvasOrigin: {
      x: 0,
      y: 0
    },
    selectedLayerName: 'modules',
    totalShapes: 1,
    magnetMode: true,
    selectMode: false
  },
  stage: {
    selectedModuleSpec: {
      name: 'X22-370-D-AC',
      series: 'E/X',
      size: [3.34838448, 5.1114864],
      spacing: [0.08333232, 0.04166616],
      wattage: 370
    },
    moduleSpecsStages: {
      'E/X': {
        layers: {
          trees: {},
          roofs: {},
          setbacks: {},
          obstructions: {},
          modules: _defineProperty({}, mockSolarElement.id, mockSolarElement)
        },
        pendingHistoryBatch: [],
        history: [],
        activeHistoryIndex: -1
      }
    },
    layersOrder: ['trees', 'roofs', 'setbacks', 'modules', 'obstructions']
  }
});
var _default = mockStore;
exports.default = _default;