import axios from "axios";

const endPoint = "https://nextflix-2023.hasura.app/v1/graphql";

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

export const isNewUser = async (token, issuer) => {
  const isExistingUser = `{
    users(where: {issuer: {_eq: "${issuer}"}}) {
      email
      id
    }
  }
`;

  const response = await fetchGraphQL("isNewUser", isExistingUser, token, true);
  console.log(response);
  return response?.data?.users?.length === 0 ? true : false;
};

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
  if (response?.errors) {
    console.log(response?.error);
  } else {
    console.log(response?.users);
  }
  return response?.data?.users?.length === 0 ? false : true;
};
