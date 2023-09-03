import { GraphQLClient } from "graphql-request";
import {
  getUserQuery,
  createUserMutation,
  createProjectMutation,
  getAllProjectsQuery,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  deleteProjectMutation,
  updateProjectMutation,
} from "@/graphql";
import { ProjectForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";

const apiURL = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKEY = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY_PROD
  : process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "1234";

const serverURL = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL || ""
  : "http://localhost:3000";

const client = new GraphQLClient(apiURL);

//////////////////////
// REQUEST HEADERS //
////////////////////

const SET_API_KEY_HEADER = () => client.setHeader("x-api-key", apiKEY || "");

const SET_AUTHORIZATION_HEADER = async () => {
  const { token } = await fetchToken();
  client.setHeader("Authorization", `Bearer ${token}`);
};

///////////
// USER //
/////////

const getUser = (email: string) => {
  SET_API_KEY_HEADER();
  return makeGraphQLRequest(getUserQuery, { email });
};

const createUser = (email: string, name: string, avatarUrl: string) => {
  SET_API_KEY_HEADER();
  return makeGraphQLRequest(createUserMutation, {
    input: {
      email,
      name,
      avatarUrl,
    },
  });
};

///////////////
// PROJECTS //
/////////////

const createProject = async ({
  form,
  creatorId,
}: {
  form: ProjectForm;
  creatorId: string;
}) => {
  try {
    await SET_AUTHORIZATION_HEADER();

    const { url } = await uploadImage(form.image);

    if (url)
      return makeGraphQLRequest(createProjectMutation, {
        input: {
          ...form,
          image: url,
          createdBy: {
            link: creatorId,
          },
        },
      });
  } catch (error) {
    throw error;
  }
};

const getAllProjects = async (args?: GetAllProjectsQueryT) => {
  SET_API_KEY_HEADER();

  const variables: GetAllProjectsQueryT = {
    first: args?.first || 8,
  };

  if (args?.category) variables.category = args.category;
  if (args?.startCursor) variables.startCursor = args.startCursor;
  if (args?.endCursor) variables.endCursor = args.endCursor;

  const queryStr = getAllProjectsQuery(variables);

  return makeGraphQLRequest(queryStr, { ...variables });
};

const getProjectDetails = (args: { id: string }) => {
  SET_API_KEY_HEADER();
  return makeGraphQLRequest(getProjectByIdQuery, { id: args.id });
};

const getUserProjects = (args: { id: string; last?: number }) => {
  SET_API_KEY_HEADER();
  return makeGraphQLRequest(getProjectsOfUserQuery, {
    id: args.id,
    last: args.last,
  });
};

const deleteProject = async (args: { id: string }) => {
  await SET_AUTHORIZATION_HEADER();

  return makeGraphQLRequest(deleteProjectMutation, { id: args.id });
};

const updateProject = async (args: {
  form: ProjectForm;
  projectId: string;
}) => {
  await SET_AUTHORIZATION_HEADER();

  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...args.form };

  const isUploadingNewImage = isBase64DataURL(args.form.image);

  if (isUploadingNewImage) {
    const { url } = await uploadImage(args.form.image);
    if (url) updatedForm = { ...updatedForm, image: url };
  }

  return makeGraphQLRequest(updateProjectMutation, {
    input: updatedForm,
    id: args.projectId,
  });
};

//////////////////////
export {
  getUser,
  createUser,
  createProject,
  getAllProjects,
  getProjectDetails,
  getUserProjects,
  deleteProject,
  updateProject,
};

//////////////
// HELPERS //
////////////

async function uploadImage(imagePath: string): Promise<{ url: string }> {
  try {
    return await (
      await fetch(`${serverURL}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ path: imagePath }),
      })
    ).json();
  } catch (error) {
    throw error;
  }
}

async function fetchToken() {
  try {
    return await (await fetch(`${serverURL}/api/auth/token`)).json();
  } catch (error) {
    throw error;
  }
}

async function makeGraphQLRequest(query: string, variables = {}) {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
}

/////////////////////////////

export interface GetAllProjectsQueryT {
  first?: number | null | undefined;
  category?: string | null | undefined;
  startCursor?: string | null | undefined;
  endCursor?: string | null | undefined;
}
