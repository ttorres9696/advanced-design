import { Box } from '@material-ui/core';
import React from 'react';

import DeleteButton from '../../../shared/components/DeleteButton';
import AddPanelButton from './AddPanelButton';
import HistoryController from './HistoryController';
import SelectTool from './SelectTool';
import useStyles from './styles';

const FloatMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.menu}>
        <SelectTool />
        <AddPanelButton />
        <HistoryController />
      </Box>

      <DeleteButton />
    </Box>
  );
};

export default React.memo(FloatMenu);
