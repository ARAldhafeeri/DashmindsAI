import { body, param, query, ValidationChain } from "express-validator";
import mongoose from "mongoose";
// import {UserRoles} from "../config/policy";
export const isValidMongoId = (value: string) =>
  mongoose.Types.ObjectId.isValid(value);

/**
 * Utility add optional on create validation for update endpoint
 * @param validationChain - create validation chain.

 */
export const addOptionalOnUpdateValidationRules = (
  validationChain: () => ValidationChain[]
) => {
  return validationChain().map((rule: ValidationChain) =>
    rule.optional({ nullable: true, checkFalsy: true })
  );
};

/**
 * Utility to validate that a field matches one of the specified enum values.
 * @param field - The field name to validate.
 * @param enumValues - Array of valid enum values.
 * @returns ValidationChain for the enum validation.
 */
export const validateEnum = (
  field: string,
  enumValues: string[]
): ValidationChain => {
  return body(field)
    .isIn(enumValues)
    .withMessage(`${field} must be one of [${enumValues.join(", ")}]`);
};

/**
 * Utility to validate a number is within a specific range.
 * @param field - The field name to validate.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @returns ValidationChain for the number range validation.
 */
export const validateNumberInRange = (
  field: string,
  min: number,
  max: number
): ValidationChain => {
  return body(field)
    .isNumeric()
    .withMessage(`${field} must be a number`)
    .isFloat({ min, max })
    .withMessage(`${field} must be between ${min} and ${max}`);
};

/**
 * Utility to apply sanitization rules on string fields of a request.
 * @param fields - Array of string field names to sanitize.
 * @param length - max length for common fields
 * @param sanitizer - The sanitizer function to apply (e.g., trim, escape, etc.).
 * @returns Array of ValidationChain with applied sanitization.
 */
export const applySanitizationRules = (
  fields: string[],
  length: number,
  sanitizer: (chain: ValidationChain) => ValidationChain
): ValidationChain[] => {
  return fields.map((field) => {
    const chain = body(field)
      .isString()
      .isLength({ max: length })
      .withMessage(`${field} must be a string`);
    return sanitizer(chain);
  });
};

export const applySanitizationRulesOptional = (
  fields: string[],
  length: number,
  sanitizer: (chain: ValidationChain) => ValidationChain
): ValidationChain[] => {
  return fields.map((field) => {
    const chain = body(field)
      .optional()
      .isString()
      .isLength({ max: length })
      .withMessage(`${field} must be a string`);
    return sanitizer(chain);
  });
};

export const validateUser = () => [
  ...applySanitizationRules(["firstName", "lastName"], 350, (chain) =>
    chain.trim().escape()
  ),

  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .withMessage("Email is required"),
  body("phoneNumber")
    .isMobilePhone("any")
    .withMessage("Phone number must be valid"),
  //   body("role")
  //     .isIn([
  //       UserRoles.designer,
  //       UserRoles.operator,
  //       UserRoles.owner,
  //       UserRoles.customer,
  //     ]) // Customize roles as needed
  //     .withMessage("Role must be one of: admin, user, manager"),
];

// validate passed mongo uuid
export const mongoIdValidator = (field = "id") =>
  query(field)
    .custom((value) => {
      if (!isValidMongoId(value)) {
        throw new Error("Invalid MongoDB ObjectID");
      }
      return true;
    })
    .withMessage(`${field} must be valid`);

export const validateCustomer = () =>
  addOptionalOnUpdateValidationRules(validateUser);

// validate date
export const dateValidatorQuery = (field: string) =>
  query(field).isDate().withMessage(`${field} must be a date`);
