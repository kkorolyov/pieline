import { useState, useCallback, useMemo, useEffect } from "react";

/**
 * Generates an executor for executing an action.
 * The returned `executor` is a simple stateful decorator of `action`.
 * Successful execution results are applied to the provided `consumer`.
 * @param action action to execute, await, and apply result to state
 * @return `[executor, waiting, error]` tuple
 */
export function useExecutor<T>(
  action: (...args: any) => T | Promise<T>,
  consumer: (arg0: T) => void
): [(...args: any) => void, boolean, any] {
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(null);

  const executor = useCallback(
    async (...args: any[]) => {
      setWaiting(true);

      try {
        consumer(await action(...args));
      } catch (e) {
        setError(e);
      } finally {
        setWaiting(false);
      }
    },
    [action]
  );

  return [executor, waiting, error];
}

/**
 * A variant of `useExecutor` useful for invoking initialization.
 * The main difference being `useInitializer` runs immediately and only on component mount.
 * @param action action to invoke
 * @param consumer consumes `action` result
 * @return `[waiting, error]` initialization state
 */
export function useInitializer<T>(
  action: () => T | Promise<T>,
  consumer: (arg0: T) => void
): [boolean, any] {
  const [executor, ...state] = useExecutor(action, consumer);

  useEffect(() => {
    executor();
  }, []);

  return state;
}
