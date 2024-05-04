import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const HASURA_URL: string = import.meta.env.VITE_HASURA_URL || "";
const HASURA_ADMIN_SECRET = import.meta.env.VITE_HASURA_ADMIN_SECRET || "";

// Create an http link
const httpLink = createHttpLink({
  uri: HASURA_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create the Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the authLink with the httpLink
  cache: new InMemoryCache(),
});
