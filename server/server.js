const express = require("express");
const userRouter = require("./user-route/user-route");
const postRouter = require("./post-route/post-route");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome home</h1>`);
});

module.exports = server;
