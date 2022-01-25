import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { resetHistory } from '../../../../../redux/stage/actions';
import useStyles from './styles';
import { ResetButtonProps } from './types';

const ResetButton: React.FC<ResetButtonProps> = ({ activeHistoryIndex }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => dispatch(resetHistory()), [dispatch]);

  return (
    <button className={classes.button} onClick={handleOnClick} disabled={activeHistoryIndex < 0}>
      RESET
    </button>
  );
};

export default React.memo(ResetButton);
