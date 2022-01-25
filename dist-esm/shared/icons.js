"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddIcon", {
  enumerable: true,
  get: function get() {
    return _icons.AddBox;
  }
});
Object.defineProperty(exports, "SetbacksIcon", {
  enumerable: true,
  get: function get() {
    return _icons.AllOut;
  }
});
Object.defineProperty(exports, "CircularObstructionsIcon", {
  enumerable: true,
  get: function get() {
    return _icons.CancelOutlined;
  }
});
Object.defineProperty(exports, "ObstructionsIcon", {
  enumerable: true,
  get: function get() {
    return _icons.CancelPresentation;
  }
});
Object.defineProperty(exports, "ElementsIcon", {
  enumerable: true,
  get: function get() {
    return _icons.Folder;
  }
});
Object.defineProperty(exports, "GeneralListItem", {
  enumerable: true,
  get: function get() {
    return _icons.LabelSharp;
  }
});
Object.defineProperty(exports, "LayersIcon", {
  enumerable: true,
  get: function get() {
    return _icons.Layers;
  }
});
Object.defineProperty(exports, "RoofsIcon", {
  enumerable: true,
  get: function get() {
    return _icons.LineStyle;
  }
});
Object.defineProperty(exports, "LoadingIcon", {
  enumerable: true,
  get: function get() {
    return _icons.Loop;
  }
});
Object.defineProperty(exports, "TreesIcon", {
  enumerable: true,
  get: function get() {
    return _icons.Nature;
  }
});
Object.defineProperty(exports, "ModulesIcon", {
  enumerable: true,
  get: function get() {
    return _icons.WbSunny;
  }
});
exports.getLayerIcon = void 0;

var _icons = require("@material-ui/icons");

var getLayerIcon = function getLayerIcon(layer, type) {
  switch (layer) {
    case 'roofs':
      return _icons.LineStyle;

    case 'modules':
      return _icons.WbSunny;

    case 'obstructions':
      if (type === 'circle') {
        return _icons.CancelOutlined;
      } else {
        return _icons.CancelPresentation;
      }

    case 'trees':
      return _icons.Nature;

    case 'setbacks':
      return _icons.AllOut;

    default:
      return _icons.LabelSharp;
  }
};

exports.getLayerIcon = getLayerIcon;