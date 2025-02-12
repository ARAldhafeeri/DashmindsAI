import Controller from "@/controllers/generic";
import express from "express";
import authenticationMiddleWare from "@/middleware/auth";
import { ROOT_ROUTE, SEARCH_ROUTE } from "../config/routes";
import validationMiddleware from "@/middleware/validation";
import {
  idValidation,
  paginationValidation,
  searchValidation,
} from "../validators/global";
import rbacAuthorizationMiddleware from "@/middleware/rbac";
import { Actions } from "@/config/policy";

const GenericRouterCreator = (
  controller: Controller<any>,
  resourceName: string,
  createValidationRules: () => Middleware[],
  updateValidationRules: () => Middleware[]
) => {
  const router = express.Router();

  // Apply authentication middleware globally
  router.use(authenticationMiddleWare);

  // RBAC middleware factory
  const rbacMiddleware = (action: Actions) =>
    rbacAuthorizationMiddleware([resourceName], [action]);

  // Routes with optional middlewares
  const addRoute = (
    method: "get" | "post" | "put" | "delete",
    route: string,
    middlewares: any,
    handler?: Middleware
  ) => {
    if (handler) {
      router[method](route, ...middlewares, handler);
    }
  };

  // Fetch route
  addRoute(
    "get",
    ROOT_ROUTE,
    [
      paginationValidation(),
      validationMiddleware,
      rbacMiddleware(Actions.read),
    ],
    controller.fetch
  );

  // Create and Delete routes
  const createMiddlewares = [
    ...createValidationRules(),
    validationMiddleware,
    rbacMiddleware(Actions.create),
  ];

  const deleteMiddlewares = [
    idValidation(),
    validationMiddleware,
    rbacMiddleware(Actions.delete),
  ];

  addRoute("post", ROOT_ROUTE, createMiddlewares, controller.create);
  addRoute("delete", ROOT_ROUTE, deleteMiddlewares, controller.delete);

  // Search route
  addRoute(
    "post",
    SEARCH_ROUTE,
    [
      paginationValidation(),
      searchValidation(),
      validationMiddleware,
      rbacMiddleware(Actions.search),
    ],
    controller.search
  );

  // Update route
  addRoute(
    "put",
    ROOT_ROUTE,
    [
      ...updateValidationRules(),
      validationMiddleware,
      rbacMiddleware(Actions.update),
    ],
    controller.update
  );

  return router;
};

export default GenericRouterCreator;
