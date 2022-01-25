"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _polygons = require("../../shared/helpers/polygons.helper");

var _helpers = require("./helpers");

var _state = _interopRequireDefault(require("./state"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stageReducer = function stageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _state.default;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var selectedModuleSpec = state.selectedModuleSpec;

  switch (action.type) {
    /**
     * ADD A NEW SHAPE
     * 1- get shape layer by its type
     * 2- prepare the shape applying the default multiplier scale for better visualization in the canvas
     * 3- add it to the its layer to be rendered
     */
    case _types.ADD_SHAPE:
      var addShapeLayer = (0, _helpers.getSolarTypeLayer)(action.payload.element.type);
      var preparedSolarElement = (0, _helpers.mapShape)(action.payload.element);
      preparedSolarElement.shape.version = 1;
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, action.payload.moduleSeries, _objectSpread(_objectSpread({}, state.moduleSpecsStages[action.payload.moduleSeries]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[action.payload.moduleSeries].layers), {}, _defineProperty({}, addShapeLayer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[action.payload.moduleSeries].layers[addShapeLayer]), {}, _defineProperty({}, action.payload.element.id, preparedSolarElement))))
        })))
      });

    /**
     * UPDATE SHAPE PARAMS
     * It can update any shape parameter including its points, radius, etc.
     */

    case _types.UPDATE_SHAPE:
      var updateShapeLayer = (0, _helpers.getSolarTypeLayer)(action.payload.type);
      var elementClone = (0, _lodash.cloneDeep)(state.moduleSpecsStages[selectedModuleSpec.series].layers[updateShapeLayer][action.payload.id]);

      if (Object.keys(state.moduleSpecsStages[selectedModuleSpec.series].layers[updateShapeLayer]).indexOf(action.payload.id) < Object.keys(state.moduleSpecsStages[selectedModuleSpec.series].layers[updateShapeLayer]).length - 1) {
        delete state.moduleSpecsStages[selectedModuleSpec.series].layers[updateShapeLayer][action.payload.id];
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, updateShapeLayer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[updateShapeLayer]), {}, _defineProperty({}, action.payload.id, _objectSpread(_objectSpread({}, elementClone), action.payload)))))
        })))
      });

    /**
     * REMOVE A SHAPE
     */

    case _types.REMOVE_SHAPE:
      var parentLayer = (0, _lodash.cloneDeep)(state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]);
      action.payload.elementIds.forEach(function (elementId) {
        delete parentLayer[elementId];
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, action.payload.layer, _objectSpread({}, parentLayer)))
        })))
      });

    /**
     * ADD A NEW DRAGGABLE POINT
     * 1- get the current shape points
     * 2- create a rectangle for each 2-points combination to check if the new point is between them
     * 3- if so, the new point will be inserted between them
     * 4- otherwise, find the closest point, detect in which side the new draggable point will be and insert it
     * 5- update the shape points in the state
     */

    case _types.ADD_NEW_DRAGGABLE_POINT:
      var currentPoints = state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId].shape.points;
      var pointsWithNewOne = (0, _polygons.addNewPoint)(currentPoints, action.payload.newPoint);
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, action.payload.layer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]), {}, _defineProperty({}, action.payload.elementId, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId]), {}, {
            shape: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId].shape), {}, {
              points: pointsWithNewOne
            })
          })))))
        })))
      });

    /**
     * REMOVE A DRAGGBLE POINT BY ITS POSITION IN THE SHAPE POINTS ARRAY
     */

    case _types.REMOVE_DRAGGABLE_POINT:
      var pointsWithoutChosenPointToBeDeleted = Array.from(state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId].shape.points);
      pointsWithoutChosenPointToBeDeleted.splice(action.payload.pointIndex, 1);
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, action.payload.layer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]), {}, _defineProperty({}, action.payload.elementId, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId]), {}, {
            shape: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId].shape), {}, {
              points: pointsWithoutChosenPointToBeDeleted
            })
          })))))
        })))
      });

    /**
     * TOGGLE THE ELEMENT VISIBILITY IN THE CANVAS
     */

    case _types.TOGGLE_VISIBILITY:
      if (!action.payload.layer) {
        return state;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, action.payload.layer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]), {}, _defineProperty({}, action.payload.id, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.id]), {}, {
            shape: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.id].shape), {}, {
              visible: !state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.id].shape.visible
            })
          })))))
        })))
      });

    /**
     * TOGGLE IF THE ELEMENT IS LOCKED OR NOT FOR EDITION
     */

    case _types.TOGGLE_LOCK:
      if (!action.payload.layer) {
        return state;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, action.payload.layer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]), {}, _defineProperty({}, action.payload.id, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.id]), {}, {
            shape: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.id].shape), {}, {
              locked: !state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.id].shape.locked
            })
          })))))
        })))
      });

    /**
     * IMPORT DATA FROM API AFTER USER UPLOADS THE DXF FILE
     */

    case _types.IMPORT_DATA:
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: {
            trees: action.payload.layers.trees.reduce(function (map, obj) {
              map[obj.id] = (0, _helpers.mapShape)(obj);
              return map;
            }, {}),
            roofs: action.payload.layers.roofs.reduce(function (map, obj) {
              map[obj.id] = (0, _helpers.mapShape)(obj);
              return map;
            }, {}),
            setbacks: action.payload.layers.setbacks.reduce(function (map, obj) {
              map[obj.id] = (0, _helpers.mapShape)(obj);
              return map;
            }, {}),
            modules: action.payload.layers.modules.reduce(function (map, obj) {
              map[obj.id] = (0, _helpers.mapShape)(obj);
              return map;
            }, {}),
            obstructions: action.payload.layers.obstructions.reduce(function (map, obj) {
              map[obj.id] = (0, _helpers.mapShape)(obj);
              return map;
            }, {})
          }
        })))
      });

    /**
     * RESET MODIFICATIONS
     */

    case _types.RESET_HISTORY:
      var resetHistoryLayers = _objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers);

      if (state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex >= 0) {
        var modifications = state.moduleSpecsStages[selectedModuleSpec.series].history.slice(0, state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex + 1).reverse();
        modifications.forEach(function (batch) {
          batch.forEach(function (modification) {
            switch (modification.action) {
              case 'added':
                delete resetHistoryLayers[modification.layer][modification.elementId];
                break;

              case 'updated':
              case 'deleted':
                resetHistoryLayers[modification.layer] = _objectSpread(_objectSpread({}, resetHistoryLayers[modification.layer]), {}, _defineProperty({}, modification.elementId, (0, _lodash.cloneDeep)(modification.oldElement)));
                break;

              default:
                break;
            }
          });
        });
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread({}, resetHistoryLayers),
          activeHistoryIndex: -1,
          pendingHistoryBatch: []
        })))
      });

    /**
     * UNDO LAST MODIFICATION
     */

    case _types.UNDO_HISTORY:
      var undoHistoryLayers = _objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers);

      if (state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex >= 0) {
        var previousHistoryBatch = state.moduleSpecsStages[selectedModuleSpec.series].history[state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex];
        previousHistoryBatch.forEach(function (previousHistoryItem) {
          switch (previousHistoryItem.action) {
            case 'added':
              delete undoHistoryLayers[previousHistoryItem.layer][previousHistoryItem.elementId];
              break;

            case 'updated':
            case 'deleted':
              undoHistoryLayers[previousHistoryItem.layer] = _objectSpread(_objectSpread({}, undoHistoryLayers[previousHistoryItem.layer]), {}, _defineProperty({}, previousHistoryItem.elementId, (0, _lodash.cloneDeep)(previousHistoryItem.oldElement)));
              break;

            default:
              break;
          }
        });
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread({}, undoHistoryLayers),
          activeHistoryIndex: state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex - 1,
          pendingHistoryBatch: []
        })))
      });

    /**
     * REDO THE LAST MODIFICATION
     */

    case _types.REDO_HISTORY:
      var redoHistoryLayers = _objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers);

      if (state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex + 1 <= state.moduleSpecsStages[selectedModuleSpec.series].history.length) {
        var nextHistoryBatch = state.moduleSpecsStages[selectedModuleSpec.series].history[state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex + 1];
        nextHistoryBatch.forEach(function (nextHistoryItem) {
          switch (nextHistoryItem.action) {
            case 'added':
            case 'updated':
              redoHistoryLayers[nextHistoryItem.layer] = _objectSpread(_objectSpread({}, redoHistoryLayers[nextHistoryItem.layer]), {}, _defineProperty({}, nextHistoryItem.elementId, (0, _lodash.cloneDeep)(nextHistoryItem.newElement)));
              break;

            case 'deleted':
              delete redoHistoryLayers[nextHistoryItem.layer][nextHistoryItem.elementId];
              break;

            default:
              break;
          }
        });
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread({}, redoHistoryLayers),
          activeHistoryIndex: state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex + 1,
          pendingHistoryBatch: []
        })))
      });

    /**
     * DEFINE THE PREVIOUS VERSION OF AN ELEMENT THAT WILL PROBABLY BE EDITED/REMOVED
     */

    case _types.START_HISTORY_ITEM:
      if (state.moduleSpecsStages[selectedModuleSpec.series].pendingHistoryBatch.length > 0) {
        return state;
      }

      var pendingHistoryBatch = action.payload.ids.map(function (elementId) {
        var oldElement = (0, _lodash.cloneDeep)(state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][elementId] || {});
        return {
          action: Object.keys(oldElement).length > 0 ? 'updated' : 'added',
          layer: action.payload.layer,
          elementId: elementId,
          oldElement: oldElement
        };
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          pendingHistoryBatch: pendingHistoryBatch
        })))
      });

    /**
     * DEFINE THE NEW VERSION OF AN EDITED/REMOVED ELEMENT AND MARK A NEW HISTORY ITEM AS COMPLETED
     */

    case _types.FINISH_HISTORY_ITEM:
      if (state.moduleSpecsStages[selectedModuleSpec.series].pendingHistoryBatch.length === 0) {
        return state;
      }

      var finishedHistory = Array.from(state.moduleSpecsStages[selectedModuleSpec.series].history);

      if (state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex < finishedHistory.length - 1) {
        finishedHistory = finishedHistory.slice(0, state.moduleSpecsStages[selectedModuleSpec.series].activeHistoryIndex + 1);
      }

      var finishedElements = action.payload.ids.reduce(function (result, elementId) {
        if (state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][elementId]) {
          result[elementId] = (0, _lodash.cloneDeep)(_objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][elementId]), {}, {
            shape: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][elementId].shape), {}, {
              version: state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][elementId].shape.version + 1
            })
          }));
        }

        return result;
      }, {});

      var newLayers = _objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers);

      var newHistoryItems = Array.from(state.moduleSpecsStages[selectedModuleSpec.series].pendingHistoryBatch);

      if (finishedElements && Object.keys(finishedElements).length > 0) {
        newHistoryItems = newHistoryItems.map(function (pendingHistoryItem) {
          return _objectSpread(_objectSpread({}, pendingHistoryItem), {}, {
            newElement: finishedElements[pendingHistoryItem.elementId]
          });
        });
        newLayers[action.payload.layer] = _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]), finishedElements);
      } else {
        newHistoryItems = newHistoryItems.map(function (pendingHistoryItem) {
          return _objectSpread(_objectSpread({}, pendingHistoryItem), {}, {
            action: 'deleted',
            newElement: undefined
          });
        });
      }

      finishedHistory.push(newHistoryItems);
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: newLayers,
          history: finishedHistory,
          activeHistoryIndex: finishedHistory.length - 1,
          pendingHistoryBatch: []
        })))
      });

    case _types.SET_SELECTED_ELEMENT:
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, _defineProperty({}, action.payload.layer, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer]), {}, _defineProperty({}, action.payload.elementId, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers[action.payload.layer][action.payload.elementId]), {}, {
            selected: action.payload.selected
          })))))
        })))
      });

    case _types.SET_SELECTED_MODULE_SPEC:
      var moduleSpecStage = state.moduleSpecsStages[action.payload.series];

      if (!moduleSpecStage) {
        moduleSpecStage = {
          layers: {
            trees: {},
            roofs: {},
            setbacks: {},
            modules: {},
            obstructions: {}
          },
          pendingHistoryBatch: [],
          history: [],
          activeHistoryIndex: -1
        };
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        selectedModuleSpec: action.payload,
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, action.payload.series, moduleSpecStage))
      });

    case _types.SET_TRANSFORMER_NODES:
      return _objectSpread(_objectSpread({}, state), {}, {
        transformerNodes: {
          selectionType: action.payload.selectionType,
          elementIds: action.payload.elementIds
        }
      });

    case _types.CLEAR_TRANSFORMER_NODES_STATE:
      return _objectSpread(_objectSpread({}, state), {}, {
        transformerNodes: undefined
      });

    case _types.TOGGLE_MODULE:
      return _objectSpread(_objectSpread({}, state), {}, {
        moduleSpecsStages: _objectSpread(_objectSpread({}, state.moduleSpecsStages), {}, _defineProperty({}, selectedModuleSpec.series, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series]), {}, {
          layers: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers), {}, {
            modules: _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers.modules), {}, _defineProperty({}, action.payload.elementId, _objectSpread(_objectSpread({}, state.moduleSpecsStages[selectedModuleSpec.series].layers.modules[action.payload.elementId]), {}, {
              active: !state.moduleSpecsStages[selectedModuleSpec.series].layers.modules[action.payload.elementId].active
            })))
          })
        })))
      });

    default:
      return state;
  }
};

var _default = stageReducer;
exports.default = _default;