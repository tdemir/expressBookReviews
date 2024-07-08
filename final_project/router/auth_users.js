const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  if (!username) {
    return false;
  }
  return users.filter((item) => item.username === username).length !== 0;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  return (
    users.filter(
      (item) => item.username === username && item.password === password
    ).length === 1
  );
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!isValid(username) || !authenticatedUser(username, password)) {
    return res.status(400).send("Please write valid username and password");
  }
  const token = jwt.sign({ username: username }, "access", {
    expiresIn: "1h",
  });
  return res.status(200).send(token);
  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
