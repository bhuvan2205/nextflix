import axios from "axios";

// Hasura graphQL endpoint
const endPoint = process.env.GRAPHQL_ENDPOINT;

// Function to execute graphQL query and mutation
export const fetchGraphQL = async (
  operationName = "Myquery",
  query,
  token,
  isQuery = true
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios({
      url: endPoint,
      method: "post",
      data: {
        operationName,
        query: `${isQuery ? "query" : "mutation"} ${operationName} ${query}`,
        variables: {},
      },
      headers: headers,
    });
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
};

// To find the loggedIn User is new to Hasura

export const isNewUser = async (token, issuer) => {
  const isExistingUser = `{
    users(where: {issuer: {_eq: "${issuer}"}}) {
      email
      id
    }
  }
`;

  const response = await fetchGraphQL("isNewUser", isExistingUser, token, true);
  return response?.data?.users?.length === 0 ? true : false;
};

// Create new User in Hasura
export const createNewuser = async (token, metadata) => {
  const { issuer, email, publicAddress } = metadata || {};
  const createUserMutation = `
    {
      insert_users_one(object: {
        email: "${email}",
        issuer: "${issuer}",
        publicAddress: "${publicAddress}"
      }) {
        email
        id
      }
    }
  `;

  const response = await fetchGraphQL(
    "createUser",
    createUserMutation,
    token,
    false
  );
  return response?.data;
};
