import { useState, useLayoutEffect, MutableRefObject } from 'react';

export const useIsOverflow = (ref: MutableRefObject<any>, editableRowIndex: Number | null, callback?: Function) => {
  const [hasOverflow, setHasOverflow] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    const { current } = ref;

    const checkOverflow = () => {
      const hasOverflow = current && current.scrollWidth > current.clientWidth;

      setHasOverflow(hasOverflow);

      if (callback) {
        callback(hasOverflow);
      }
    };

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(checkOverflow).observe(current);
      }

      checkOverflow();
    }
  }, [editableRowIndex, callback, ref]);

  return hasOverflow;
};
