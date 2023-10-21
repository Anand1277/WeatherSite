const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");

const app = express();

//Define path for express config
const publicDirPath = path.join(__dirname, "../pages");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup static directory to server
app.use(express.static(publicDirPath));

//setup handle bat engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Anand",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Anand",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Anand",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address",
    });
  }

  geoCode(
    req.query.address,
    (error, { longitude, latitude, name, State } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      foreCast(longitude, latitude, (error, responseData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        return res.send({
          Address: name + " " + State,
          weather: responseData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "Help page not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "404 Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
