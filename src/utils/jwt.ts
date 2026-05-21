import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import type {
  IJwtPayload,
  ISignUpUser,
} from "../app/modules/users/users.interface";

/**
 * Token Verification
 */
export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access" ? config.jwt.access.secret : config.jwt.refresh.secret;
  const decode = jwt.verify(token, secret);
  return decode as JwtPayload;
};

/**
 * Generates both access and refresh tokens.
 */
export const signToken = (payload: IJwtPayload) => {
  const accessToken = jwt.sign(payload, config.jwt.access.secret, {
    expiresIn: config.jwt.access.expires_in,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refresh.secret, {
    expiresIn: config.jwt.refresh.expires_in,
  });

  return {
    accessToken,
    refreshToken,
  };
};
