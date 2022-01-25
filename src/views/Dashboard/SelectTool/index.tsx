import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { setSelectMode } from '../../../redux/canvas/actions';
import useStyles from './styles';

const SelectTool: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const selectModeEnabled = useSelector((state: RootState) => state.canvas.selectMode);

  const handleSelectButtonClick = useCallback(() => {
    dispatch(setSelectMode(!selectModeEnabled));
  }, [dispatch, selectModeEnabled]);

  return (
    <button
      type="button"
      className={clsx(classes.button, {
        [classes.selected]: selectModeEnabled,
      })}
      onClick={handleSelectButtonClick}
    >
      <span className={classes.iconGroup}>
        <i
          className={clsx(classes.boxIcon, {
            [classes.iconSelectedMode]: selectModeEnabled,
          })}
        />
        <i
          className={clsx(classes.cursorIcon, {
            [classes.iconSelectedMode]: selectModeEnabled,
          })}
        />
      </span>
      SELECT
    </button>
  );
};

export default React.memo(SelectTool);
