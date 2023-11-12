const bookServices = require("../services/books.service");
const getAllBooks = async (req, res) => {
  try {
      const { year, title, isbn, tags, price, sort, page = 1 } = req.query;
    const filter = {year, title, isbn, tags, price}
    const filterparams = { filter, sort, page };

    const allbooks = await bookServices.getAllBooks(filterparams);
    res.send({ status: "OK", data: allbooks });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

const getOneBook = async (req, res) => {
  const {
    params: { bookId },
  } = req;
  if (!bookId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "parameter: workoutId cannot be empty" },
    });
  }
  try {
    const book = await bookServices.getOneBook(bookId);
    res.send({ status: "OK", data: book });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
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
  try {
    const createdBook = await bookServices.createBook(newBook);
    res.status(201).send({ status: "OK", data: createdBook });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateBook = async (req, res) => {
  const {
    body,
    params: { bookId },
  } = req;
  if (!bookId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':bookId' cannot be empty" },
    });
  }
  try {
    const updatedBook = await bookServices.updateBook(bookId, body);
    res.send({ status: "OK", data: updatedBook });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteABook = async (req, res) => {
  const {
    params: { bookId },
  } = req;
  if (!bookId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':bookId' can not be empty" },
    });
  }
  try {
    bookServices.deleteABook(bookId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteABook,
};
