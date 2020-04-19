const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./models/data");
const router = require("./routes/api");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const dbRoute = "mongodb://aldizhupani:" + process.env.DB_PWD + "@ds055594.mlab.com:55594/heroku_gkp9z4nh";

// ES6 promises
mongoose.Promise = global.Promise;

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useFindAndModify: true
});
mongoose.connection
  .once("open", () => console.log("connected to the database"))
  .on("error", console.error.bind(console, "MongoDB connection error:"));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// (optional) only made for logging
app.use(logger("dev"));

// append /api for our http requests
app.use("/api", router);

// custom middleware for errr parsing
// ORDER is VERY important here, has to be right after router config
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// launch our backend into the specified port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
