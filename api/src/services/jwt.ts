import { JWTLoginClaimns, IJwtUtilsService } from "@/types/jwt";
import { JWT_SECRET_KEY } from "@/getEnv";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

class JWTUtils implements IJwtUtilsService {
  generateToken(payload: any, expiresIn: number): string {
    return jwt.sign(
      {
        ...payload,
        originalExpiresIn: expiresIn,
        jti: uuidv4(),
      },
      JWT_SECRET_KEY,
      { expiresIn }
    );
  }

  verifyToken(token: string): string | JWTLoginClaimns {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (typeof decoded === "string") {
      return decoded;
    } else {
      return decoded as JWTLoginClaimns;
    }
  }

  extractTokenFromAuthorizationHeader(authorizationHeader: string) {
    return authorizationHeader.split(" ")[1];
  }
}

export default JWTUtils;
