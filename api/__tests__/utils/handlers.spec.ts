import { asyncController } from "@/utils/handlers";
import { Request, Response } from "express";
describe("Async Controller", () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("when controller is successful", () => {
    it("should call res.send with the correct data", async () => {
      const mockController = (req: Request, res: Response) => {
        res.send({ message: "success" });
      };

      await asyncController(mockController)(mockRequest, mockResponse);

      expect(mockResponse.send).toHaveBeenCalledWith({ message: "success" });
    });
  });

  describe("when controller throws an error", () => {
    it("should send a 500 response", async () => {
      const mockController = (req: Request, res: Response) => {
        throw new Error("Test error");
      };

      await asyncController(mockController)(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: "Error: Test error",
        status: false,
      });
    });
  });
});
