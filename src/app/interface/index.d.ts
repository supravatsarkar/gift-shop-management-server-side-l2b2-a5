import { TUser } from "../modules/user/user.interface";

global {
  namespace Express {
    interface Request {
      user: TUser;
      userId: string;
    }
  }
}
