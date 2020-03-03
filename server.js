var createError = require("http-errors");
var express = require("express");

//Database
const db = require("./config/database");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

var app = express();

var port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;
