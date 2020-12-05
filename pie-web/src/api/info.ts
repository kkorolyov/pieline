declare global {
  interface Window {
    ADDR_GATE: string;
  }
}

/** @returns URL to the backing API gateway */
export const getGate = () =>
  // Get runtime var with fallback to static var
  window.ADDR_GATE || process.env.REACT_APP_ADDR_GATE!;
