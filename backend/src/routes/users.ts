import express, { Router, Request, Response, NextFunction } from "express";
import PGModels from "../postgres-models";
import db from "../db";
import { Model } from "sequelize";
import * as JWT from "../lib/jsonWebToken";
import "dotenv/config";
import { statusCodes } from "../lib/statusCodes";
import Address from "../postgres-models/address";
import Payment from "../postgres-models/payment";

const router: Router = express.Router();


router.post("/register", async (req: Request, res: Response): Promise<any> => {
    // const isExistingUser: boolean = false
    try {
        const { userId, userEmail, userPassword, confirmPassword } = req.body;
        console.log("Body: \n", req.body);

        if (!userId || !userPassword) {
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

        const newUser = {
            ...req.body,
            // userId: userId,
            // userName: userName,
            // userEmail: userEmail,
            userPassword: userPassword,
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

        const user = await PGModels.User.findOne({
            where: isEmail ? { userEmail: userId } : { userId: userId },
        });

        if (!user) {
            res.status(statusCodes.LOGIN.USER_NOT_FOUND.code).send({
                ...statusCodes.LOGIN.USER_NOT_FOUND,
            });
            return;
        }

        const isPasswordValid = user.isPasswordValid(userPassword)

        if (!isPasswordValid) {
            return res.status(statusCodes.LOGIN.INVALID_CREDENTIALS.code).send({
                ...statusCodes.LOGIN.INVALID_CREDENTIALS,
            });
        }

        const actualUserId: string = isEmail
            ? (user.get("userId") as string)
            : userId;

        const token: String = JWT.create({ userId: actualUserId });

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
    .use([JWT.verity])
    .route("/current")
    .get(async (req: any, res: Response): Promise<any> => {
        try {
            const addresses: Address[] = await PGModels.Address.findAll({
                where: {
                    userId: req.currentUser.userId,
                },
            });

            const payments: Payment[] = await PGModels.Payment.findAll({
                where: {
                    userId: req.currentUser.userId,
                },
            });

            return res.status(statusCodes.SESSION.RETRIEVED_SESSION.code).send({
                ...req.currentUser.toJSON(),
                userAddress: addresses,
                userPayments: payments,
            });
        } catch (error) {
            console.error("Error while processing session route:", error);
            return res.status(statusCodes.SESSION.INQUIRY_FAILED.code).send({
                ...statusCodes.SESSION.INQUIRY_FAILED,
            });
        }
    })
    .put(async (req: any, res: Response, next: NextFunction): Promise<any> => {
        // userId can not be changed
        console.log("req.body.user", req.body.user);

        // Transactions: https://sequelize.org/docs/v6/other-topics/transactions/

        const t: any = await db.transaction();

        console.log("Transaction t: \n", t);

        try {
            // Update basic data for current user
            await req.currentUser.set({ ...req.body.user });
            await req.currentUser.save({ transaction: t });

            if (
                req.body.user.userAddress &&
                Array.isArray(req.body.user.userAddress)
            ) {
                await PGModels.Address.destroy({
                    where: { userId: req.currentUser.userId },
                    transaction: t,
                });

                const addressData: any = req.body.user.userAddress.map(
                    (addr: any) => ({
                        ...addr,
                        userId: req.currentUser.userId,
                    }),
                );

                await PGModels.Address.bulkCreate(addressData, {
                    transaction: t,
                });
            }

            if (
                req.body.user.userPayments &&
                Array.isArray(req.body.user.userPayments)
            ) {
                await PGModels.Payment.destroy({
                    where: { userId: req.currentUser.userId },
                    transaction: t,
                });

                const paymentData: any = req.body.user.userPayments.map(
                    (pay: any) => ({
                        ...pay,
                        userId: req.currentUser.userId,
                    }),
                );

                await PGModels.Payment.bulkCreate(paymentData, {
                    transaction: t,
                });
            }

            await t.commit();

            res.status(statusCodes.USER_UPDATE.SUCCESS.code).send({
                ...statusCodes.USER_UPDATE.SUCCESS,
            });

            // To-do: Fetch the data or data in array from the db respectively
            // and then apply data update using .save().
        } catch (error: any) {
            await t.rollback();
            error.status = 400;
            return next(error);
        }
    });

export default router;
