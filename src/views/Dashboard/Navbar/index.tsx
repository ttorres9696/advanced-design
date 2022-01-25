import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import useStyles from './styles';
import { NavbarProps } from './types';

const Navbar: React.FC<NavbarProps> = () => {
  const classes = useStyles();

  const windowDimension = useSelector((state: RootState) => state.core.windowDimension);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {windowDimension && windowDimension.width >= 1028 ? (
          <Fragment>
            <Typography variant="h6" className={classes.title}>
              Advanced Design
            </Typography>
          </Fragment>
        ) : (
          <Typography variant="h6" className={classes.title}>
            {' '}
          </Typography>
        )}

        <IconButton edge="end" className={classes.rightMenuButton} color="inherit" aria-label="menu" onClick={() => {}}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {windowDimension && windowDimension.width < 1028 ? (
        <Fragment>
          <Grid container className={classes.titleToolbar}>
            <Typography variant="h6" className={classes.title}>
              Advanced Design
            </Typography>
          </Grid>
          <Grid container className={classes.subToolbar} direction="row" justify="flex-end"></Grid>
        </Fragment>
      ) : null}
    </AppBar>
  );
};

export default React.memo(Navbar);
