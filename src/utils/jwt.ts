import jwt from "jsonwebtoken";
import config from "../config";
import type {
  IJwtPayload,
  ISignUpUser,
} from "../app/modules/users/users.interface";

/**
 * Token Verification
 *
 */
export const validateToken = () => {};

/**
 * Generates both access and refresh tokens.
 *
 */
export const signToken = (payload: IJwtPayload) => {
  console.log(config.jwt.access.expires_in);
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
