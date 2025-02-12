// Controller.test.ts
import { Request, Response } from "express";
import Controller from "@/controllers/generic";
import { asyncStorageSerivce } from "@/services/index";

// Mock service to simulate CRUD methods
const mockService = {
  find: jest.fn(),
  search: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Mock asyncStorageSerivce to simulate getting the organization UID
jest.mock("@/services", () => ({
  asyncStorageSerivce: {
    getOrgUID: jest.fn(),
  },
}));

// Mock request and response objects
const mockRequest = (query = {}, body = {}) =>
  ({
    query,
    body,
  } as unknown as Request);

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

describe("Controller", () => {
  let controller: Controller<any>;

  beforeEach(() => {
    controller = new Controller(mockService);
  });

  it("should fetch data with pagination", async () => {
    const req = mockRequest({ page: "1", limit: "5" });
    const res = mockResponse();
    (asyncStorageSerivce.getOrgUID as jest.Mock).mockResolvedValue("org123");
    (mockService.find as jest.Mock).mockResolvedValue([
      { id: 1, name: "Test" },
    ]);

    await controller.fetch(req, res);

    expect(asyncStorageSerivce.getOrgUID).toHaveBeenCalled();
    expect(mockService.find).toHaveBeenCalledWith("org123", {
      page: 1,
      limit: 5,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ id: 1, name: "Test" }],
      status: true,
      message: "Data fetched",
    });
  });

  it("should search with a keyword", async () => {
    const req = mockRequest({}, { payload: "keyword" });
    const res = mockResponse();
    (asyncStorageSerivce.getOrgUID as jest.Mock).mockResolvedValue("org123");
    (mockService.search as jest.Mock).mockResolvedValue([
      { id: 1, name: "Result" },
    ]);

    await controller.search(req, res);

    expect(asyncStorageSerivce.getOrgUID).toHaveBeenCalled();
    expect(mockService.search).toHaveBeenCalledWith("keyword", "org123", {
      page: 1,
      limit: 5,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ id: 1, name: "Result" }],
      status: true,
      message: "Search results",
    });
  });

  it("should create a new record", async () => {
    const req = mockRequest({}, { name: "New Entity" });
    const res = mockResponse();
    (asyncStorageSerivce.getOrgUID as jest.Mock).mockResolvedValue("org123");
    (mockService.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "New Entity",
    });

    await controller.create(req, res);

    expect(asyncStorageSerivce.getOrgUID).toHaveBeenCalled();
    expect(mockService.create).toHaveBeenCalledWith(
      { name: "New Entity" },
      "org123"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: { id: 1, name: "New Entity" },
      status: true,
      message: "Created successfully",
    });
  });

  it("should update an existing record", async () => {
    const req = mockRequest({ id: "1" }, { name: "Updated Entity" });
    const res = mockResponse();
    (asyncStorageSerivce.getOrgUID as jest.Mock).mockResolvedValue("org123");
    (mockService.update as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Updated Entity",
    });

    await controller.update(req, res);

    expect(asyncStorageSerivce.getOrgUID).toHaveBeenCalled();
    expect(mockService.update).toHaveBeenCalledWith(
      { name: "Updated Entity" },
      "org123",
      "1"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: { id: 1, name: "Updated Entity" },
      status: true,
      message: "Updated successfully",
    });
  });

  it("should delete a record", async () => {
    const req = mockRequest({ id: "1" });
    const res = mockResponse();
    (asyncStorageSerivce.getOrgUID as jest.Mock).mockResolvedValue("org123");
    (mockService.delete as jest.Mock).mockResolvedValue({ success: true });

    await controller.delete(req, res);

    expect(asyncStorageSerivce.getOrgUID).toHaveBeenCalled();
    expect(mockService.delete).toHaveBeenCalledWith("1", "org123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: { success: true },
      status: true,
      message: "Deleted successfully",
    });
  });
});
