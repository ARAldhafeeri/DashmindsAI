export interface StorageKeys {
  orgUID: string;
  userUID: string;
}

export interface IAsyncStorageService {
  getOrgUID(): Promise<string | null>;
  getUserUID(): Promise<string | null>;
  setOrgUID(orgUID: string): Promise<void>;
  setUserUID(userUID: string): Promise<void>;
}
