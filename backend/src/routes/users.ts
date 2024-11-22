import express, { Router, Request, Response } from "express";
import PGModels from "../models";
import bcrypt from "bcrypt";
import {Model} from "sequelize";
import jwtVerify from "../lib/jwt-verify";
import "dotenv/config";
import { statusCodes } from "../lib/statusCodes";
import jwt from "jsonwebtoken";

const router: Router = express.Router();
// For Security
const saltRounds: number = 10;

router.post("/register", async (req: Request, res: Response): Promise<any>=> {

  // const isExistingUser: boolean = false
  try {
    const { userId, userEmail, userName, userPassword, confirmPassword } = req.body;
    console.log("Body: \n", req.body)

    if (!userId || !userPassword || !userName || !userPassword) {
      res.status(statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL.code).send({
        ...statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL,
      })
    }

    if (userPassword != confirmPassword){
      res.status(statusCodes.REGISTRATION.PASSWORD_MISMATCH.code).send({
        ...statusCodes.REGISTRATION.PASSWORD_MISMATCH
      })
    }

    const isExistingUser: Model | null = await PGModels.User.findOne({
      where: { userEmail: userEmail },
    });

    if (isExistingUser){
      res.status(statusCodes.REGISTRATION.EMAIL_ALREADY_REGISTERED.code).send({
        ...statusCodes.REGISTRATION.EMAIL_ALREADY_REGISTERED,
      })
      return
    }

    const hashedPassword: string = await bcrypt.hash(userPassword, saltRounds)

    const newUser = {
      ...req.body,
      // userId: userId,
      // userName: userName,
      // userEmail: userEmail,
      userPassword: hashedPassword,
    }

    const users: Model = await PGModels.User.create(newUser);

    res.status(statusCodes.REGISTRATION.SUCCESS.code).send({
      users: users,
      ...statusCodes.REGISTRATION.SUCCESS,
    })

  } catch (err) {
    console.error("Error during registration:", err);
    res.status(statusCodes.BACKEND_LOGIC.code).send({
      error: err,
      ...statusCodes.BACKEND_LOGIC
    });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {

  const { userId, userPassword} = req.body;
  console.log("userId||userEmail in req.Body: \n", req.body.userId)
  console.log("userPassword in req.Body: \n", req.body.userPassword)

  try {
    if (!userId || !userPassword){
      res.status(statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL.code).send({
        ...statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL,
      })
    }

    // Check if the input is an email or a userId
    const isEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userId);

    const user: Model | null = await PGModels.User.findOne({
      where: isEmail ? { userEmail: userId } : { userId: userId },
    });

    if (!user) {
      res.status(statusCodes.LOGIN.USER_NOT_FOUND.code).send({
        ...statusCodes.LOGIN.USER_NOT_FOUND,
      });
      return;
    }

    const hashedPassword: string = user.get("userPassword") as string;
    const isPasswordValid: boolean = await bcrypt.compare(userPassword, hashedPassword);

    if (!isPasswordValid) {
      return res.status(statusCodes.LOGIN.INVALID_CREDENTIALS.code).send({
        ...statusCodes.LOGIN.INVALID_CREDENTIALS,
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

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(statusCodes.LOGIN.SERVER_CONFIGURATION_ERROR.code).send({
        ...statusCodes.LOGIN.SERVER_CONFIGURATION_ERROR,
      });
    }

    const actualUserId: string = isEmail ? (user.get("userId") as string) : userId;

    const token: string = jwt.sign({
      userId: actualUserId
    }, process.env.JWT_SECRET, {
      expiresIn: "12h"
    })

    res.status(statusCodes.LOGIN.SUCCESS.code).send({
      ...statusCodes.LOGIN.SUCCESS,
      token,
      user
    });

  } catch (err) {
    console.error(err);
    res.status(statusCodes.BACKEND_LOGIC.code).send({
      ...statusCodes.BACKEND_LOGIC,
    });
  }
});

// Read current logged-in user
router.get('/current', jwtVerify, async (req: Request, res: Response): Promise<any> => {
  try{
    return res.send(statusCodes.SESSION.RETRIEVED_SESSION.code).send({
      payload: req.currentUser,
      ...statusCodes.SESSION.RETRIEVED_SESSION
    });

  } catch (error) {
    console.error("Error while processing session route:", error);
    return res.status(statusCodes.SESSION.INQUIRY_FAILED.code).send({
      ...statusCodes.SESSION.INQUIRY_FAILED,
    });
  }
});

// Update current logged-in user
router.put("/current", jwtVerify, async (req: Request, res: Response) : Promise<any>=>{
  // userName can not be changed
  delete req.body.user.userName

  req.currentUser.set({
    ...req.body.user
  })
  try {
    await req.currentUser.save()

    res.status(statusCodes.USER_UPDATE.SUCCESS.code).send({
      ...statusCodes.USER_UPDATE.SUCCESS
    })
  } catch (error: any) {
    res.status(statusCodes.USER_UPDATE.FAILED.code).send({
      ...statusCodes.USER_UPDATE.FAILED,
    })
  }
})

export default router
