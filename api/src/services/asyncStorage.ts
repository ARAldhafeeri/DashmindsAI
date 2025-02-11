import { AsyncLocalStorage } from "async_hooks";
import { IAsyncStorageService, StorageKeys } from "../types/asyncStorage";

/**
 * Interface representing the context stored in AsyncLocalStorage.
 * This context holds request-specific information such as the organization UID and user UID.
 */
interface AsyncStorageContext {
  /**
   * The unique identifier for the organization.
   */
  orgUID?: string;

  /**
   * The unique identifier for the user.
   */
  userUID?: string;

  // You can add more keys if needed
}

/**
 * Storage keys used for accessing specific pieces of data in the async storage context.
 */
const storageKeys: StorageKeys = {
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
  private readonly store: AsyncLocalStorage<AsyncStorageContext>;

  private static instance: AsyncLocalStorage<AsyncStorageContext>;

  constructor() {
    if (!AsyncStorageService.instance) {
      AsyncStorageService.instance =
        new AsyncLocalStorage<AsyncStorageContext>();
    }
    this.store = AsyncStorageService.instance;
  }

  /**
   * Retrieves the organization UID from the async storage context.
   *
   * @returns A promise that resolves to the organization UID or null if not set.
   */
  async getOrgUID(): Promise<string | null> {
    const context = this.store.getStore();
    return context?.[storageKeys.orgUID as keyof AsyncStorageContext] || null;
  }

  /**
   * Retrieves the user UID from the async storage context.
   *
   * @returns A promise that resolves to the user UID or null if not set.
   */
  async getUserUID(): Promise<string | null> {
    const context = this.store.getStore();
    return context?.[storageKeys.orgUID as keyof AsyncStorageContext] || null;
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
    context[storageKeys.orgUID as keyof AsyncStorageContext] = orgUID;
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
    context[storageKeys.userUID as keyof AsyncStorageContext] = userUID;
  }
}

export default AsyncStorageService;
