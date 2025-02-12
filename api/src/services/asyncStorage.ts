import { AsyncLocalStorage } from "async_hooks";
import {
  IAsyncStorageService,
  IStorageKeys,
  IAsyncStorageContext,
} from "../types/asyncStorage";

/**
 * Storage keys used for accessing specific pieces of data in the async storage context.
 */
const storageKeys: IStorageKeys = {
  orgUID: "orgUID",
  userUID: "userUID",
} as const;

/**
 * AsyncStorage provides an API for accessing and managing
 * request-scoped data stored using Node.js's AsyncLocalStorage.
 *
 * The authentication middleware stores information such as the organization UID
 * and user UID in the async storage for the lifetime of a request. This class
 * exposes methods to get and set these values without exposing the underlying storage.
 */
class AsyncStorageService implements IAsyncStorageService {
  /**
   * The AsyncLocalStorage instance is typed with AsyncStorageContext, which allows
   * us to safely store and retrieve values using string keys.
   */
  constructor(
    private readonly store: AsyncLocalStorage<IAsyncStorageContext>
  ) {}

  /**
   * Retrieves the organization UID from the async storage context.
   *
   * @returns A promise that resolves to the organization UID or null if not set.
   */
  async getOrgUID(): Promise<string | null> {
    const context = this.store.getStore();
    return context?.[storageKeys.orgUID as keyof IAsyncStorageContext] || null;
  }

  /**
   * Retrieves the user UID from the async storage context.
   *
   * @returns A promise that resolves to the user UID or null if not set.
   */
  async getUserUID(): Promise<string | null> {
    const context = this.store.getStore();
    return context?.[storageKeys.userUID as keyof IAsyncStorageContext] || null;
  }

  /**
   * Stores the organization UID in the async storage context.
   *
   * @param orgUID - The organization UID to be stored.
   * @throws Error if the async storage context is not available.
   */
  async setOrgUID(orgUID: string): Promise<void> {
    const context = this.store.getStore();
    if (!context) {
      throw new Error("Async storage context is not available");
    }
    context[storageKeys.orgUID as keyof IAsyncStorageContext] = orgUID;
  }

  /**
   * Stores the user UID in the async storage context.
   *
   * @param userUID - The user UID to be stored.
   * @throws Error if the async storage context is not available.
   */
  async setUserUID(userUID: string): Promise<void> {
    const context = this.store.getStore();
    if (!context) {
      throw new Error("Async storage context is not available");
    }
    context[storageKeys.userUID as keyof IAsyncStorageContext] = userUID;
  }

  /**
   * Replace given store with the given store object.
   * @param data - The data to replace the store with
   */
  async enterWith(data: any): Promise<void> {
    this.store.enterWith(data);
  }

  /**
   * Runs a function synchronously outside of a context and returns its return value.
   * @param fn - function to run within the exit store method
   */
  async exit(fn: Function): Promise<void> {
    this.store.exit(() => fn());
  }
}

export default AsyncStorageService;
