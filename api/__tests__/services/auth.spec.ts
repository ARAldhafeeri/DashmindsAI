import { getMockObjectId, mockUID } from "@/testUtils/moongose";
import AuthService from "@/services/auth";
import PasswordService from "@/services/password";
import JWTUtils from "@/services/jwt";
import UserService from "@/services/user";

describe("AuthService tests", () => {
  let mockPasswordService: jest.Mocked<PasswordService>;
  let mockUserService: jest.Mocked<UserService>;
  let mockJwtService: jest.Mocked<JWTUtils>;

  let service: AuthService;

  beforeEach(() => {
    // Mock all methods in IRepository
    mockPasswordService = {
      createPassword: jest.fn(),
      createHashedPassword: jest.fn(),
      verifyPassword: jest.fn(),
    } as jest.Mocked<PasswordService>;

    mockUserService = {
      find: jest.fn(),
      findAll: jest.fn(),
      findAllWithProjection: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateWithQueryOptions: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      search: jest.fn(),
      findByEmail: jest.fn(),
      repository: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    mockJwtService = {
      verifyToken: jest.fn(),
      generateToken: jest.fn(),
      extractTokenFromAuthorizationHeader: jest.fn(),
    } as jest.Mocked<JWTUtils>;
    // Create a mocked instance of IRepository
    service = new AuthService(
      mockPasswordService,
      mockUserService,
      mockJwtService
    );
  });

  test("should return token on succesful login", async () => {
    const mockData = {
      email: "test@test.com",
      password: "123",
    };

    mockUserService.findByEmail.mockResolvedValue({
      _id: getMockObjectId(),
      email: "test@test.com",
      firstName: "hello",
      lastName: "hello",
      verified: true,
      organization: "hello",
      hashedPassword: "test",

      salt: "test",
    });

    mockPasswordService.verifyPassword.mockResolvedValue(true);

    mockJwtService.generateToken.mockReturnValue("test");

    const result = await service.login(mockData.email, mockData.password);

    expect(result.token).toBe("test");
    expect(mockPasswordService.verifyPassword).toHaveBeenCalledWith(
      "123",
      "test",
      "test"
    );
    expect(mockUserService.findByEmail).toHaveBeenCalledWith("test@test.com");
  });
});
