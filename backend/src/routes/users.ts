import express, { Router, Request, Response, NextFunction } from "express";
import PGModels from "../postgres-models";
import bcrypt from "bcrypt";
import { Model } from "sequelize";
import * as JWTToken from "../lib/jwt-token";
import "dotenv/config";
import { statusCodes } from "../lib/statusCodes";
import { HTTPJsonResponse } from "../lib/errorHandler";

const router: Router = express.Router();
// For Security
const saltRounds: number = 10;

router.post("/register", async (req: Request, res: Response): Promise<any> => {
    // const isExistingUser: boolean = false
    try {
        const { userId, userEmail, userPassword, confirmPassword } = req.body;
        console.log("Body: \n", req.body);

        if (!userId || !userPassword || !userPassword) {
            res.status(statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL.code).send({
                ...statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL,
            });
        }

        if (userPassword != confirmPassword) {
            res.status(statusCodes.REGISTRATION.PASSWORD_MISMATCH.code).send({
                ...statusCodes.REGISTRATION.PASSWORD_MISMATCH,
            });
        }

        const isExistingUser: Model | null = await PGModels.User.findOne({
            where: { userEmail: userEmail },
        });

        if (isExistingUser) {
            res.status(
                statusCodes.REGISTRATION.EMAIL_ALREADY_REGISTERED.code,
            ).send({
                ...statusCodes.REGISTRATION.EMAIL_ALREADY_REGISTERED,
            });
            return;
        }

        const hashedPassword: string = await bcrypt.hash(
            userPassword,
            saltRounds,
        );

        const newUser = {
            ...req.body,
            // userId: userId,
            // userName: userName,
            // userEmail: userEmail,
            userPassword: hashedPassword,
        };

        const users: Model = await PGModels.User.create(newUser);

        res.status(statusCodes.REGISTRATION.SUCCESS.code).send({
            users: users,
            ...statusCodes.REGISTRATION.SUCCESS,
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(statusCodes.BACKEND_LOGIC.code).send({
            error: err,
            ...statusCodes.BACKEND_LOGIC,
        });
    }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    const { userId, userPassword } = req.body;
    console.log("userId||userEmail in req.Body: \n", req.body.userId);
    console.log("userPassword in req.Body: \n", req.body.userPassword);

    try {
        if (!userId || !userPassword) {
            res.status(statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL.code).send({
                ...statusCodes.LOGIN.USERNAME_OR_PASSWORD_NULL,
            });
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
        const isPasswordValid: boolean = await bcrypt.compare(
            userPassword,
            hashedPassword,
        );

        if (!isPasswordValid) {
            return res.status(statusCodes.LOGIN.INVALID_CREDENTIALS.code).send({
                ...statusCodes.LOGIN.INVALID_CREDENTIALS,
            });
        }

        const actualUserId: string = isEmail
            ? (user.get("userId") as string)
            : userId;

        const token: String = JWTToken.create({ userId: actualUserId });

        res.status(statusCodes.LOGIN.SUCCESS.code).send({
            ...statusCodes.LOGIN.SUCCESS,
            token,
            user,
        });
    } catch (err) {
        console.error(err);
        res.status(statusCodes.BACKEND_LOGIC.code).json({
            ...statusCodes.BACKEND_LOGIC,
        });
    }
});

router
    .use([JWTToken.verity])
    .route("/current")
    .get(async (req: Request, res: Response): Promise<any> => {
        try {
            const addresses: Model<string, string>[] =
                await PGModels.Address.findAll({
                    where: {
                        userId: req.currentUser.userId,
                    },
                });

            return HTTPJsonResponse(
                res,
                statusCodes.SESSION.RETRIEVED_SESSION,
                {
                    ...req.currentUser.toJSON(),
                    userAddress: addresses,
                },
            );
        } catch (error) {
            console.error("Error while processing session route:", error);
            return res.status(statusCodes.SESSION.INQUIRY_FAILED.code).send({
                ...statusCodes.SESSION.INQUIRY_FAILED,
            });
        }
    })
    .put(
        async (
            req: Request,
            res: Response,
            next: NextFunction,
        ): Promise<any> => {
            // userId can not be changed
            delete req.body.user.userId;

            console.log("req.body.user", req.body.user);

            req.currentUser.set({
                ...req.body.user,
            });

            try {
                // if(req.body.address && req.body.address.length > 0){
                //   await PGModels.Address.create({
                //     userId: req.currentUser.userId,
                //     address: req.body.address
                //   })
                // }

                await req.currentUser.save();

                res.status(statusCodes.USER_UPDATE.SUCCESS.code).send({
                    ...statusCodes.USER_UPDATE.SUCCESS,
                });
            } catch (error: any) {
                error.status = 400;
                return next(error);
            }
        },
    );

export default router;
