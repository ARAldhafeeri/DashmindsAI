import { Service } from "@/services/generic"; // Update with the actual path
import { IRepository } from "@/types/generic"; // Update with the actual path
import { getMockObjectId, mockUID } from "@/testUtils/moongose";
import { Types } from "mongoose";
interface MockEntity {
  _id: Types.ObjectId;
  name: string;
  organization: string;
}

describe("Service", () => {
  let mockRepository: jest.Mocked<IRepository<MockEntity>>;
  let service: Service<MockEntity>;

  beforeEach(() => {
    // Mock all methods in IRepository
    mockRepository = {
      find: jest.fn(),
      findAll: jest.fn(),
      findAllWithProjection: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateWithQueryOptions: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    } as jest.Mocked<IRepository<MockEntity>>;
    // Create a mocked instance of IRepository
    service = new Service<MockEntity>(mockRepository);
  });

  test("should find records with pagination", async () => {
    const mockData = [
      {
        _id: getMockObjectId(),
        name: "Test Entity",
        organization: "org1",
      },
    ];
    mockRepository.find.mockResolvedValue(mockData);
    mockRepository.count.mockResolvedValue(1);

    const result = await service.find("org1", { page: 1, limit: 5 });

    expect(result).toEqual({
      total: 1,
      page: 1,
      pageSize: 1,
      data: mockData,
    });
    expect(mockRepository.find).toHaveBeenCalledWith(
      { organization: "org1" },
      {},
      { page: 1, limit: 5 }
    );
    expect(mockRepository.count).toHaveBeenCalledWith({ organization: "org1" });
  });

  test("should create a record", async () => {
    const mockRecord = {
      _id: getMockObjectId(),
      name: "Test Entity",
      organization: "org1",
    };
    mockRepository.create.mockResolvedValue(mockRecord);

    const result = await service.create(mockRecord, "org1");

    expect(result).toEqual(mockRecord);
    expect(mockRepository.create).toHaveBeenCalledWith({
      ...mockRecord,
      organization: "org1",
    });
  });

  test("should update a record", async () => {
    const mockRecord = {
      _id: getMockObjectId(),
      name: "Updated Entity",
      organization: mockUID,
    };
    mockRepository.update.mockResolvedValue(mockRecord);

    const result = await service.update(mockRecord, mockUID, mockUID);

    expect(result).toEqual(mockRecord);
    expect(mockRepository.update).toHaveBeenCalledWith(
      { organization: mockUID, _id: expect.anything() },
      mockRecord
    );
  });

  test("should delete a record", async () => {
    const mockRecord = {
      _id: getMockObjectId(),
      name: "Test Entity",
      organization: "org1",
    };
    mockRepository.delete.mockResolvedValue(mockRecord);

    const result = await service.delete("1", "org1");

    expect(result).toEqual(mockRecord);
    expect(mockRepository.delete).toHaveBeenCalledWith("1", "org1");
  });

  test("should search for records", async () => {
    const mockData = [
      { _id: getMockObjectId(), name: "Test Entity", organization: "org1" },
    ];
    mockRepository.find.mockResolvedValue(mockData);
    mockRepository.count.mockResolvedValue(1);

    const result = await service.search("test", "org1", { page: 1, limit: 5 });

    expect(result).toEqual({
      total: 1,
      page: 1,
      pageSize: 1,
      data: mockData,
    });
    expect(mockRepository.find).toHaveBeenCalledWith(
      { organization: "org1", $text: { $search: "test" } },
      {},
      { page: 1, limit: 5 }
    );
    expect(mockRepository.count).toHaveBeenCalledWith({
      organization: "org1",
      $text: { $search: "test" },
    });
  });
});
