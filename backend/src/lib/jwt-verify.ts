import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import PGModels from "../models";
import {statusCodes} from "../lib/statusCodes";
import User from "../models/user";

const jwtVerify = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // const { userId, userName } = req.body;
    const token = req.headers.token as string | undefined;

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(statusCodes.AUTHENTICATION.JWT_SECRET_NOT_DEFINED.code).send({
        ...statusCodes.AUTHENTICATION.JWT_SECRET_NOT_DEFINED,
      });
    }

    if (!token) {
      return res.status(statusCodes.AUTHENTICATION.NO_TOKEN_PROVIDED.code).send({
        ...statusCodes.AUTHENTICATION.NO_TOKEN_PROVIDED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if(decoded.userId) {
      const currentUser: User | null = await PGModels.User.findOne({
        where: {
          userId: decoded.userId,
          // userName: decoded.userName
        }
      });

      if(currentUser) {
        req.currentUser = currentUser;
        next();
      } else {
        return res.status(statusCodes.AUTHENTICATION.USER_NOT_FOUND.code).send({
          ...statusCodes.AUTHENTICATION.USER_NOT_FOUND,
        });
      }
    }
    else {
      return res.status(statusCodes.AUTHENTICATION.INVALID_TOKEN.code).send({
        ...statusCodes.AUTHENTICATION.INVALID_TOKEN,
      });
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(statusCodes.AUTHENTICATION.JWT_VERIFICATION_FAILED.code).send({
      ...statusCodes.AUTHENTICATION.JWT_VERIFICATION_FAILED,
    });
  }
};

export default jwtVerify
