import {
  AddBox as AddIcon,
  AllOut as SetbacksIcon,
  CancelOutlined as CircularObstructionsIcon,
  CancelPresentation as ObstructionsIcon,
  Folder as ElementsIcon,
  LabelSharp as GeneralListItem,
  Layers as LayersIcon,
  LineStyle as RoofsIcon,
  Loop as LoadingIcon,
  Nature as TreesIcon,
  SvgIconComponent,
  WbSunny as ModulesIcon,
} from '@material-ui/icons';

import { ShapeElementType } from './components/ShapeElement/types';

export {
  LayersIcon,
  RoofsIcon,
  ModulesIcon,
  ElementsIcon,
  ObstructionsIcon,
  CircularObstructionsIcon,
  GeneralListItem,
  TreesIcon,
  SetbacksIcon,
  AddIcon,
  LoadingIcon,
};

export const getLayerIcon = (layer: string, type?: ShapeElementType): SvgIconComponent => {
  switch (layer) {
    case 'roofs':
      return RoofsIcon;

    case 'modules':
      return ModulesIcon;

    case 'obstructions':
      if (type === 'circle') {
        return CircularObstructionsIcon;
      } else {
        return ObstructionsIcon;
      }

    case 'trees':
      return TreesIcon;

    case 'setbacks':
      return SetbacksIcon;

    default:
      return GeneralListItem;
  }
};
