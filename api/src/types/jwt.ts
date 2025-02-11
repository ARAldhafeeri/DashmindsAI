import { JwtPayload } from "jsonwebtoken";

export interface JWTLoginClaimns extends JwtPayload {
  userUID: string;
  orgUID: string;
  jti: string;
  originalExpiresIn: number;
}

export interface IJwtUtilsService {
  generateToken(payload: any, expiresIn: number): string;
  verifyToken(token: string): JWTLoginClaimns | string;
}
