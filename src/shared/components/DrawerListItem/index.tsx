import { Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
  Lock as LockedIcon,
  LockOpen as UnlockedIcon,
  Visibility as VisibleIcon,
  VisibilityOff as InvisibleIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { isNil } from 'lodash';
import React, { Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { selectShape } from '../../../redux/canvas/actions';
import { setSelectedElement, toggleLock, toggleVisibility } from '../../../redux/stage/actions';
import { getRespectiveLayerSolarType } from '../../../redux/stage/helpers';
import { lockedTypes } from '../../helpers/polygons.helper';
import { SolarType } from '../../models/Solar.type';
import useStyles from './styles';
import { DrawerListItemProps } from './types';

const DrawerListItem: React.FC<DrawerListItemProps> = ({
  id,
  icon,
  label,
  selected,
  action,
  expanded,
  subItems,
  isSubItem,
  parentId,
  visible,
  locked,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedLayerName = useSelector((state: RootState) => state.canvas.selectedLayerName);
  const selectedShapeElementIds = useSelector((state: RootState) => state.canvas.selectedShapeElementIds);

  const onClick = useCallback(
    (e: any) => {
      if (action) {
        action(id, parentId || '', e.ctrlKey || e.metaKey ? 'add' : 'reset');
      }
    },
    [id, parentId, action],
  );

  const onVisibilityClick = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        toggleVisibility({
          layer: parentId || '',
          id: id,
        }),
      );

      if (!!selected) {
        selectedShapeElementIds.forEach((elementId: string) => {
          dispatch(setSelectedElement(selectedLayerName, elementId, false));
        });

        dispatch(selectShape('', '', 'reset'));
      }
    },
    [dispatch, id, parentId, selected, selectedLayerName, selectedShapeElementIds],
  );

  const onLockClick = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        toggleLock({
          layer: parentId || '',
          id: id,
        }),
      );

      if (!!selected) {
        selectedShapeElementIds.forEach((elementId: string) => {
          dispatch(setSelectedElement(selectedLayerName, elementId, false));
        });

        dispatch(selectShape('', '', 'reset'));
      }
    },
    [dispatch, id, parentId, selected, selectedLayerName, selectedShapeElementIds],
  );

  return (
    <Fragment>
      <ListItem
        button
        onClick={onClick}
        selected={!!selected}
        className={clsx({
          [classes.subItem]: isSubItem,
        })}
        classes={{
          selected: clsx({
            [classes.selectedWithSubList]: subItems && subItems.length,
          }),
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>

        <ListItemText primary={label} />

        {subItems && subItems.length ? <Fragment>{expanded ? <ExpandLess /> : <ExpandMore />}</Fragment> : null}

        {!isNil(visible) ? (
          <IconButton onClick={onVisibilityClick}>{visible ? <VisibleIcon /> : <InvisibleIcon />}</IconButton>
        ) : null}

        {!isNil(locked) ? (
          <IconButton
            onClick={onLockClick}
            disabled={lockedTypes.includes(getRespectiveLayerSolarType(parentId as SolarType))}
          >
            {!locked ? <UnlockedIcon /> : <LockedIcon />}
          </IconButton>
        ) : null}
      </ListItem>

      {subItems && subItems.length ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.subList}>
          <List component="div" disablePadding>
            {subItems.map(item => (
              <DrawerListItem key={item.id} {...item} isSubItem={true} parentId={id} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </Fragment>
  );
};

export default React.memo(DrawerListItem);
