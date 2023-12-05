export const ApiNames = {
  Subscriptions: "subscriptions",
  Users: "users",
};

const apiDetails = {
  subscriptions: {
    path: "resources/subscriptions.json",
  },
  users: {
    path: "resources/users.json",
  },
};

const generateEndpoint = (generateFor) => {
  return generateFor ? apiDetails[generateFor]?.path ?? "" : "";
};

const generateResponse = (data) => {
  return {
    data: data ?? [],
    status: !!data,
    message: data
      ? "Data Fetched Successfully!!!"
      : "Failed to fetch data!! Please Try Again.",
  };
};

export const fetchJsonData = async (fetchDataFor) => {
  const endPoint = generateEndpoint(fetchDataFor);

  if (endPoint) {
    try {
      const response = await fetch(endPoint);
      const jsonData = await response.json();
      return generateResponse(jsonData);
    } catch (error) {
      return generateResponse();
    }
  } else {
    return generateResponse();
  }
};
