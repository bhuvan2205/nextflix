import axios from "axios";

const endPoint = "https://nextflix-2023.hasura.app/v1/graphql";
const token = process.env.NEXT_PUBLIC_SECRET_HASURA_KEY;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "x-hasura-admin-secret": token,
};

const userQuery = `{
    users {
        email
        id
        issuer
        publicAddress
    }
}`;

const graphqlQuery = {
  operationName: "fetchUsers",
  query: `query fetchUsers ${userQuery}`,
  variables: {},
};

export const fetchUsers = async () => {
  try {
    const response = await axios({
      url: endPoint,
      method: "post",
      data: graphqlQuery,
      headers: headers,
    });
    const { data } = response;
    console.log({ data });
  } catch (error) {
    console.log(error.message);
  }
};
