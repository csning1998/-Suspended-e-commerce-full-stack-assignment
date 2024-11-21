import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import PGModels from "../models";

const jwtVerify = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // const { userId, userName } = req.body;
    const token = req.headers.token as string | undefined;

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).send({
        status: "error",
        message: "(500) Server configuration error.",
      });
    }

    if (!token) {
      return res.status(401).send({
        status: 'error',
        message: '(401) No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if(decoded.userId) {
      const currentUser = await PGModels.User.findOne({
        where: {
          userId: decoded.userId,
          // userName: decoded.userName
        }
      });

      if(currentUser) {
        req.currentUser = currentUser;
        next();
      }else {
        throw new Error('Can not found user');
      }
    }
    else {
      return res.status(401).send({
        status: "error",
        message: "(401) Invalid token.",
      });
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(500).send({
      status: 'error',
      message: '(500) Failed to process inquiry.',
    });
  }
};

export default jwtVerify