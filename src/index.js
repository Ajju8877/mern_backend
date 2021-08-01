const express = require("express");
const app = express();

//linking the router files from /models/auth...
require("./db/conn");
const PORT = 8080;

// const User = require('./model/userSchema');
app.use(express.json());
//linking the router files from /router/auth...
app.use(require("./router/auth"));

// middleware
function logOriginalUrl(req, res, next) {
  //console.log("Request URL:", req.originalUrl);
  next();
}

app.get("/", (req, res) => {
  res.send(`hello world from app server`);
});

app.get("/about", logOriginalUrl, (req, res) => {
  res.send(`hello world from about server`);
});

app.get("/contact", (req, res) => {
  res.send(`hello world from contact server`);
});

app.get("/signin", (req, res) => {
  res.send(`hello world from signin server`);
});

app.get("/signup", (req, res) => {
  res.send(`hello world from register server`);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

//mongodb+srv://ajju8877:<password>@cluster0.5uonh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
