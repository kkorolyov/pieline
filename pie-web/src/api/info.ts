declare global {
  interface Window {
    ADDR_GATE: string;
  }
}

/** URL to the backing API gateway */
// Get runtime var with fallback to static var
export const GATE = window.ADDR_GATE || process.env.REACT_APP_ADDR_GATE!;

let token: string | undefined;
/** @returns current authentication token */
export const getToken = () => token;
/** @param newToken new authentication token */
export const registerToken = (newToken?: string) => (token = newToken);
