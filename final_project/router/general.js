const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!password) {
    return res.status(400).send("Please write valid password");
  }
  if (!username) {
    return res.status(400).send("Please write valid username");
  }
  if (users.filter((item) => item.username === username).length !== 0) {
    return res.status(400).send("Please write different username");
  }
  users.push({ username, password });
  return res.status(200).send(JSON.stringify({ username, password }));
  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).send(JSON.stringify(books));
  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    let bookItem = books[isbn];
    if (bookItem) {
      return res.send(JSON.stringify(bookItem));
    }
    return res.status(400).send("item doesnot exist");
  }
  return res.status(400).send("isbn parameter doesnot send");
  //Write your code here
  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;

  if (author) {
    const isbns = Object.keys(books);
    let authorBooks = [];
    for (let i = 0; i < isbns.length; i++) {
      const isbn = isbns[i];
      if (books[isbn].author === author) {
        authorBooks.push(books[isbn]);
      }
    }
    return res.status(200).send(JSON.stringify(authorBooks));
  }
  return res.status(400).send("author parameter doesnot send");
  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;

  if (title) {
    const isbns = Object.keys(books);
    let titleBooks = [];
    for (let i = 0; i < isbns.length; i++) {
      const isbn = isbns[i];
      if (books[isbn].title === title) {
        titleBooks.push(books[isbn]);
      }
    }
    return res.status(200).send(JSON.stringify(titleBooks));
  }
  return res.status(400).send("title parameter doesnot send");
  //return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    let bookItem = books[isbn];
    if (bookItem) {
      return res.send(JSON.stringify(bookItem.reviews));
    }
    return res.status(400).send("item doesnot exist");
  }
  return res.status(400).send("isbn parameter doesnot send");
  //return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
