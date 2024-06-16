"use strict";
const axios = require("axios");

async function getLocation(address) {
  const url = "http://api.positionstack.com/v1/forward";
  const params = {
    access_key: "93c5a7b2a217874d9fe08e915b847340",
    query: address,
    limit: 1,
  };

  try {
    const response = await axios.get(url, { params });
    if (
      !response ||
      !response.data ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      throw new Error("Nieprawidłowe dane odpowiedzi z API");
    }
    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      return error.response.data;
      // return(error.response.status);
      // return(error.response.headers);
    } else if (error.request) {
      return error.request;
    } else {
      return "Error", error.message;
    }
  }
}

module.exports = getLocation;
