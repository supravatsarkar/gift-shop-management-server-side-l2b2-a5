import config from "../../config";
import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/AppError";
import { TJwtPayload } from "../../interface/types";
import {
  _comparePassword,
  _encryptPassword,
  _generateAuthToken,
} from "../../utils";
import { userService } from "../user/user.service";
import { TUser } from "./../user/user.interface";
import UserModel from "./../user/user.model";
import jwt from "jsonwebtoken";

const createUser = async (userData: TUser) => {
  try {
    const userExist = await UserModel.findOne({
      $or: [
        {
          email: userData.email,
        },
        {
          phone: userData.phone,
        },
      ],
    });

    if (userExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User already exist!");
    }

    userData.password = await _encryptPassword(userData.password);
    userData.isEnabled = true;
    userData.isVerified = true;
    const user = (await UserModel.create(userData)) as Partial<TUser>;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};
const login = async (email: string, phone: string, password: string) => {
  const userExist = await UserModel.findOne({
    $or: [
      {
        email,
      },
      {
        phone,
      },
    ],
  });

  console.log({ userExist });
  // user existing check
  if (!userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid credential. Try agin!!"
    );
  }

  // password compare
  const isPasswordMatch = await _comparePassword(password, userExist.password);
  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid credential. Try agin!!"
    );
  }

  // create tokens
  const jwtPayload = {
    id: userExist.id,
    email: userExist.email,
    role: userExist.role,
  };
  const accessToken = _generateAuthToken({
    ...jwtPayload,
    tokenType: "access-token",
  });
  const refreshToken = _generateAuthToken({
    ...jwtPayload,
    tokenType: "refresh-token",
  });

  return { accessToken, refreshToken };
};
const renewAccessToken = async (refreshToken: string) => {
  let decodedPayload;
  try {
    decodedPayload = (await jwt.verify(
      refreshToken as string,
      config.jwt_refresh_secret as string
    )) as TJwtPayload;
    console.log({ decodedPayload });
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid refresh token!");
  }

  const user = await userService.findUserByFilter({
    email: decodedPayload.email,
  });
  console.log({ user });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not exits!");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = _generateAuthToken({
    ...jwtPayload,
    tokenType: "access-token",
  });

  return { accessToken };
};

export const authService = { createUser, login, renewAccessToken };
