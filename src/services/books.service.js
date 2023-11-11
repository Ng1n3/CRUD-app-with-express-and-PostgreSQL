const bookModel = require("../models/book.model");

const getAllBooks = async () => {
  const allBooks = await bookModel.findAll();
  return allBooks;
};

const getOneBook = (req, res) => {
  res.send("Here is just one book!");
};

const createBook = async (newBook) => {
  const bookToInsert = newBook;
  const createdBook = await bookModel.create(bookToInsert);
  return createdBook;
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
