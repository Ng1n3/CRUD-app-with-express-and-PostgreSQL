const bookModel = require("../models/book.model");

const getAllBooks = async (req, res) => {
  const allBooks = await bookModel.findAll();
  return allBooks;
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
