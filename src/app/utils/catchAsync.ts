import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (cb: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
