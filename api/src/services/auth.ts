import UserService from "./user";
import PasswordService from "./password";
import { IAuthService } from "@/types/auth";
import JWTUtils from "./jwt";
import { JWT_EXPIRES_IN } from "@/getEnv";

class AuthService implements IAuthService {
  constructor(
    private passwordService: PasswordService,
    private userService: UserService,
    private jwtUtilsService: JWTUtils
  ) {}

  async login(email: string, password: string) {
    // user login business logic

    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser) throw new Error("inccorect username or password");

    const verifyPassword = await this.passwordService.verifyPassword(
      password,
      foundUser.hashedPassword as string,
      foundUser.salt as string
    );

    if (!verifyPassword) throw new Error("inccorect username or password");

    if (!foundUser.verified)
      throw new Error("please check your email a verification link is sent");

    const token = this.jwtUtilsService.generateToken(
      {
        id: foundUser._id,
        organization: foundUser.organization,
        role: foundUser.role,
      },
      JWT_EXPIRES_IN
    );

    return { token: token };
  }
}

export default AuthService;
