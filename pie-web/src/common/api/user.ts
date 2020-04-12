// TODO All this

/**
 * Authenticates a given `(userName, password)` combination.
 * @returns authenticated user ID
 */
export const authenticate = (userName: string, password: string) => "bogoId";

/**
 * Retrieves a profile for a given user ID.
 * @param id user ID
 * @returns associated profile state
 */
export const getProfile = (id: string) => ({
  displayName: "Real display",
  email: "Real email",
});
/**
 * Persists user profile state.
 * @param state profile state to persist
 * @returns persisted profile state
 */
export const saveProfile = (state: { displayName: string; email: string }) =>
  state;
