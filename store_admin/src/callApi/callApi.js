const callApi = async (url, method, data, token) => {
  let response;
  if (method === "GET") {
    response = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Content-Type": "application/json",
        token: token,
      },
    });
  } else {
    response = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }
  return response.json();
};
export default callApi;
