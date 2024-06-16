"use strict";

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Forecast",
    name: "Maciej Osial",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Maciej Osial",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    content: "How can we help you?",
    name: "Maciej Osial",
  });
});

app.get("/", (req, res) => {
  res.send(`<h1>Weather</h1>`);
});

// weather request
app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const location = await geocode(req.query.address);
  if (location.error) {
    return res.send({
      error: location.error,
    });
  }
  const { latitude, longitude, country, name } = location;

  const weather = await forecast(latitude, longitude);
  if (weather.error) {
    return res.send({
      error: weather.error,
    });
  }
  const { summary, temperature } = weather;
  res.send({
    forecast: summary,
    temperature,
    location: country,
    address: name,
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("Servers is up on port", port);
});
