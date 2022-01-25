import { cloneDeep } from 'lodash';

import { addNewPoint } from '../../shared/helpers/polygons.helper';
import { SolarElement } from '../../shared/models/SolarElement.interface';
import { getSolarTypeLayer, mapShape } from './helpers';
import initialState, { HistoryItem, ModuleSpecStage, SolarElementsById, StageState } from './state';
import {
  ADD_NEW_DRAGGABLE_POINT,
  ADD_SHAPE,
  CLEAR_TRANSFORMER_NODES_STATE,
  FINISH_HISTORY_ITEM,
  IMPORT_DATA,
  REDO_HISTORY,
  REMOVE_DRAGGABLE_POINT,
  REMOVE_SHAPE,
  RESET_HISTORY,
  SET_SELECTED_ELEMENT,
  SET_SELECTED_MODULE_SPEC,
  SET_TRANSFORMER_NODES,
  StageActionTypes,
  START_HISTORY_ITEM,
  TOGGLE_LOCK,
  TOGGLE_MODULE,
  TOGGLE_VISIBILITY,
  UNDO_HISTORY,
  UPDATE_SHAPE,
} from './types';

const stageReducer = (state = initialState, action: StageActionTypes): StageState => {
  const selectedModuleSpec = state.selectedModuleSpec;

  switch (action.type) {
    /**
     * ADD A NEW SHAPE
     * 1- get shape layer by its type
     * 2- prepare the shape applying the default multiplier scale for better visualization in the canvas
     * 3- add it to the its layer to be rendered
     */
    case ADD_SHAPE:
      const addShapeLayer = getSolarTypeLayer(action.payload.element.type);

      const preparedSolarElement = mapShape(action.payload.element);
      preparedSolarElement.shape.version = 1;

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [action.payload.moduleSeries]: {
            ...state.moduleSpecsStages[action.payload.moduleSeries],
            layers: {
              ...state.moduleSpecsStages[action.payload.moduleSeries].layers,
              [addShapeLayer]: {
                ...state.moduleSpecsStages[action.payload.moduleSeries].layers[addShapeLayer],
                [action.payload.element.id]: preparedSolarElement,
              },
            },
          },
        },
      };

    /**
     * UPDATE SHAPE PARAMS
     * It can update any shape parameter including its points, radius, etc.
     */
    case UPDATE_SHAPE:
      const updateShapeLayer = getSolarTypeLayer(action.payload.type);

      const elementClone = cloneDeep(
        state.moduleSpecsStages[selectedModuleSpec!.series].layers[updateShapeLayer][action.payload.id],
      );

      if (
        Object.keys(state.moduleSpecsStages[selectedModuleSpec!.series].layers[updateShapeLayer]).indexOf(
          action.payload.id,
        ) <
        Object.keys(state.moduleSpecsStages[selectedModuleSpec!.series].layers[updateShapeLayer]).length - 1
      ) {
        delete state.moduleSpecsStages[selectedModuleSpec!.series].layers[updateShapeLayer][action.payload.id];
      }

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [updateShapeLayer]: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[updateShapeLayer],
                [action.payload.id]: {
                  ...elementClone,
                  ...action.payload,
                },
              },
            },
          },
        },
      };

    /**
     * REMOVE A SHAPE
     */
    case REMOVE_SHAPE:
      const parentLayer = cloneDeep(state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer]);

      action.payload.elementIds.forEach((elementId: string) => {
        delete parentLayer[elementId];
      });

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [action.payload.layer]: {
                ...parentLayer,
              },
            },
          },
        },
      };

    /**
     * ADD A NEW DRAGGABLE POINT
     * 1- get the current shape points
     * 2- create a rectangle for each 2-points combination to check if the new point is between them
     * 3- if so, the new point will be inserted between them
     * 4- otherwise, find the closest point, detect in which side the new draggable point will be and insert it
     * 5- update the shape points in the state
     */
    case ADD_NEW_DRAGGABLE_POINT:
      const currentPoints: number[][] =
        state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][action.payload.elementId].shape
          .points;

      const pointsWithNewOne: number[][] = addNewPoint(currentPoints, action.payload.newPoint);

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [action.payload.layer]: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer],
                [action.payload.elementId]: {
                  ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                    action.payload.elementId
                  ],
                  shape: {
                    ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                      action.payload.elementId
                    ].shape,
                    points: pointsWithNewOne,
                  },
                },
              },
            },
          },
        },
      };

    /**
     * REMOVE A DRAGGBLE POINT BY ITS POSITION IN THE SHAPE POINTS ARRAY
     */
    case REMOVE_DRAGGABLE_POINT:
      const pointsWithoutChosenPointToBeDeleted = Array.from(
        state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][action.payload.elementId].shape
          .points,
      );
      pointsWithoutChosenPointToBeDeleted.splice(action.payload.pointIndex, 1);

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [action.payload.layer]: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer],
                [action.payload.elementId]: {
                  ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                    action.payload.elementId
                  ],
                  shape: {
                    ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                      action.payload.elementId
                    ].shape,
                    points: pointsWithoutChosenPointToBeDeleted,
                  },
                },
              },
            },
          },
        },
      };

    /**
     * TOGGLE THE ELEMENT VISIBILITY IN THE CANVAS
     */
    case TOGGLE_VISIBILITY:
      if (!action.payload.layer) {
        return state;
      }

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [action.payload.layer]: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer],
                [action.payload.id]: {
                  ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                    action.payload.id
                  ],
                  shape: {
                    ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                      action.payload.id
                    ].shape,
                    visible: !state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                      action.payload.id
                    ].shape.visible,
                  },
                },
              },
            },
          },
        },
      };

    /**
     * TOGGLE IF THE ELEMENT IS LOCKED OR NOT FOR EDITION
     */
    case TOGGLE_LOCK:
      if (!action.payload.layer) {
        return state;
      }

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [action.payload.layer]: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer],
                [action.payload.id]: {
                  ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                    action.payload.id
                  ],
                  shape: {
                    ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                      action.payload.id
                    ].shape,
                    locked: !state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                      action.payload.id
                    ].shape.locked,
                  },
                },
              },
            },
          },
        },
      };

    /**
     * IMPORT DATA FROM API AFTER USER UPLOADS THE DXF FILE
     */
    case IMPORT_DATA:
      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              trees: action.payload.layers.trees.reduce((map, obj) => {
                map[obj.id] = mapShape(obj);
                return map;
              }, {}),
              roofs: action.payload.layers.roofs.reduce((map, obj) => {
                map[obj.id] = mapShape(obj);
                return map;
              }, {}),
              setbacks: action.payload.layers.setbacks.reduce((map, obj) => {
                map[obj.id] = mapShape(obj);
                return map;
              }, {}),
              modules: action.payload.layers.modules.reduce((map, obj) => {
                map[obj.id] = mapShape(obj);
                return map;
              }, {}),
              obstructions: action.payload.layers.obstructions.reduce((map, obj) => {
                map[obj.id] = mapShape(obj);
                return map;
              }, {}),
            },
          },
        },
      };

    /**
     * RESET MODIFICATIONS
     */
    case RESET_HISTORY:
      const resetHistoryLayers = {
        ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
      };

      if (state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex >= 0) {
        const modifications = state.moduleSpecsStages[selectedModuleSpec!.series].history
          .slice(0, state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex + 1)
          .reverse();

        modifications.forEach((batch: HistoryItem[]) => {
          batch.forEach((modification: HistoryItem) => {
            switch (modification.action) {
              case 'added':
                delete resetHistoryLayers[modification.layer][modification.elementId];
                break;

              case 'updated':
              case 'deleted':
                resetHistoryLayers[modification.layer] = {
                  ...resetHistoryLayers[modification.layer],
                  [modification.elementId]: cloneDeep(modification.oldElement),
                };
                break;

              default:
                break;
            }
          });
        });
      }

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...resetHistoryLayers,
            },
            activeHistoryIndex: -1,
            pendingHistoryBatch: [],
          },
        },
      };

    /**
     * UNDO LAST MODIFICATION
     */
    case UNDO_HISTORY:
      const undoHistoryLayers = {
        ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
      };

      if (state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex >= 0) {
        const previousHistoryBatch =
          state.moduleSpecsStages[selectedModuleSpec!.series].history[
            state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex
          ];

        previousHistoryBatch.forEach((previousHistoryItem: HistoryItem) => {
          switch (previousHistoryItem.action) {
            case 'added':
              delete undoHistoryLayers[previousHistoryItem.layer][previousHistoryItem.elementId];
              break;

            case 'updated':
            case 'deleted':
              undoHistoryLayers[previousHistoryItem.layer] = {
                ...undoHistoryLayers[previousHistoryItem.layer],
                [previousHistoryItem.elementId]: cloneDeep(previousHistoryItem.oldElement),
              };
              break;

            default:
              break;
          }
        });
      }

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...undoHistoryLayers,
            },
            activeHistoryIndex: state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex - 1,
            pendingHistoryBatch: [],
          },
        },
      };

    /**
     * REDO THE LAST MODIFICATION
     */
    case REDO_HISTORY:
      const redoHistoryLayers = {
        ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
      };

      if (
        state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex + 1 <=
        state.moduleSpecsStages[selectedModuleSpec!.series].history.length
      ) {
        const nextHistoryBatch =
          state.moduleSpecsStages[selectedModuleSpec!.series].history[
            state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex + 1
          ];

        nextHistoryBatch.forEach((nextHistoryItem: HistoryItem) => {
          switch (nextHistoryItem.action) {
            case 'added':
            case 'updated':
              redoHistoryLayers[nextHistoryItem.layer] = {
                ...redoHistoryLayers[nextHistoryItem.layer],
                [nextHistoryItem.elementId]: cloneDeep(nextHistoryItem.newElement),
              };
              break;

            case 'deleted':
              delete redoHistoryLayers[nextHistoryItem.layer][nextHistoryItem.elementId];
              break;

            default:
              break;
          }
        });
      }

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...redoHistoryLayers,
            },
            activeHistoryIndex: state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex + 1,
            pendingHistoryBatch: [],
          },
        },
      };

    /**
     * DEFINE THE PREVIOUS VERSION OF AN ELEMENT THAT WILL PROBABLY BE EDITED/REMOVED
     */
    case START_HISTORY_ITEM:
      if (state.moduleSpecsStages[selectedModuleSpec!.series].pendingHistoryBatch.length > 0) {
        return state;
      }

      const pendingHistoryBatch: HistoryItem[] = action.payload.ids.map((elementId: string) => {
        const oldElement = cloneDeep(
          state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][elementId] || {},
        );

        return {
          action: Object.keys(oldElement).length > 0 ? 'updated' : 'added',
          layer: action.payload.layer,
          elementId,
          oldElement,
        } as HistoryItem;
      });

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            pendingHistoryBatch,
          },
        },
      };

    /**
     * DEFINE THE NEW VERSION OF AN EDITED/REMOVED ELEMENT AND MARK A NEW HISTORY ITEM AS COMPLETED
     */
    case FINISH_HISTORY_ITEM:
      if (state.moduleSpecsStages[selectedModuleSpec!.series].pendingHistoryBatch.length === 0) {
        return state;
      }

      let finishedHistory = Array.from(state.moduleSpecsStages[selectedModuleSpec!.series].history);

      if (state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex < finishedHistory.length - 1) {
        finishedHistory = finishedHistory.slice(
          0,
          state.moduleSpecsStages[selectedModuleSpec!.series].activeHistoryIndex + 1,
        );
      }

      const finishedElements: SolarElementsById = action.payload.ids.reduce(
        (result: SolarElementsById, elementId: string) => {
          if (state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][elementId]) {
            result[elementId] = cloneDeep({
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][elementId],
              shape: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][elementId].shape,
                version:
                  state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][elementId].shape
                    .version + 1,
              },
            } as SolarElement);
          }
          return result;
        },
        {},
      );

      const newLayers = { ...state.moduleSpecsStages[selectedModuleSpec!.series].layers };
      let newHistoryItems: HistoryItem[] = Array.from(
        state.moduleSpecsStages[selectedModuleSpec!.series].pendingHistoryBatch,
      );

      if (finishedElements && Object.keys(finishedElements).length > 0) {
        newHistoryItems = newHistoryItems.map((pendingHistoryItem: HistoryItem) => ({
          ...pendingHistoryItem,
          newElement: finishedElements[pendingHistoryItem.elementId],
        }));

        newLayers[action.payload.layer] = {
          ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer],
          ...finishedElements,
        };
      } else {
        newHistoryItems = newHistoryItems.map((pendingHistoryItem: HistoryItem) => ({
          ...pendingHistoryItem,
          action: 'deleted',
          newElement: undefined,
        }));
      }

      finishedHistory.push(newHistoryItems);

      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: newLayers,
            history: finishedHistory,
            activeHistoryIndex: finishedHistory.length - 1,
            pendingHistoryBatch: [],
          },
        },
      };

    case SET_SELECTED_ELEMENT:
      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              [action.payload.layer]: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer],
                [action.payload.elementId]: {
                  ...state.moduleSpecsStages[selectedModuleSpec!.series].layers[action.payload.layer][
                    action.payload.elementId
                  ],
                  selected: action.payload.selected,
                },
              },
            },
          },
        },
      };

    case SET_SELECTED_MODULE_SPEC:
      let moduleSpecStage: ModuleSpecStage = state.moduleSpecsStages[action.payload.series];

      if (!moduleSpecStage) {
        moduleSpecStage = {
          layers: {
            trees: {},
            roofs: {},
            setbacks: {},
            modules: {},
            obstructions: {},
          },
          pendingHistoryBatch: [],
          history: [],
          activeHistoryIndex: -1,
        };
      }

      return {
        ...state,
        selectedModuleSpec: action.payload,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [action.payload.series]: moduleSpecStage,
        },
      };

    case SET_TRANSFORMER_NODES:
      return {
        ...state,
        transformerNodes: {
          selectionType: action.payload.selectionType,
          elementIds: action.payload.elementIds,
        },
      };

    case CLEAR_TRANSFORMER_NODES_STATE:
      return {
        ...state,
        transformerNodes: undefined,
      };

    case TOGGLE_MODULE:
      return {
        ...state,
        moduleSpecsStages: {
          ...state.moduleSpecsStages,
          [selectedModuleSpec!.series]: {
            ...state.moduleSpecsStages[selectedModuleSpec!.series],
            layers: {
              ...state.moduleSpecsStages[selectedModuleSpec!.series].layers,
              modules: {
                ...state.moduleSpecsStages[selectedModuleSpec!.series].layers.modules,
                [action.payload.elementId]: {
                  ...state.moduleSpecsStages[selectedModuleSpec!.series].layers.modules[action.payload.elementId],
                  active: !state.moduleSpecsStages[selectedModuleSpec!.series].layers.modules[action.payload.elementId]
                    .active,
                },
              },
            },
          },
        },
      };

    default:
      return state;
  }
};

export default stageReducer;
