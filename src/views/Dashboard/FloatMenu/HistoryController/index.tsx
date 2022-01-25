import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux';
import RedoButton from './RedoButton';
import ResetButton from './ResetButton';
import useStyles from './styles';
import UndoButton from './UndoButton';

const HistoryController: React.FC = () => {
  const classes = useStyles();

  const historyLength = useSelector((state: RootState) =>
    state.stage.selectedModuleSpec
      ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].history.length
      : 0,
  );
  const activeHistoryIndex = useSelector((state: RootState) =>
    state.stage.selectedModuleSpec
      ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].activeHistoryIndex
      : -1,
  );

  return (
    <Box className={classes.controller}>
      <Box className={classes.buttonGroup}>
        <UndoButton activeHistoryIndex={activeHistoryIndex} />
        <RedoButton historyLength={historyLength} activeHistoryIndex={activeHistoryIndex} />
      </Box>

      <ResetButton activeHistoryIndex={activeHistoryIndex} />
    </Box>
  );
};

export default React.memo(HistoryController);
