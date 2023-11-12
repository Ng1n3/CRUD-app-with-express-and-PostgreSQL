const bookModel = require("../models/book.model");

const getAllBooks = () => {
  const allBooks = bookModel.findAll();
  return allBooks;
};

const getOneBook = (bookId) => {
  const book = bookModel.findByPk(bookId);
  return book;
};

const createBook = (newBook) => {
  const bookToInsert = newBook;
  const createdBook = bookModel.create(bookToInsert);
  return createdBook;
};

const updateBook = async (bookId, newupdate) => {
  const updatedBook = await bookModel.update(newupdate, {
    where: {
      id: bookId,
    },
  });
  return updatedBook;
};

const deleteABook = async (bookId) => {
  const deletedbook = bookModel.destroy({ where: { id: bookId } });
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteABook,
};
