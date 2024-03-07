import { ZodError } from "zod";
import { TErrorDetails } from "../interface/types";

const zodErrorParse = (error: ZodError) => {
  const res: TErrorDetails[] = error.errors.map((error) => {
    return {
      message: error.message,
      path: error.path[error.path.length - 1].toString(),
    };
  });
  return res;
};

export default zodErrorParse;
