import { GrantQuery } from "gatewatch";
import ENFORCED_POLICY from "../config/policy";
import { NextFunction, Request, Response } from "express";
import { asyncStorageSerivce } from "@/services";

const rbacAuthorizationMiddleware = (
  resources: string[],
  actions: string[]
): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Leveraging gatewatch.js for fine-grained role-based access control
      // in a multi-tenant environment
      // 1. Role is added in the authentication middleware
      const currUserRole = (await asyncStorageSerivce.getRole()) as string;

      const isAuthorized = new GrantQuery(ENFORCED_POLICY)
        .role(currUserRole)
        .can(actions)
        .on(resources)
        .grant();

      if (isAuthorized) {
        next();
      } else {
        // Send a 403 Forbidden response if the user isn't authorized
        res
          .status(403)
          .json({ message: "User is not authorized to perform this action" });
      }
    } catch (e) {
      next(new Error("User authorization process failed"));
    }
  };
};

export default rbacAuthorizationMiddleware;
