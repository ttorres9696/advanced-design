import { useCallback, useEffect, useState } from 'react';

const useDebounce = (countdownInMilliseconds: number, action: Function) => {
  const [internalTimeout, setInternalTimeout] = useState<NodeJS.Timeout>();
  const [internalCountdown, setInternalCountdown] = useState<number>(0);

  useEffect(() => {
    setInternalCountdown(countdownInMilliseconds);
  }, [countdownInMilliseconds, setInternalCountdown]);

  const execute = useCallback(
    (...params: any[]) => {
      if (internalTimeout) {
        clearTimeout(internalTimeout);
      }

      setInternalTimeout(
        setTimeout(() => {
          action(...params);
        }, internalCountdown),
      );
    },
    [internalCountdown, action, internalTimeout, setInternalTimeout],
  );

  return {
    execute,
  };
};

export default useDebounce;
