import { useCallback, useRef } from "react";
import debounce from "lodash/debounce";

const useDebouncedCallback = (callback, delay) => {
  const callbackRef = useRef();
  callbackRef.current = callback;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    debounce((...args) => callbackRef.current(...args), delay),
    [],
  );
};

export default useDebouncedCallback;
