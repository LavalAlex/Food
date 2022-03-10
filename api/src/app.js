const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");
const routesMongo = require('./routes');
const server = express();
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/food", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
require("dotenv").config();

// settings
server.set("port", process.env.PORT || 3001);
server.name = "API";

server.use(express.json({ limit: "500mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// nuevo y mejorado cors
server.use(cors());

// server.use("/", routes);
server.use("/mongo", routesMongo);

// Catch 404 Errors
const err = new Error("not Found");
server.use((req, res, next) => {
  err.status = 404;
  next(err);
});

// Error hanlder function
server.use((err, req, res, next) => {
  const error = server.get("env") === "development" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
server.listen(server.get("port"), () => {
  console.log("server on port", server.get("port"));
});
module.exports = server;
