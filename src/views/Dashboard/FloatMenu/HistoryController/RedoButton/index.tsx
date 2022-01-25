import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { redoHistory } from '../../../../../redux/stage/actions';
import useStyles from './styles';
import { RedoButtonProps } from './types';

const RedoButton: React.FC<RedoButtonProps> = ({ historyLength, activeHistoryIndex }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => dispatch(redoHistory()), [dispatch]);

  const disabled = activeHistoryIndex >= historyLength - 1;

  return (
    <button className={classes.button} onClick={handleOnClick} disabled={disabled}>
      <i
        className={clsx(classes.icon, {
          [classes.disabledIcon]: disabled,
        })}
      />
      REDO
    </button>
  );
};

export default React.memo(RedoButton);
