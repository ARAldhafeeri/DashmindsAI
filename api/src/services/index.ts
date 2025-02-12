import { AsyncLocalStorage } from "async_hooks";
import AsyncStorageService from "./asyncStorage";
import JWTUtils from "./jwt";
import OrganizationService from "./organization";
import { organizationRepository, userRepsitory } from "@/repositories";
import UserService from "./user";
import PasswordService from "./password";
import AuthService from "./auth";

export const jwtService = new JWTUtils();
const passwordService = new PasswordService();

export const asyncStorageSerivce = new AsyncStorageService(
  new AsyncLocalStorage()
);

export const organizationService = new OrganizationService(
  organizationRepository
);

export const userService = new UserService(userRepsitory);

export const authService = new AuthService(
  passwordService,
  userService,
  jwtService
);
