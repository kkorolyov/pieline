import { useState, useCallback, useMemo, useEffect } from "react";

type Executor<T> = {
  execute: (...args: any[]) => void;
  waiting: boolean;
  result: T | null;
  error: any;
};

/**
 * Generates an executor for executing an action.
 * The returned executor contains an `execute(...args)` function which may be freely invoked, as well as current execution state `{ waiting, result, error }`.
 * Execution state may be inspected manually or through the provided execution state inspection hooks.
 * @param action action to execute, await, and apply result to state
 * @return stateful executor for `action`
 */
export function useExecutor<T>(
  action: (...args: any[]) => T | Promise<T>
): Executor<T> {
  const [waiting, setWaiting] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setWaiting(true);

      try {
        setResult(await action(...args));
        setError(null);
      } catch (e) {
        setResult(null);
        setError(e);
      } finally {
        setWaiting(false);
      }
    },
    [action]
  );

  return useMemo(
    () => ({
      execute,
      waiting,
      result,
      error,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waiting, result, error]
  );
}

/**
 * Invokes an `action` when execution has started and is `waiting`.
 * @param executor executor to inspect
 * @param action waiting action to invoke
 */
export function useWaiting({ waiting }: Executor<any>, action: () => void) {
  useEffect(
    () => {
      waiting && action();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waiting]
  );
}
/**
 * Invokes an `action` with execution `result` when an executor completes.
 * @param executor executor to inspect
 * @param action result consumer to invoke
 */
export function useResult<T>(
  { result }: Executor<T>,
  action: (result: T) => void
) {
  useEffect(
    () => {
      result && action(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [result]
  );
}
/**
 * Invokes an `action` with `error` when an executor errors.
 * @param executor executor to inspect
 * @param action error consumer to invoke
 */
export function useError(
  { error }: Executor<any>,
  action: (error: any) => void
) {
  useEffect(
    () => {
      error && action(error);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error]
  );
}

/**
 * Invokes an executor with given `args`.
 * Re-invokes on any arg change.
 * @param executor executor to invoke
 * @param args args to invoke `executor` with
 */
export function useArgs({ execute }: Executor<any>, ...args: any[]) {
  useEffect(
    () => {
      execute(...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...args]
  );
}
