import { Drawer, Grid, List, ListItem } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import DeleteButton from '../../../shared/components/DeleteButton';
import DrawerListItem from '../../../shared/components/DrawerListItem';
import { DrawerMenuProps } from '../../../shared/models/DrawerMenuProps.interface';
import MagnetModeCheckbox from './MagnetModeCheckbox';
import useStyles from './styles';
import useRightDrawerMenu from './useRightDrawerMenu';

const RightDrawerMenu: React.FC<DrawerMenuProps> = ({ opened }) => {
  const classes = useStyles();

  const { listItems } = useRightDrawerMenu();

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
      anchor="right"
    >
      <List>
        <MagnetModeCheckbox mode={opened ? 'full' : 'only-button'} />

        <ListItem>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <DeleteButton />
            </Grid>
          </Grid>
        </ListItem>

        {listItems.map(item => (
          <DrawerListItem key={item.id} {...item} />
        ))}
      </List>
    </Drawer>
  );
};

export default React.memo(RightDrawerMenu);
