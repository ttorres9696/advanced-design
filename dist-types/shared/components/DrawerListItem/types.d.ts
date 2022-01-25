import { ReactElement } from 'react';
import { SelectionType } from '../../../redux/canvas/types';
export interface DrawerListItemProps {
    id: string;
    icon: ReactElement;
    label: string;
    selected?: boolean;
    expanded?: boolean;
    visible?: boolean;
    locked?: boolean;
    action?: (id: string, parentId: string, selectionType: SelectionType) => void;
    subItems?: DrawerListItemProps[];
    isSubItem?: boolean;
    parentId?: string;
}
