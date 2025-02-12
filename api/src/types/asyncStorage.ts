/**
 * Interface representing the context stored in AsyncLocalStorage.
 * This context holds request-specific information such as the organization UID and user UID.
 */
export interface IAsyncStorageContext {
  orgUID?: string;
  userUID?: string;

  // You can add more keys if needed
}

/**
 * Interface representing storage keys for the async storage
 */
export interface IStorageKeys {
  orgUID: string;
  userUID: string;
}

/**
 * Interface for async storage service.
 */
export interface IAsyncStorageService {
  getOrgUID(): Promise<string | null>;
  getUserUID(): Promise<string | null>;
  setOrgUID(orgUID: string): Promise<void>;
  setUserUID(userUID: string): Promise<void>;
  exit(fn: Function): Promise<void>;
  enterWith(data: any): Promise<void>;
}
