const axios = require("axios");

const baseUrl = "http://localhost:5000";

async function getAllBooks() {
  try {
    const response = await axios.get(baseUrl);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getBookbyISBN(isbn) {
  try {
    const response = await axios.get(baseUrl + "/isbn/" + isbn);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksbyAuthor(author) {
  try {
    const response = await axios.get(baseUrl + "/author/" + author);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getBookbyTitle(title) {
  try {
    const response = await axios.get(baseUrl + "/title/" + title);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
