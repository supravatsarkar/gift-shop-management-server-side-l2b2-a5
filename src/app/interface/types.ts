import { roles } from "../constants";
export type TResponseData<TData> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
};

export type TErrorDetails = {
  message: string;
  path: string;
};

export type TJwtPayload = {
  id: string;
  email: string;
  role: TRoles;
  tokenType: "access-token" | "refresh-token" | "other";
};

export type TRoles = keyof typeof roles;
