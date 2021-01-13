const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Data = require("./models/data");
const router = require("./routes/api");
require('dotenv').config()

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

// appends api to all server requests
app.use("/api", router);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../front_end/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
})

// ES6 promises
mongoose.Promise = global.Promise;

// connects our back end code with the database
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection
  .once("open", () => console.log("connected to the database"))
  .on("error", console.error.bind(console, "MongoDB connection error:"));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// (optional) only made for logging
app.use(morgan("dev"));

// custom middleware for errr parsing
// ORDER is VERY important here, has to be right after router config
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// launch our backend into the specified port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
