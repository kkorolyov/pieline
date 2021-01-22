import { sleep } from "./util";
import { User_Details } from "../../../src/gql";

export const getProfile = async (id: string) => {
  await sleep(500);
  return {
    displayName: "Fake display",
    email: "Fake email",
  };
};
export const saveProfile = async (id: string, state: User_Details) => {
  await sleep(500);
  return state;
};
