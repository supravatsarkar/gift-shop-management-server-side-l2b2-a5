import bcrypt from "bcrypt";
import config from "../config";
import { TJwtPayload } from "../interface/types";
import jwt from "jsonwebtoken";
import { SortOrder } from "mongoose";
const _encryptPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round)
  );
  return hashedPassword;
};
const _comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const _generateAuthToken = (jwtPayload: TJwtPayload) => {
  const tokenConfig = {
    jwtSecret: config.jwt_access_secret as string,
    jwtExpire: config.jwt_access_expire as string,
  };
  if (jwtPayload.tokenType === "refresh-token") {
    tokenConfig.jwtSecret = config.jwt_refresh_secret as string;
    tokenConfig.jwtExpire = config.jwt_refresh_expire as string;
  }
  return jwt.sign(jwtPayload, tokenConfig.jwtSecret, {
    expiresIn: tokenConfig.jwtExpire,
  });
};

const _verifyAuthToken = async (tokenString: string) => {
  try {
  } catch (error) {}
};

const _sortOrder = (sortby: string = "createdAt", order: string = "asc") => {
  // console.log("order", order);
  const _order = order === "asc" ? 1 : -1;
  // console.log("_order", _order);
  return {
    [sortby]: _order as SortOrder,
  };
};

export { _encryptPassword, _comparePassword, _generateAuthToken, _sortOrder };
