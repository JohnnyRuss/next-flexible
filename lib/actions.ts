import { GraphQLClient } from "graphql-request";
import { getUserQuery, createUserMutation } from "@/graphql";

const isProduction = process.env.NODE_ENV === "production";

const apiURL = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKEY = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "1234";
const serverURL = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL || ""
  : "http://localhost:3000";

const client = new GraphQLClient(apiURL);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKEY);
  return makeGraphQLRequest(getUserQuery, { email });
};

const createUser = (email: string, name: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKEY);
  return makeGraphQLRequest(createUserMutation, {
    input: {
      email,
      name,
      avatarUrl,
    },
  });
};

export { makeGraphQLRequest, getUser, createUser };
