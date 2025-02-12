import { ENTITIES_ROUTES } from "@/config/routes";
import { authController } from "@/controllers";
import express from "express";

const authRouter = express.Router();

authRouter.post(ENTITIES_ROUTES.AUTH.LOGIN, authController.login);

export default authRouter;
