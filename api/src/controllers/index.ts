import { authService, organizationService } from "@/services";
import OrganizationController from "./organization";
import AuthController from "./auth";

export const organizationController = new OrganizationController(
  organizationService
);

export const authController = new AuthController(authService);
