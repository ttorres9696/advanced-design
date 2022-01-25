import { Drawer, List } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import DrawerListItem from '../../../shared/components/DrawerListItem';
import DxfUpload from '../../../shared/components/DxfUpload';
import { DrawerMenuProps } from '../../../shared/models/DrawerMenuProps.interface';
import useStyles from './styles';
import useLeftDrawerMenu from './useLeftDrawerMenu';

const LeftDrawerMenu: React.FC<DrawerMenuProps> = ({ opened }) => {
  const classes = useStyles();

  const { listItems, expandedItems } = useLeftDrawerMenu();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpened]: opened,
        [classes.drawerClosed]: !opened,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpened]: opened,
          [classes.drawerClosed]: !opened,
        }),
      }}
      open={opened}
      anchor="left"
    >
      <List>
        {listItems.map(item => (
          <DrawerListItem key={item.id} expanded={expandedItems.includes(item.id)} {...item} />
        ))}
      </List>
      {opened ? <DxfUpload /> : null}
    </Drawer>
  );
};

export default React.memo(LeftDrawerMenu);
