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
  if (response?.errors) {
    console.log(response.errors);
  }
  return response?.data;
};

// To find the videoID to Hasura

export const isExistingVideo = async (token, issuer, videoID) => {
  const existingVideo = `
  {
    stats(where: {userId: {_eq: "${issuer}"}, videoId: {_eq: "${videoID}"}}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }
`;

  const response = await fetchGraphQL(
    "existingVideo",
    existingVideo,
    token,
    true
  );
  if (response?.errors) {
    console.log(response.errors);
  }
  return response?.data?.stats?.length > 0;
};

// Create new Stats in Hasura
export const createNewStats = async (
  token,
  issuer,
  videoID,
  isWatched,
  isFavourited
) => {
  const createStatsMutation = ` 
  {
    insert_stats_one(object: {favourited: ${isFavourited}, userId: "${issuer}", videoId: "${videoID}", watched: ${isWatched}}) {
      userId
      id
      videoId
      favourited
      watched
    }
  }
`;

  const response = await fetchGraphQL(
    "createStats",
    createStatsMutation,
    token,
    false
  );
  if (response?.errors) {
    console.log(response.errors);
  }
  console.log({response});
  return response?.data;
};

// Update Video Stats in Hasura
export const updateVideoStats = async (
  token,
  issuer,
  videoID,
  isWatched,
  isFavourited
) => {
  const updateStatsMutation = `
  mutation MyMutation {
    update_stats(where: {userId: {_eq: "${issuer}"}, videoId: {_eq: "${videoID}"}}, _set: {favourited: ${isFavourited}, watched: ${isWatched}}) {
      id
      userId
    }
  }
`;

  const response = await fetchGraphQL(
    "updateStats",
    updateStatsMutation,
    token,
    false
  );
  if (response?.errors) {
    console.log(response.errors);
  }
  return response?.data;
};
