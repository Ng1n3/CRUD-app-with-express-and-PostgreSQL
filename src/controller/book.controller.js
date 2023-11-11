const bookServices = require("../services/books.service");
const getAllBooks = async (req, res) => {
  const allbooks = await bookServices.getAllBooks();
  res.send({ status: "OK", data: allbooks });
};

const getOneBook = (req, res) => {
  res.send("Here is just one book!");
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
  console.log(createdBook)
  res.status(201).send({status: "OK", data: createdBook})
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
