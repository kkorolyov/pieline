import {
  Project_Project_Details,
  Project_SearchRequest,
  Project_SearchResponse,
} from "../../../src/gql";
import { sleep } from "./util";

export const searchProjects = async ({
  titlePattern,
  chunk: { size },
}: Project_SearchRequest): Promise<Project_SearchResponse> => {
  await sleep(500);
  return {
    token: "dummy",
    result: [...Array(size).keys()].map((i) => ({
      id: { value: i.toString() },
      details: {
        title: `Proj${i}`,
        description: `Match pattern: [${titlePattern}]`,
      },
    })),
  };
};

export const getProject = async (
  id: String
): Promise<Project_Project_Details> => {
  await sleep(500);
  return {
    title: "Fake project",
    description: "This is a fake project",
  };
};

export const saveProject = async (
  details: Project_Project_Details,
  id?: string
) => {
  await sleep(500);
  return details;
};
