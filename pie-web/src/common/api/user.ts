export const getProfile = () => ({
  displayName: "Real display",
  email: "Real email",
});

export const saveProfile = (state: { displayName: string; email: string }) =>
  state;
