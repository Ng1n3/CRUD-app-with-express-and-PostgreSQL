const sequelize = require("../db/sequelize");
const bookModel = require("../models/book.model");
const { Op } = require("sequelize");
const getAllBooks = async (filterParams) => {
  try {
    const { filter, sort, page } = filterParams;
    const pageSize = 10;

    // Buid the where clause for filtering
    const whereClause = {};

    if (filter && filter.year) {
      whereClause.year = filter.year;
    }

    if (filter && filter.price) {
      whereClause.price = filter.price;
    }

    if (filter && filter.isbn) {
      whereClause.isbn = filter.isbn;
    }

    if (filter && filter.authorName) {
      whereClause.authorName = {
        [Op.contains]: [filter.authorName],
      };
      console.log(whereClause.authorName);
    }

    if(filter && filter.tag) {
        whereClause.tag = {
            [Op.contains]: [filter.tag],
        }
    }

    //Build the order clause for sorting
    const orderClause = [];

    if (sort && sort.field && sort.order) {
      if (sort.field === "tags" && sort.order === "ASC") {
        // sort by tags in ascending order (use your actual column name for tags
        orderClause.push([sequelize.literal("tags[1]"), "ASC"]);
      } else if (sort.field === "tags" && sort.order === "DESC") {
        // sort by tags in descending order (use your actual column name for tags)
        orderClause.push([sequelize.literal("tags[1]"), "DESC"]);
      } else {
        orderClause.push([sort.field, sort.order]);
      }
    }

    //Execute the query with pagination, filtering, and sorting
    const allBooks = await bookModel.findAll({
      where: whereClause,
      order: orderClause,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return allBooks;
  } catch (error) {
    throw error;
  }
};

const getOneBook = (bookId) => {
  try {
    const book = bookModel.findByPk(bookId);
    return book;
  } catch (error) {
    throw error;
  }
};

const createBook = (newBook) => {
  const bookToInsert = newBook;
  try {
    const createdBook = bookModel.create(bookToInsert);
    return createdBook;
  } catch (error) {
    console.error("error creating a book:", error.message);
    throw error;
  }
};

const updateBook = async (bookId, newupdate) => {
  try {
    const updatedBook = await bookModel.update(newupdate, {
      where: {
        id: bookId,
      },
    });
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

const deleteABook = async (bookId) => {
  try {
    const deletedbook = bookModel.destroy({ where: { id: bookId } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteABook,
};
