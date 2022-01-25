import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { undoHistory } from '../../../../../redux/stage/actions';
import undoIcon from '../../../../../shared/assets/undo_icon.svg';
import useStyles from './styles';
import { UndoButtonProps } from './types';

const UndoButton: React.FC<UndoButtonProps> = ({ activeHistoryIndex }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => dispatch(undoHistory()), [dispatch]);

  const disabled = activeHistoryIndex < 0;

  return (
    <button className={classes.button} onClick={handleOnClick} disabled={disabled}>
      <i
        className={clsx(classes.icon, {
          [classes.disabledIcon]: disabled,
        })}
      />
      UNDO
    </button>
  );
};

export default React.memo(UndoButton);
