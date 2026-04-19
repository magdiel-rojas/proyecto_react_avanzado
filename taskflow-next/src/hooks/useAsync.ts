import { useEffect, useState, useRef, useCallback } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  immediate: boolean = true
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const controllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await asyncFn(controllerRef.current.signal);
      if (isMountedRef.current) {
        setState({ data: result, loading: false, error: null });
      }
    } catch (error) {
      if (
        (error instanceof Error ? error.name !== "AbortError" : true) &&
        isMountedRef.current
      ) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }
  }, [asyncFn]);

  useEffect(() => {
    isMountedRef.current = true;
    if (immediate) {
      execute();
    }
    return () => {
      isMountedRef.current = false;
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [execute, immediate]);

  return {
    ...state,
    refetch: execute,
  };
}
