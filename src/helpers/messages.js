module.exports = {
  success200: (data) => {
    if (data !== undefined) return { code: 200, status: "OK", data: data };
    return { code: 200, status: "OK" };
  },
  success201: (data) => {
    if (data !== undefined) return { code: 201, status: "CREATED", data: data };
    return { code: 201, status: "CREATED" };
  },
  err400: (message) => {
    if (message !== undefined)
      return { code: 400, status: "BAD REQUEST", message: message };
    return { code: 400, status: "BAD REQUEST" };
  },
  err404: (message) => {
    if (message !== undefined)
      return { code: 404, status: "NOT FOUND", message: message };
    return { code: 404, status: "NOT FOUND" };
  },
};
