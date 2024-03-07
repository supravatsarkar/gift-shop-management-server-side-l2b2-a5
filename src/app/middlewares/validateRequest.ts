import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateRequest = (zodSchema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = await zodSchema.parseAsync(req);
      console.log("zod validation res::", { body, query, params });
      body ? (req.body = body) : null;
      query ? (req.query = query) : null;
      params ? (req.params = params) : null;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
