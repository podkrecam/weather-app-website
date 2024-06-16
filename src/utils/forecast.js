"use strict";
const axios = require("axios");

async function getWeather(lat, long) {
  const url = "https://www.meteosource.com/api/v1/free/point";
  const params = {
    key: "zkxghcfyuswg0i5waadyae9lcrcimhk6io4f0bxh",
    lat: lat,
    lon: long,
    units: "metric",
    language: "en",
    timezone: "UTC",
    sections: "all",
  };

  try {
    const response = await axios.get(url, { params });
    if (!response || !response.data || !response.data.current) {
      throw new Error(`${response.data.error.info}`);
    }
    return response.data.current;
  } catch (error) {
    if (error.response) {
      return error.response.data;
      // return error.response.status;
      // return(error.response.headers);
    } else if (error.request) {
      return error.request;
    } else {
      return "Error", error.message;
    }
    // return(error.config);
  }
}

module.exports = getWeather;
