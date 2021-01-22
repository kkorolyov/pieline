import { Project_Details } from "../../../src/gql";
import { sleep } from "./util";

export const getProject = async (id: String): Promise<Project_Details> => {
  await sleep(500);
  return {
    title: "Fake project",
    description: "This is a fake project",
  };
};

export const saveProject = async (details: Project_Details, id?: string) => {
  await sleep(500);
  return details;
};
