import { body, query } from "express-validator";

export const paginationValidation = () => [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer greater than 0.")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100.")
    .toInt(),
];

export const dayFilterValidation = () => [
  query("day")
    .notEmpty()
    .isLength({ max: 255 })
    .withMessage("Category param must be a string less than 100"),
];

export const categoryTypeFilterValidation = () => [
  query("categoryType")
    .notEmpty()
    .isLength({ max: 255 })
    .withMessage("Category param must be a string less than 100"),
];

export const searchValidation = () => [
  body("payload")
    .exists()
    .isString()
    .isLength({ max: 100 })
    .withMessage(
      "payload is required and should be a string with a maximum length of 100 characters."
    ),
];

export const idValidation = () => [
  query("id")
    .notEmpty()
    .isLength({ max: 255 })
    .withMessage("id param must be a string less than 100"),
];
