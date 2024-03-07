import { NextFunction, Request, Response } from "express";
import { TJwtPayload, TRoles } from "../interface/types";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "../constants/httpStatus";
import { userService } from "../modules/user/user.service";

const auth = (...roles: TRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenString =
        req?.headers?.authorization || req?.headers["access-token"] || "";
      console.log({ tokenString });
      if (!tokenString) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Authentication failed!");
      }
      const decodedPayload = (await jwt.verify(
        tokenString as string,
        config.jwt_access_secret as string
      )) as TJwtPayload;
      console.log({ decodedPayload });

      if (!roles.includes(decodedPayload.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You are not authorize to access!"
        );
      }
      const user = await userService.findUserByFilter({
        email: decodedPayload.email,
      });
      console.log({ user });
      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Authentication failed!");
      }
      req.userId = user?.id;
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
