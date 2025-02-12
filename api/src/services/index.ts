import { AsyncLocalStorage } from "async_hooks";
import AsyncStorageService from "./asyncStorage";
import JWTUtils from "./jwt";

export const asyncStorageSerivce = new AsyncStorageService(
  new AsyncLocalStorage()
);
export const jwtService = new JWTUtils();
