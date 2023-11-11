const { Sequelize, Model, DataTypes } = require("sequelize");
const validator = require("validator");
const sequelize = require("../db/sequelize");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 255],
      },
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
        len: [3, 30],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [2, 500],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 4000,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1920,
      },
    },
    isbn: {
      type: DataTypes.INTEGER,
      validate: {
        len: [10, 13],
      },
    },
    pageCount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 200,
      },
    },
    tag: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
    timestamps: true,
  }
);

module.exports = Book;

