const express = require('express');
const Router= express.Router();
const bookController = require('../../controller/book.controller');

Router.get('/', bookController.getAllBooks);

module.exports = Router;