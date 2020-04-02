/**
 * @param ms milliseconds to sleep for
 * @return promise which sleeps for `ms` milliseconds
 */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
