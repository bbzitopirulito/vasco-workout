const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);

mongoose.connect(
  "mongodb+srv://admin:admin@vasco-workout-tg3jx.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connectedUsers = {};

app.use((req, res, next) => {
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
