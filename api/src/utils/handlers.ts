import { Request, Response, NextFunction } from "express";
// import {ENV} from "../getEnv";

export const asyncController =
  (controller: Controller) => async (req: Request, res: Response) => {
    /**
     * creates async controller with error handling across the source code
     * @param controller: ExpressJS controller
     * @returns res 400 if error ocur or scuess status of the controller.
     */
    try {
      await controller(req, res);
    } catch (error: any) {
      // ENV === "dev" && console.log(err.stack)
      res
        .status(400)
        .send({ status: false, message: `Error: ${error.message}` });
    }
  };
