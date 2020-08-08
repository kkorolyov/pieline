import { sleep } from "./util";

export const authenticate = async (userName: string, pasword: string) => {
  await sleep(500);
  return "bogoId";
};

export const getProfile = async (id: string) => {
  await sleep(500);
  return {
    displayName: "Fake display",
    email: "Fake email",
  };
};
export const saveProfile = async (state: {
  displayName: string;
  email: string;
}) => {
  await sleep(500);
  return state;
};