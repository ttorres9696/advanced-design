import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setWindowDimension } from '../../redux/core/actions';
import useDebounce from './useDebounce';

const useWindowResize = () => {
  const dispatch = useDispatch();

  const { execute: onWindowResize } = useDebounce(500, (dispatch: any, setWindowDimension: any) => {
    if (dispatch && setWindowDimension) {
      dispatch(
        setWindowDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      );
    }
  });

  useEffect(() => {
    onWindowResize(dispatch, setWindowDimension);
    window.addEventListener('resize', () => {
      onWindowResize(dispatch, setWindowDimension);
    });
    // eslint-disable-next-line
  }, [dispatch]);
};

export default useWindowResize;
