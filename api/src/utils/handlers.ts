import { Request, Response, NextFunction } from "express";
// import {ENV} from "../getEnv";

export const asyncController =
  (controller: Controller) =>
  (req: Request, res: Response): any => {
    /**
     * creates async controller with error handling across the source code
     * @param controller: ExpressJS controller
     * @returns res 400 if error ocur or scuess status of the controller.
     */
    Promise.resolve(controller(req, res)).catch((err) => {
      // ENV === "dev" && console.log(err.stack)
      res.status(400).send({ status: false, message: `Error: ${err.message}` });
    });
  };
