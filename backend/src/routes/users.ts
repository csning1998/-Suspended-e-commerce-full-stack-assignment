import express, {Router, Request, Response, NextFunction, Express} from "express";
import PGModels from "../models";
import bcrypt from "bcrypt";
import {Model} from "sequelize";
import jwt, {JwtPayload} from "jsonwebtoken";
import "dotenv/config";
import * as process from "node:process";

const router: Router = express.Router();
// For Security
const saltRounds = 10;
const app: Express = express();

router.post("/register", async (req: Request, res: Response): Promise<any>=> {

  const existingUser  = false
  try {
    const {userId, userEmail, userName, userPassword, confirmPassword} = req.body;
    console.log("Body: \n", req.body)

    if (userPassword != confirmPassword){
      res.status(400).send({
        status: 'error',
        message: '(400) Mismatched confirm password.'
      })
    }
    if (existingUser){
      res.status(409).send({
        status: 'error',
        message: '(409) Email has already been registered.'
      })
    }

    const hashedPassword: string = await bcrypt.hash(userPassword, saltRounds)

    const newUser = {
      userId: userId,
      userName: userName,
      userEmail: userEmail,
      userPassword: hashedPassword,
    }

    const users: Model = await PGModels.User.create(newUser);

    res.json({
      users: users,
      status: 'success',
      message: 'Successfully registered.'
    })

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 'error',
      message: '(500) Registration failed.'
    });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {

  const {userName, userPassword} = req.body;
  console.log("Username in req.Body: \n", req.body.userName)
  console.log("Password in req.Body: \n", req.body.userPassword)

  try {
    if (!userName || !userPassword){
      res.status(500).send({
        status: 'error',
        message: '(409) Either username or password cannot be null.'
      })
    }

    const user: Model | null = await PGModels.User.findOne({
      where: { userName: userName },
    });

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "(404) User not found.",
      });
    }

    const hashedPassword: string = user.get("userPassword") as string;
    const isPasswordValid: boolean = await bcrypt.compare(userPassword, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).send({
        status: "error",
        message: "(401) Invalid username or password.",
      });
    }

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
     * */

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).send({
        status: "error",
        message: "(500) Server configuration error.",
      });
    }

    let token: string;
    token = jwt.sign({
      user: user.dataValues.userId
    }, process.env.JWT_SECRET, {expiresIn: "12h"});

    console.log("user.dataValues.userName", user.dataValues.userName);

    // const _user = user.toJSON()

    // delete _user.userPassword;

    res.json({
      data: user.toJSON(),
      status: 'success',
      message: 'Successfully Login.',
      token: token
    })

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 'error',
      message: '(500) Login failed.'
    });
  }
});

const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, userName } = req.body;
    const token = req.headers.ecommerceAuthToken as string | undefined;

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).send({
        status: "error",
        message: "(500) Server configuration error.",
      });
    }

    if (!token || !userId|| !userName) {
      return res.status(401).send({
        status: 'error',
        message: '(401) No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if(decoded.user && decoded.user) {
      req.body.userId = await PGModels.User.findOne({
        where: {
          userId: userId,
          userName: decoded.userName
        }
      });
      next();
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
interface CustomRequest extends Request {
  body: {
    userId?: string; // `userId` 和 `userName` 為選填屬性
    userName?: string;
  };
}


app.get('/session',jwtVerify, async (req: Request, res: Response) => {
  try{
    const { userId, userName } = req.body;
    if(!userId || ! userName){
      return res.status(401).send({
        status: 'error',
        message: '(401) No user ID or username provided.'
      });
    }

    return res.json({
      userId: userId,
      userName: userName,
      status: 'success',
      message: 'Successfully retrieved session data.'
    });

  } catch (error) {
    console.error("Error while processing session route:", error);
    return res.status(500).send({
      status: 'error',
      message: '(500) Failed to process inquiry.',
    });
  }
});

router.get("/edit/:userId", async (req: Request, res: Response) : Promise<any>=> {


})

export default router
