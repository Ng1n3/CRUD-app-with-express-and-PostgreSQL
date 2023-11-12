const express = require("express");
const Router = express.Router();
const bookController = require("../../controller/book.controller");
const bookMiddleware = require("../../middlewares/book.middlewares");

Router.get("/", bookController.getAllBooks);
Router.post("/", bookMiddleware.checkBody, bookController.createBook);
Router.get("/:bookId", bookController.getOneBook);
Router.put('/:bookId', bookMiddleware.checkBody, bookController.updateBook)
Router.delete('/:bookId', bookController.deleteABook);

module.exports = Router;