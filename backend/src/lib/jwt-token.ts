import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import PGModels from "../models";
import { statusCodes } from "./statusCodes";
import User from "../models/user";


/*
  * In the jsonwebtoken package, the function definition for jwt.sign looks like this (simplified version):
    * sign(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions): string;
    * sign(payload: string | object | Buffer, secretOrPrivateKey: null, options: { algorithm: "none" }): string;
  * When the value of process.env.JWT_SECRET is undefined:
    * TypeScript cannot treat undefined as a valid Secret.
    * It also cannot treat undefined as the null conforming to the second overload. Therefore, neither overload
        matches, resulting in a "No overload matches this call" error.
  * Adding an if statement allows the TypeScript compiler to ensure that when you execute jwt.sign,
    process.env.JWT_SECRET is always a valid string (or other type conforming to Secret).
  *
  
  By using this library, we can remove every process.env.JWT_SECRET in the project
*/

// Ensure JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is not defined in the environment variables.");

  // Also can break the application startup process by throwing an error.
  // throw new Error("JWT_SECRET is not defined in the environment variables")
}

const SECRET_KEY: Secret = process.env.JWT_SECRET || 'DEFAULT_SECRET';

export const verity = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // const { userId, userName } = req.body;
    const token = req.headers.token as string | undefined;

    if (!token) {
      return res.status(statusCodes.AUTHENTICATION.NO_TOKEN_PROVIDED.code).send({
        ...statusCodes.AUTHENTICATION.NO_TOKEN_PROVIDED,
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (decoded.userId) {
      const currentUser: User | null = await PGModels.User.findOne({
        where: {
          userId: decoded.userId,
          // userName: decoded.userName
        }
      });

      if (currentUser) {
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

// export verity

export const create = function (payload: any): String {
  const token: string = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "12h"
  })

  return token
}
