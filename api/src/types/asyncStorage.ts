/**
 * Interface representing the context stored in AsyncLocalStorage.
 * This context holds request-specific information such as the organization UID and user UID.
 */
export interface IAsyncStorageContext {
  orgUID?: string;
  userUID?: string;
  role?: string;

  // You can add more keys if needed
}

/**
 * Interface representing storage keys for the async storage
 */
export interface IStorageKeys {
  orgUID: string;
  userUID: string;
  role: string;
}

/**
 * Interface for async storage service.
 */
export interface IAsyncStorageService {
  // user
  getUserUID(): Promise<string | null>;
  setUserUID(userUID: string): Promise<void>;
  // org
  setOrgUID(orgUID: string): Promise<void>;
  getOrgUID(): Promise<string | null>;
  // role
  getRole(): Promise<string | null>;
  setRole(role: string): Promise<void>;
  // exit and entry
  exit(fn: Function): Promise<void>;
  enterWith(data: any): Promise<void>;
}
