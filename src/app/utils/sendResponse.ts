import { Response } from "express";
import { TResponseData } from "../interface/types";

const sendResponse = <TData>(
  res: Response,
  responseData: Partial<TResponseData<TData>>
) => {
  const statusCode = responseData.statusCode || 200;
  return res.status(statusCode).json({
    statusCode,
    message: responseData.message || "Execution Success!",
    data: responseData.data || {},
  });
};

export default sendResponse;
