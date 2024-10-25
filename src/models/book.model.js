const { Sequelize, Model, DataTypes } = require("sequelize");
const validator = require("validator");
const sequelize = require("../db/sequelize");

class Book extends Model {}

function validateArrayAlphabet(value) {
  if (!Array.isArray(value)) {
    throw new Error("Input must be an array");
  }

  const validateArrayAlphabet = /^[a-zA-Z\s]+$/;
  if (!value.every((element) => validateArrayAlphabet.test(element))) {
    throw new Error(
      "Array must contain only alphabet characters with optional whitespaces."
    );
  }
}

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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isAlphabeticArray: validateArrayAlphabet,
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
      type: DataTypes.STRING,
      validate: {
        len: [10, 13],
      },
    },
    pageCount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 50,
      },
    },
    tag: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      validate: {
        isAlphabeticArray: validateArrayAlphabet,
      },
    },
  },
  {
    sequelize,
    modelName: "Book",
    timestamps: true,
  }
);

module.exports = Book;
