import express, { Router, Request, Response, NextFunction } from "express";
import { statusCodes, errorCreator, responseCreator } from "../lib/statusCodes";
import PGModels from "../postgres-models";
import CartItems from "@/postgres-models/cart-items";
import { HTTPJsonResponse } from "../lib/errorHandler";

/*
 * User can view and search products without login.
 * This route aims to retrieve all published merchandise (filtering by the state column).
 * Assume the only query strings we would receive is "Keyword"
 * */

function buildCart(cartItems: CartItems[]) {
    let baseAmount = 0;
    let discount = 0;

    const cart = {
        items: cartItems.map((_) => {
            const subtotal = _.price * _.amount;
            baseAmount += subtotal;
            return {
                productId: _.productId,
                price: _.price,
                amount: _.amount,
                subtotal,
            };
        }),
        baseAmount,
        discount,
        totalAmount: baseAmount * (1 - discount),
    };

    return cart;
}

const router: Router = express.Router();
router.get(
    "/",
    async (req: any, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cartItems = await PGModels.CartItems.findAll({
                where: { userId: req.currentUser.userId },
            });

            const cart = buildCart(cartItems);

            res.json({
                payload: cart,
            });
        } catch (err) {
            console.error(err);
            return next(errorCreator(statusCodes.BACKEND_LOGIC));
        }
    }
);
router.put(
    "/",
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
        try {
            const promises: any = [];

            req.body.cartItems.forEach((_: any) => {
                const { id, productId, amount, price } = _;
                promises.push(
                    PGModels.CartItems.findOrCreate({
                        where: {
                            id: id,
                            productId: productId,
                            userId: req.currentUser.userId,
                        },
                        defaults: {
                            amount: amount,
                            price: price,
                        },
                    })
                );
            });

            const cartItems = await Promise.all(promises);
            const cart = buildCart(cartItems);

            res.json({
                payload: cart,
            });
        } catch (error) {
            return next(errorCreator(statusCodes.BACKEND_LOGIC));
        }
    }
);

export default router;
