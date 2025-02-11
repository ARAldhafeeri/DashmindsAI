import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { asyncStorageSerivce, jwtService } from "@/services";
import { JWTLoginClaimns } from "@/types/jwt";

const authenticationMiddleWare: Middleware = async (req, res, next) => {
  try {
    // Extract the authorization header
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Authorization header missing");
    }

    // Extract the token from the header
    const token =
      jwtService.extractTokenFromAuthorizationHeader(authorizationHeader);

    if (!token) {
      throw new Error("Token missing");
    }

    // Verify the token
    const decoded = jwtService.verifyToken(token) as JWTLoginClaimns;

    asyncStorageSerivce.setOrgUID(decoded.orgUID);
    asyncStorageSerivce.setUserUID(decoded.userUID);
    next();
  } catch (e) {
    next(new Error("User not authenticated"));
  }
};

export default authenticationMiddleWare;
