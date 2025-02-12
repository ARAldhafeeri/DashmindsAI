import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Format validation errors as an array
    const errorArray = errors.array().map((err) => ({ message: err.msg }));

    // Pass the error array to the global error handler
    return next({ status: 400, errors: errorArray });
  }

  next();
};

export default validationMiddleware;
