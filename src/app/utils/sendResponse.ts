import { Response } from "express";
import { TResponseData } from "../interface/types";

const sendResponse = <TData>(
  res: Response,
  responseData: TResponseData<TData>
) => {
  return res.status(responseData.statusCode).json({
    statusCode: responseData.statusCode || 200,
    message: responseData.message || "Execution Success!",
    data: responseData.data || {},
  });
};

export default sendResponse;
