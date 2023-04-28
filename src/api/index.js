export const setHeaders = () => {
  const header = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Access-control-allow-headers, X-Requested-With, x-auth-token, Content-Type, Accept, Authorization, Access-Control-Allow-Origin,Access-Control-Allow-Methods",
    },
  };
  return header;
};
