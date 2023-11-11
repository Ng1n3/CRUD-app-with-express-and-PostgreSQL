const bookServices = require("../services/books.service");
const getAllBooks = (req, res) => {
  const allbooks = bookServices.getAllBooks();
  res.send({ status: "OK", data: allbooks });
};

const getOneBook = (req, res) => {
  res.send("Here is just one book!");
};

const createBook = (req, res) => {
  res.send("Let us create a new book");
};

const updateBook = (req, res) => {
  res.send("I just changed this book");
};

const deleteABook = (req, res) => {
  res.send("I just deleted this book");
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteABook,
};
