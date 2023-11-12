const bookServices = require("../services/books.service");
const getAllBooks = async (req, res) => {
  const allbooks = await bookServices.getAllBooks();
  res.send({ status: "OK", data: allbooks });
};

const getOneBook = async (req, res) => {
  const {
    params: { bookId },
  } = req;
  if (!bookId) {
    return;
  }
  const book = await bookServices.getOneBook(bookId);
  res.send({ status: "OK", data: book });
};

const createBook = async (req, res) => {
  const { body } = req;
  const newBook = {
    title: body.title,
    authorName: body.authorName,
    description: body.description,
    price: body.price,
    year: body.year,
    isbn: body.isbn,
    pageCount: body.pageCount,
    tag: body.tag,
  };
  const createdBook = await bookServices.createBook(newBook);
  res.status(201).send({ status: "OK", data: createdBook });
};

const updateBook = async (req, res) => {
  const {
    body,
    params: { bookId },
  } = req;
  if (!bookId) {
    return;
  }

  const updatedBook = await bookServices.updateBook(bookId, body);
  res.send({ status: "OK", data: updatedBook });
};

const deleteABook = async (req, res) => {
  const {
    params: { bookId },
  } = req;
  if (!bookId) {
    return;
  }
  bookServices.deleteABook(bookId);
  res.status(204).send({ status: "OK" });
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteABook,
};

