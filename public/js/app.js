"use strict";

const searchInput = document.querySelector(".search-input");
const weatherForm = document.querySelector(".weather-form");
const weatherErrors = document.querySelector(".weather-error");
const results = document.querySelector(".results");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = searchInput.value.trim();
  if (location.length < 3) {
    return (weatherErrors.innerHTML = "Enter at least 3 characters.");
  }

  weatherErrors.innerHTML = "Loading...";
  axios
    .get(`/weather?address=${location}`)
    .then(function (response) {
      if (Object.keys(response.data).length === 0) {
        return (weatherErrors.innerHTML =
          "Unable to find. Try another location!");
      }
      if (response.data.error) {
        return (weatherErrors.innerHTML =
          response.data.error.context.query.message);
      }

      // Czyszczenie błędów i wyników
      weatherErrors.innerHTML = "";
      results.innerHTML = "";
      searchInput.value = "";

      const data = response.data;

      // Tworzenie elementów i wypełnianie danymi
      const weatherContainer = document.createElement("div");
      weatherContainer.className = "weather-container";

      const locationElement = document.createElement("h2");
      locationElement.textContent = `🌍 Location: ${data.address}, ${data.location}`;
      weatherContainer.appendChild(locationElement);

      const temperatureElement = document.createElement("p");
      temperatureElement.textContent = `🌡️ Temperature: ${data.temperature}°C`;
      weatherContainer.appendChild(temperatureElement);

      const conditionElement = document.createElement("p");
      conditionElement.textContent = `⛅ Condition: ${data.forecast}`;
      weatherContainer.appendChild(conditionElement);

      // Dodanie kontenera do wyników
      results.appendChild(weatherContainer);
    });
});
