import { asyncStorageSerivce } from "@/services";

describe("AsyncStorageService", () => {
  beforeEach(() => {
    asyncStorageSerivce.enterWith({ orgUID: null, userUID: null });
  });

  afterEach(() => {
    asyncStorageSerivce.exit(() => {});
  });

  test("getOrgUID: should return null if not set", async () => {
    expect(await asyncStorageSerivce.getOrgUID()).toBeNull();
  });

  test("should set and return the org UID within the same context", async () => {
    const orgId = "test-org-id";
    await asyncStorageSerivce.setOrgUID(orgId);
    expect(await asyncStorageSerivce.getOrgUID()).toBe(orgId);
  });

  test("should set and return the user ID within the same context", async () => {
    const userId = "test-user-id";
    await asyncStorageSerivce.setUserUID(userId);
    expect(await asyncStorageSerivce.getUserUID()).toBe(userId);
  });

  test("should set and retrieve org UID in the same context", async () => {
    const orgId = "context-org-id";
    await asyncStorageSerivce.setOrgUID(orgId);
    expect(await asyncStorageSerivce.getOrgUID()).toBe(orgId);
  });

  test("should set and retrieve user ID in the same context", async () => {
    const userId = "context-user-id";
    await asyncStorageSerivce.setUserUID(userId);
    expect(await asyncStorageSerivce.getUserUID()).toBe(userId);
  });
});
