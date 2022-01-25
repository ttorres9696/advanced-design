import { Box, IconButton } from '@material-ui/core';
import { Redo as RedoIcon, Undo as UndoIcon } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux';
import { redoHistory, undoHistory } from '../../../../redux/stage/actions';
import useStyles from './styles';

const HistoryController: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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

  const onUndoHistoryClick = useCallback(() => dispatch(undoHistory()), [dispatch]);
  const onRedoHistoryClick = useCallback(() => dispatch(redoHistory()), [dispatch]);

  return (
    <Box className={classes.controller}>
      <IconButton
        color="inherit"
        aria-label="undo-history"
        onClick={onUndoHistoryClick}
        disabled={activeHistoryIndex < 0}
      >
        <UndoIcon />
      </IconButton>

      <IconButton
        color="inherit"
        aria-label="redo-history"
        onClick={onRedoHistoryClick}
        disabled={activeHistoryIndex >= historyLength - 1}
      >
        <RedoIcon />
      </IconButton>
    </Box>
  );
};

export default React.memo(HistoryController);
